import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-6 h-6 bg-yellow-300 rounded-full opacity-40"></div>
        <div className="absolute top-40 right-20 w-4 h-4 bg-pink-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-40 left-20 w-8 h-8 bg-purple-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-blue-300 rounded-full opacity-40"></div>
      </div>

      <div className="relative z-10">
        <Header />

        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center bg-white/80 backdrop-blur-lg rounded-3xl p-12 shadow-xl max-w-lg mx-auto">
            <div className="text-8xl mb-6">😵</div>
            <h1
              className="text-5xl font-bold mb-6 text-gray-800"
              style={{fontFamily: 'Amatic SC, cursive'}}
            >
              404
            </h1>
            <p className="text-xl text-gray-600 mb-8">Oops! This page seems to have wandered off...</p>
            <p className="text-gray-500 mb-8 text-sm">
              The page you're looking for doesn't exist or may have been moved.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3"
              >
                <Home className="mr-2 w-4 h-4" />
                Back to Home
              </Button>
              <Button
                onClick={() => navigate('/products')}
                variant="outline"
                className="border-amber-200 text-amber-700 hover:bg-amber-50 px-6 py-3"
              >
                <Search className="mr-2 w-4 h-4" />
                Browse Products
              </Button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default NotFound;
