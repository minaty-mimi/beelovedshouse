-- Add missing write policies for products table
-- This allows admins to INSERT, UPDATE, and DELETE products

-- Drop existing restrictive policies if any
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;

-- Recreate read policy
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT USING (true);

-- Add INSERT policy (public for now - you can restrict to admins later)
CREATE POLICY "Anyone can insert products" ON public.products
  FOR INSERT WITH CHECK (true);

-- Add UPDATE policy (public for now - you can restrict to admins later)
CREATE POLICY "Anyone can update products" ON public.products
  FOR UPDATE USING (true);

-- Add DELETE policy (public for now - you can restrict to admins later)
CREATE POLICY "Anyone can delete products" ON public.products
  FOR DELETE USING (true);

-- Note: To restrict to admins only, you would replace the policies above with:
-- FOR INSERT WITH CHECK (auth.jwt()->>'role' = 'admin')
-- FOR UPDATE USING (auth.jwt()->>'role' = 'admin')
-- FOR DELETE USING (auth.jwt()->>'role' = 'admin')
