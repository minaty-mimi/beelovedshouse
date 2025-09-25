import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CheckoutSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="text-green-500" size={64} />
          </div>
          <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-600">
            Thank you for your purchase! Your order has been successfully placed.
          </p>

          <div className="text-sm text-gray-500 space-y-2">
            <p>You will receive an email confirmation shortly.</p>
            <p>Order tracking information will be sent to your email.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => navigate('/')}
              className="flex-1"
              variant="outline"
            >
              <Home className="mr-2" size={16} />
              Back to Home
            </Button>
            <Button
              onClick={() => navigate('/products')}
              className="flex-1"
            >
              <ShoppingBag className="mr-2" size={16} />
              Continue Shopping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutSuccess;