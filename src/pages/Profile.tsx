import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Heart, LogOut, ArrowLeft, Mail, Calendar, Package, Star, Settings } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, signOut, cart, wishlist } = useAppContext();
  const navigate = useNavigate();

  // Check if user is authenticated
  const isGuest = !user;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-6 h-6 bg-yellow-300 rounded-full opacity-40"></div>
        <div className="absolute top-40 right-20 w-4 h-4 bg-pink-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-40 left-20 w-8 h-8 bg-purple-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-blue-300 rounded-full opacity-40"></div>
      </div>

      <div className="relative z-10 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1
              className="text-5xl font-bold text-gray-800 mb-4"
              style={{fontFamily: 'Amatic SC, cursive'}}
            >
              {isGuest ? 'Welcome, Guest!' : 'My Account'}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {isGuest
                ? 'Sign in to access your personalized experience and manage your account.'
                : 'Manage your account, view your orders, and explore your favorites.'
              }
            </p>
          </div>

          {isGuest ? (
            /* Guest Experience */
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl text-center mb-8">
                <div className="text-6xl mb-6">👋</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
                  Join Our Magical Community
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Create an account to save your favorites, track orders, and get personalized recommendations.
                </p>
                <div className="space-y-4">
                  <Button
                    onClick={handleSignIn}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 text-lg"
                  >
                    Sign In to Your Account
                  </Button>
                  <p className="text-gray-500">or</p>
                  <Button
                    onClick={() => navigate('/login')}
                    variant="outline"
                    className="border-amber-200 text-amber-700 hover:bg-amber-50 px-8 py-3 text-lg"
                  >
                    Create New Account
                  </Button>
                </div>
              </div>

              {/* Guest Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl text-center">
                  <div className="text-4xl mb-4">🛒</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Save Cart</h3>
                  <p className="text-gray-600 text-sm">Keep your items saved for later</p>
                </div>
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl text-center">
                  <div className="text-4xl mb-4">❤️</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Wishlist</h3>
                  <p className="text-gray-600 text-sm">Create and manage your favorites</p>
                </div>
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl text-center">
                  <div className="text-4xl mb-4">📦</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Order Tracking</h3>
                  <p className="text-gray-600 text-sm">Track your orders and history</p>
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
                  Continue Shopping
                </h2>
                <p className="text-gray-600 mb-6">Browse our magical collection of creative products</p>
                <Button
                  onClick={() => navigate('/products')}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3"
                >
                  Explore Products
                </Button>
              </div>
            </div>
          ) : (
            /* Authenticated User Experience */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Info */}
              <div className="lg:col-span-1">
                <Card className="bg-white/80 backdrop-blur-lg border-amber-200 shadow-xl">
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-gray-800">Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                      <Mail className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-800">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="text-sm text-gray-600">Member Since</p>
                        <p className="font-medium text-gray-800">
                          {new Date(user.created_at || Date.now()).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      className="w-full border-red-200 text-red-600 hover:bg-red-50 mt-6"
                    >
                      <LogOut className="mr-2 w-4 h-4" />
                      Sign Out
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions & Stats */}
              <div className="lg:col-span-2 space-y-8">
                {/* Quick Actions */}
                <Card className="bg-white/80 backdrop-blur-lg border-amber-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-gray-800 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-amber-600" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        onClick={() => navigate('/cart')}
                        variant="outline"
                        className="h-16 border-amber-200 text-amber-700 hover:bg-amber-50 flex-col gap-2"
                      >
                        <ShoppingBag className="w-6 h-6" />
                        <span>View Cart ({cart.length})</span>
                      </Button>
                      <Button
                        onClick={() => navigate('/liked-items')}
                        variant="outline"
                        className="h-16 border-amber-200 text-amber-700 hover:bg-amber-50 flex-col gap-2"
                      >
                        <Heart className="w-6 h-6" />
                        <span>Wishlist ({wishlist.length})</span>
                      </Button>
                      <Button
                        onClick={() => navigate('/products')}
                        className="h-16 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white flex-col gap-2"
                      >
                        <Package className="w-6 h-6" />
                        <span>Continue Shopping</span>
                      </Button>
                      <Button
                        onClick={() => navigate('/')}
                        variant="outline"
                        className="h-16 border-amber-200 text-amber-700 hover:bg-amber-50 flex-col gap-2"
                      >
                        <Star className="w-6 h-6" />
                        <span>Back to Home</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Order History */}
                <Card className="bg-white/80 backdrop-blur-lg border-amber-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-gray-800 flex items-center gap-2">
                      <Package className="w-5 h-5 text-amber-600" />
                      Recent Orders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📦</div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders yet</h3>
                      <p className="text-gray-600 mb-6">
                        Start shopping to see your order history and track your purchases here!
                      </p>
                      <Button
                        onClick={() => navigate('/products')}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3"
                      >
                        Browse Products
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Account Benefits */}
                <Card className="bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-white">Account Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">🚚</div>
                        <span className="text-sm">Free shipping on orders over ₦50,000</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">🎁</div>
                        <span className="text-sm">Exclusive member discounts</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">📧</div>
                        <span className="text-sm">Early access to new products</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">⭐</div>
                        <span className="text-sm">Priority customer support</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Back to Store */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center gap-2 border-amber-200 text-amber-700 hover:bg-amber-50 px-8 py-3"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Store
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;