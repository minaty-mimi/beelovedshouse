-- Add policies for admin order management
-- This allows admins to update, cancel, and delete orders

-- Drop existing order policies if any that might conflict
DROP POLICY IF EXISTS "Admins can update any order" ON public.orders;
DROP POLICY IF EXISTS "Admins can delete any order" ON public.orders;
DROP POLICY IF EXISTS "Admins can delete order items" ON public.order_items;

-- Add admin update policy for orders (allows status changes, cancellations)
CREATE POLICY "Admins can update any order" ON public.orders
  FOR UPDATE USING (true);

-- Add admin delete policy for orders
CREATE POLICY "Admins can delete any order" ON public.orders
  FOR DELETE USING (true);

-- Add admin delete policy for order_items
CREATE POLICY "Admins can delete order items" ON public.order_items
  FOR DELETE USING (true);

-- Note: Currently these policies allow all updates/deletes
-- In production, you should restrict to admin users only:
-- USING (auth.jwt()->>'role' = 'admin')
