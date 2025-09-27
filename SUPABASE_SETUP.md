# Supabase Setup Instructions

## Database Setup

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and anon key

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Replace the placeholder values with your actual Supabase credentials:
     ```
     VITE_SUPABASE_URL=https://your-project-ref.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key-here
     ```

3. **Run Database Schema**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `supabase-schema.sql`
   - Run the SQL to create all tables, policies, and sample data

4. **Update MCP Configuration** (Optional)
   - If you want to use the MCP server for database management
   - Update `.vscode/mcp.json` with your project reference and access token

## Database Tables Created

- **users**: User accounts and profiles
- **products**: Product catalog with inventory management
- **orders**: Customer orders
- **order_items**: Individual items within orders
- **cart_items**: Shopping cart items (persistent across sessions)

## Security Features

- Row Level Security (RLS) enabled on all tables
- Policies ensure users can only access their own data
- Products are publicly readable for the storefront
- Admin functionality requires separate role assignment

## Sample Data

The schema includes sample products to get you started. You can modify or remove these as needed.

## Next Steps

1. Test the authentication flow
2. Verify product management in the admin dashboard
3. Set up Stripe for payments (if needed)
4. Configure email notifications (optional)

## Troubleshooting

- If you see "read-only mode" errors, ensure your Supabase project is active
- Check that your environment variables are correctly set
- Verify your Supabase project has the necessary permissions