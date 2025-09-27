import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../lib/firebase';

/**
 * Utility function to create an admin user
 * Run this in the browser console or create a temporary component to execute it
 */
export const createAdminUser = async (email: string, password: string, displayName: string) => {
  try {
    // Create the user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Create the user profile with admin role
    const userProfile = {
      uid: userCredential.user.uid,
      email: userCredential.user.email!,
      displayName: displayName,
      role: 'admin',
      createdAt: new Date(),
      lastLoginAt: new Date()
    };

    // Save to Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), userProfile);

    console.log('Admin user created successfully:', userProfile);
    return userProfile;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
};

// Example usage (run in browser console after Firebase is configured):
// import { createAdminUser } from './src/utils/adminSetup';
// createAdminUser('admin@beelovedshouse.com', 'YourSecurePassword123!', 'Bee Loved\'s House Admin');