import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type-safe database query helpers (will be expanded)
export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          sku: string;
          title: string;
          description: string;
          price: number;
          compare_at_price: number | null;
          categories: string[];
          tags: string[];
          vendor: string;
          images: string[];
          stock: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
          seo_title: string | null;
          seo_description: string | null;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image: string | null;
          parent_id: string | null;
          order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['categories']['Insert']>;
      };
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          items: unknown; // JSON type
          total: number;
          status: string;
          shipping_address: unknown; // JSON type
          billing_address: unknown; // JSON type
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string;
          excerpt: string;
          category: string;
          tags: string[];
          author: string;
          featured_image: string | null;
          reading_time: number;
          published_at: string | null;
          updated_at: string;
          is_published: boolean;
        };
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>;
      };
    };
  };
};
