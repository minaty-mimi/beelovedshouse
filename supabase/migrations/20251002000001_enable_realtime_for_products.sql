-- Enable real-time for products table
-- This ensures DELETE events are broadcast via Supabase real-time

-- First, check if realtime is enabled for products table
-- Enable publication for products table
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;

-- Ensure all events (INSERT, UPDATE, DELETE) are published
-- This is crucial for real-time delete notifications
