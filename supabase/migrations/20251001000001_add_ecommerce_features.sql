-- Add reviews and ratings table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    comment TEXT,
    verified_purchase BOOLEAN DEFAULT false,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add promo codes table
CREATE TABLE IF NOT EXISTS public.promo_codes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    description TEXT,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value NUMERIC NOT NULL CHECK (discount_value > 0),
    min_purchase_amount NUMERIC DEFAULT 0,
    max_discount_amount NUMERIC,
    usage_limit INTEGER,
    times_used INTEGER DEFAULT 0,
    valid_from TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    valid_until TIMESTAMP WITH TIME ZONE,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add stock_quantity and stock_status to products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS stock_quantity INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS stock_status TEXT DEFAULT 'in_stock' CHECK (stock_status IN ('in_stock', 'low_stock', 'out_of_stock', 'unlimited'));

-- Add product variants table
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- 'size', 'color', 'material', etc.
    price_adjustment NUMERIC DEFAULT 0,
    stock_quantity INTEGER DEFAULT 0,
    sku TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add recently_viewed table
CREATE TABLE IF NOT EXISTS public.recently_viewed (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, product_id)
);

-- Add promo_code_id to orders table
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS promo_code_id UUID REFERENCES public.promo_codes(id),
ADD COLUMN IF NOT EXISTS discount_amount NUMERIC DEFAULT 0;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating);
CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON public.promo_codes(code);
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON public.product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_recently_viewed_user_id ON public.recently_viewed(user_id);
CREATE INDEX IF NOT EXISTS idx_recently_viewed_viewed_at ON public.recently_viewed(viewed_at);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recently_viewed ENABLE ROW LEVEL SECURITY;

-- RLS Policies for reviews
CREATE POLICY "Anyone can view reviews" ON public.reviews
    FOR SELECT USING (true);

CREATE POLICY "Users can create reviews" ON public.reviews
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own reviews" ON public.reviews
    FOR UPDATE USING (true);

CREATE POLICY "Users can delete their own reviews" ON public.reviews
    FOR DELETE USING (true);

-- RLS Policies for promo codes
CREATE POLICY "Anyone can view active promo codes" ON public.promo_codes
    FOR SELECT USING (active = true);

CREATE POLICY "Only admins can manage promo codes" ON public.promo_codes
    FOR ALL USING (true);

-- RLS Policies for product variants
CREATE POLICY "Anyone can view product variants" ON public.product_variants
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage variants" ON public.product_variants
    FOR ALL USING (true);

-- RLS Policies for recently viewed
CREATE POLICY "Users can view their own recently viewed" ON public.recently_viewed
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own recently viewed" ON public.recently_viewed
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own recently viewed" ON public.recently_viewed
    FOR UPDATE USING (true);

CREATE POLICY "Users can delete their own recently viewed" ON public.recently_viewed
    FOR DELETE USING (true);

-- Function to update product average rating
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.products
    SET 
        average_rating = (
            SELECT AVG(rating)::NUMERIC(3,2)
            FROM public.reviews
            WHERE product_id = NEW.product_id
        ),
        review_count = (
            SELECT COUNT(*)
            FROM public.reviews
            WHERE product_id = NEW.product_id
        ),
        updated_at = NOW()
    WHERE id = NEW.product_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add average_rating and review_count to products
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS average_rating NUMERIC(3,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0;

-- Trigger to update product rating on review changes
DROP TRIGGER IF EXISTS trigger_update_product_rating ON public.reviews;
CREATE TRIGGER trigger_update_product_rating
    AFTER INSERT OR UPDATE OR DELETE ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_product_rating();

-- Function to track recently viewed
CREATE OR REPLACE FUNCTION track_recently_viewed(
    p_user_id TEXT,
    p_product_id UUID
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO public.recently_viewed (user_id, product_id, viewed_at)
    VALUES (p_user_id, p_product_id, NOW())
    ON CONFLICT (user_id, product_id)
    DO UPDATE SET viewed_at = NOW();
    
    -- Keep only last 20 viewed items per user
    DELETE FROM public.recently_viewed
    WHERE user_id = p_user_id
    AND id NOT IN (
        SELECT id FROM public.recently_viewed
        WHERE user_id = p_user_id
        ORDER BY viewed_at DESC
        LIMIT 20
    );
END;
$$ LANGUAGE plpgsql;
