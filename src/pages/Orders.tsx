import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Eye, Download, ArrowLeft, Mail, Calendar, CreditCard, Truck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { OrderInvoice } from '../components/OrderInvoice';

interface OrderItem {
  id: string;
  order_id: string;
  product_id: number;
  quantity: number;
  price: number;
  products: {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
  } | null;
}

interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_reference?: string;
  customer_name?: string;
  customer_email?: string;
  shipping_address: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
}

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      loadOrders();
      
      // Set up real-time subscription
      if (!supabase) return;

      const channel = supabase
        .channel('user_orders_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'orders',
            filter: `user_id=eq.${user.uid}`
          },
          (payload) => {
            console.log('Orders real-time update:', payload);
            loadOrders();
          }
        )
        .subscribe();

      return () => {
        if (supabase) {
          supabase.removeChannel(channel);
        }
      };
    }
  }, [user]);

  const loadOrders = async () => {
    if (!user || !supabase) return;

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .eq('user_id', user.uid)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading orders:', error);
        return;
      }

      if (data) {
        setOrders(data);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status?: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
              <Package className="w-10 h-10 text-white" />
            </div>
            <h1
              className="text-5xl font-bold text-gray-800 mb-4"
              style={{ fontFamily: 'Amatic SC, cursive' }}
            >
              My Orders
            </h1>
            <p className="text-gray-600 text-lg">Track and manage your orders</p>
          </div>

          {/* Orders Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur-lg border-amber-200 shadow-xl">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Package className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-gray-800">{orders.length}</p>
                  <p className="text-sm text-gray-600">Total Orders</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-lg border-amber-200 shadow-xl">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-gray-800">
                    {orders.filter(o => o.status === 'shipped').length}
                  </p>
                  <p className="text-sm text-gray-600">Shipped</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-lg border-amber-200 shadow-xl">
              <CardContent className="pt-6">
                <div className="text-center">
                  <CreditCard className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-gray-800">
                    ₦{orders.reduce((sum, o) => sum + o.total_amount, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Total Spent</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-lg border-amber-200 shadow-xl">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Mail className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-gray-800">
                    {orders.filter(o => o.status === 'delivered').length}
                  </p>
                  <p className="text-sm text-gray-600">Delivered</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders List */}
          <Card className="bg-white/80 backdrop-blur-lg border-amber-200 shadow-xl mb-8">
            <CardHeader>
              <CardTitle className="text-gray-800 text-2xl">Order History</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading orders...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📦</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders yet</h3>
                  <p className="text-gray-600 mb-6">
                    Start shopping to see your order history here!
                  </p>
                  <Button
                    onClick={() => navigate('/products')}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                  >
                    Browse Products
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-amber-200 rounded-lg p-6 bg-white/50 hover:bg-white/80 transition-colors"
                    >
                      {/* Order Header */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-gray-800">
                              Order #{order.id.slice(0, 8).toUpperCase()}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status.toUpperCase()}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.payment_status)}`}>
                              {(order.payment_status || 'pending').toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(order.created_at).toLocaleDateString('en-NG', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                            <span>{order.order_items?.length || 0} items</span>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-col items-end gap-2">
                          <p className="text-2xl font-bold text-amber-600">
                            ₦{order.total_amount.toLocaleString()}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedOrder(order)}
                              className="border-amber-200 text-amber-700 hover:bg-amber-50"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Invoice
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Order Items Preview */}
                      <div className="space-y-3">
                        {order.order_items?.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            {item.products?.image && (
                              <img
                                src={item.products.image}
                                alt={item.products.title || 'Product'}
                                className="w-16 h-16 rounded object-cover"
                              />
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">{item.products?.title || 'Unknown Product'}</p>
                              <p className="text-sm text-gray-600">Qty: {item.quantity} × ₦{item.price.toLocaleString()}</p>
                            </div>
                            <p className="font-bold text-gray-800">₦{(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                        ))}
                        {order.order_items && order.order_items.length > 3 && (
                          <p className="text-sm text-gray-600 text-center">
                            +{order.order_items.length - 3} more items
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => navigate('/profile')}
              className="border-amber-200 text-amber-700 hover:bg-amber-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Order Invoice Modal */}
      {selectedOrder && (
        <OrderInvoice order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
};

export default Orders;
