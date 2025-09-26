# Beelovedshouse 🏠✨

A magical e-commerce platform for digital wallpapers, storybooks, and adorable accessories inspired by "My Shepherd and I".

## Features

- 🛍️ **E-commerce Store**: Complete shopping experience with cart and checkout
- 🔐 **Authentication**: User registration and login with Supabase
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
- **Authentication**: Supabase (with demo fallback)
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
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Demo Mode

The application works in demo mode without external services:
- Authentication uses localStorage for persistence
- All features are functional for testing and development

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
