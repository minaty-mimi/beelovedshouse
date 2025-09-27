# Beelovedshouse 🏠✨

A magical e-commerce platform for digital wallpapers, storybooks, and adorable accessories inspired by "My Shepherd and I".

## Features

- 🛍️ **E-commerce Store**: Complete shopping experience with cart and checkout
- 🔐 **Authentication**: User registration and login with Firebase Authentication
- 📱 **PWA Ready**: Installable progressive web app with offline capabilities
- 🎨 **Modern UI**: Built with Tailwind CSS and ShadCN UI components
- 📊 **Analytics**: Google Analytics 4 integration for tracking
- 🧪 **Testing**: Comprehensive test suite with Vitest
- 🚀 **Performance**: Optimized with code splitting and lazy loading

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + ShadCN UI
- **Routing**: React Router v6
- **State Management**: React Context + TanStack Query
- **Authentication**: Firebase Authentication with Firestore
- **Payments**: Stripe integration ready
- **PWA**: Vite PWA plugin with Workbox
- **Testing**: Vitest + Testing Library
- **Linting**: ESLint with TypeScript support

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/minaty-mimi/beelovedshouse.git
cd beelovedshouse
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional - demo mode works without them):
```bash
cp .env.example .env
# Edit .env with your Supabase and Stripe credentials
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:8080](http://localhost:8080) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # ShadCN UI components
│   └── ...
├── contexts/           # React contexts (AppContext)
├── hooks/              # Custom React hooks
├── lib/                # External service configurations
├── pages/              # Page components
├── test/               # Test utilities
├── utils/              # Utility functions
└── ...
```

## Environment Variables

Create a `.env` file with the following variables (optional for demo):

```env
# Firebase Configuration
# Get these values from your Firebase project settings
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Supabase Configuration (optional - for additional features)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Firebase Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "beelovedshouse")
4. Follow the setup wizard

### 2. Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" provider
5. (Optional) Enable other providers like Google, Facebook, etc.

### 3. Set up Firestore Database

1. Go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (you can change security rules later)
4. Select a location for your database

### 4. Get Firebase Configuration

1. Go to "Project settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (`</>`)
4. Register your app with a nickname
5. Copy the config object values to your `.env` file

### 5. Set up Admin User

After configuring Firebase, create an admin user by:

1. Open your browser's developer console on your app
2. Run the following code (replace with your desired admin credentials):

```javascript
import { createAdminUser } from './src/utils/adminSetup';
createAdminUser('admin@beelovedshouse.com', 'YourSecurePassword123!', 'Bee Loved\'s House Admin');
```

Or create a temporary component to execute this function.

### 6. Configure Security Rules (Production)

Update your Firestore security rules in the Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Only admins can read all users
    match /users/{userId} {
      allow read: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## Demo Mode

The application works in demo mode without external services:
- Authentication uses Firebase (when configured) or falls back to demo mode
- All features are functional for testing and development
- Admin dashboard requires Firebase authentication for full functionality

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is private and proprietary.

## Support

For support, please contact the development team.
