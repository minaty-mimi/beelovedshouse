import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Heart, LogOut } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, signOut, cart, wishlist } = useAppContext();
  const navigate = useNavigate();

  // For demo purposes, show a guest profile if not authenticated
  const isGuest = !user;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {isGuest ? 'Guest Account' : 'My Account'}
      </h1>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={24} />
              {isGuest ? 'Guest Information' : 'Profile Information'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isGuest ? (
              <div className="text-center space-y-4">
                <p className="text-gray-600">You're browsing as a guest.</p>
                <p className="text-sm text-gray-500">Sign in to access your account features.</p>
                <Button onClick={handleSignIn} className="w-full">
                  Sign In
                </Button>
              </div>
            ) : (
              <>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-lg">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Member Since</label>
                  <p className="text-lg">
                    {new Date(user.created_at || Date.now()).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full"
                >
                  <LogOut className="mr-2" size={16} />
                  Sign Out
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => navigate('/cart')}
              variant="outline"
              className="w-full justify-start"
            >
              <ShoppingBag className="mr-2" size={16} />
              View Cart ({cart.length} items)
            </Button>
            <Button
              onClick={() => navigate('/liked')}
              variant="outline"
              className="w-full justify-start"
            >
              <Heart className="mr-2" size={16} />
              Wishlist ({wishlist.length} items)
            </Button>
            <Button
              onClick={() => navigate('/products')}
              className="w-full justify-start"
            >
              Continue Shopping
            </Button>
            {!isGuest && (
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full justify-start"
              >
                <User className="mr-2" size={16} />
                Back to Home
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Order History Placeholder */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {isGuest ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  Sign in to view your order history and track your purchases.
                </p>
                <Button onClick={handleSignIn}>
                  Sign In to View Orders
                </Button>
              </div>
            ) : (
              <>
                <p className="text-gray-600 text-center py-8">
                  No orders yet. Start shopping to see your order history here!
                </p>
                <div className="text-center">
                  <Button onClick={() => navigate('/products')}>
                    Browse Products
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;