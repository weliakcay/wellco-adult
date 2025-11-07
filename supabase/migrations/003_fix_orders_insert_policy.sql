-- Fix Orders Table RLS Policies
-- Add INSERT policy to allow authenticated users to create orders
-- Also allow guest orders (user_id can be NULL)

-- Allow authenticated users to insert their own orders
CREATE POLICY "Users can create own orders"
    ON orders FOR INSERT
    WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Also allow users to insert into users table (for profile creation)
CREATE POLICY "Users can insert own profile"
    ON users FOR INSERT
    WITH CHECK (auth.uid() = id);
