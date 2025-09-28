import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qajofxshayexbhsbvozo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFham9meHNoYXlleGJoc2J2b3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5Njc1MjksImV4cCI6MjA3NDU0MzUyOX0.rtx5svtBApkys1zbKIJSzZew_M9smOBLp_92ptAySx0'
);

async function confirmAdminEmail() {
  try {
    console.log('Confirming admin email...');

    // Get the admin user details
    const { data: users, error: listError } = await supabase.auth.admin.listUsers();

    if (listError) {
      console.error('Error listing users:', listError.message);
      return;
    }

    const adminUser = users.users.find(user => user.email === 'admin@beelovedshouse.com');

    if (!adminUser) {
      console.error('Admin user not found');
      return;
    }

    console.log('Found admin user:', adminUser.id);

    // Confirm the email
    const { error: confirmError } = await supabase.auth.admin.updateUserById(adminUser.id, {
      email_confirm: true
    });

    if (confirmError) {
      console.error('Error confirming email:', confirmError.message);
    } else {
      console.log('Admin email confirmed successfully!');
      console.log('You can now log in with:');
      console.log('Email: admin@beelovedshouse.com');
      console.log('Password: Beeloved@1#');
    }

  } catch (err) {
    console.error('Error:', err.message);
  }
}

confirmAdminEmail();