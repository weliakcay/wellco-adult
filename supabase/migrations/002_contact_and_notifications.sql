-- Contact Messages Table (Müşteri Soruları/Mesajları)
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'new', -- new, in_progress, replied, closed
    admin_notes TEXT,
    replied_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics Events Table (Basit Analytics)
CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(100) NOT NULL, -- page_view, product_view, add_to_cart, checkout_started, purchase
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(255),
    page_url TEXT,
    product_id VARCHAR(255),
    metadata JSONB, -- Ekstra bilgiler
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Reviews Table (Ürün Yorumları - Opsiyonel)
CREATE TABLE IF NOT EXISTS product_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    is_verified_purchase BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Notifications Table (Admin Bildirimleri)
CREATE TABLE IF NOT EXISTS admin_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(100) NOT NULL, -- new_order, new_message, low_stock, new_review
    title VARCHAR(255) NOT NULL,
    message TEXT,
    reference_id UUID, -- order_id veya message_id vb.
    reference_type VARCHAR(100), -- order, message, product vb.
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);

CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);

CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_user_id ON product_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_is_approved ON product_reviews(is_approved);

CREATE INDEX IF NOT EXISTS idx_admin_notifications_is_read ON admin_notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_admin_notifications_created_at ON admin_notifications(created_at DESC);

-- Triggers
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_reviews_updated_at BEFORE UPDATE ON product_reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_notifications ENABLE ROW LEVEL SECURITY;

-- Contact Messages: Anyone can insert (form submission)
CREATE POLICY "Anyone can submit contact form"
    ON contact_messages FOR INSERT
    WITH CHECK (true);

-- Analytics: Anyone can insert events
CREATE POLICY "Anyone can log analytics events"
    ON analytics_events FOR INSERT
    WITH CHECK (true);

-- Product Reviews: Users can view approved reviews
CREATE POLICY "Approved reviews are viewable by everyone"
    ON product_reviews FOR SELECT
    USING (is_approved = true);

-- Product Reviews: Users can insert their own reviews
CREATE POLICY "Users can create reviews"
    ON product_reviews FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Function: Create admin notification on new order
CREATE OR REPLACE FUNCTION notify_admin_on_new_order()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO admin_notifications (type, title, message, reference_id, reference_type)
    VALUES (
        'new_order',
        'Yeni Sipariş: #' || NEW.id,
        'Toplam: ₺' || NEW.total || ' - Durum: ' || NEW.status,
        NEW.id,
        'order'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_notify_admin_on_new_order
    AFTER INSERT ON orders
    FOR EACH ROW
    EXECUTE FUNCTION notify_admin_on_new_order();

-- Function: Create admin notification on new contact message
CREATE OR REPLACE FUNCTION notify_admin_on_new_message()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO admin_notifications (type, title, message, reference_id, reference_type)
    VALUES (
        'new_message',
        'Yeni Mesaj: ' || NEW.name,
        LEFT(NEW.message, 100) || '...',
        NEW.id,
        'contact_message'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_notify_admin_on_new_message
    AFTER INSERT ON contact_messages
    FOR EACH ROW
    EXECUTE FUNCTION notify_admin_on_new_message();
