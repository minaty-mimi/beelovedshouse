import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Package,
  Users,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Upload,
  LogOut,
  TrendingUp,
  ShoppingCart,
  Eye,
  AlertTriangle,
  Settings,
  Heart,
  Mail,
  Truck,
  Tag,
  Download,
  Send,
  Shield
} from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Textarea } from '../components/ui/textarea';
import { FileUpload } from '../components/FileUpload';
import { OrderInvoice } from '../components/OrderInvoice';
import { supabase } from '../lib/supabase';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';
import { useToast } from '../hooks/use-toast';

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
  };
}

interface Order {
  id: string;
  user_id: string;
  customer_name?: string;
  customer_email?: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { products, getLowStockProducts, deleteProduct, addProduct } = useAppContext();
  const { user, isAdmin, logout, loading } = useAuth();
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{ id: number; title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    originalPrice: '',
    category: '',
    type: 'digital' as 'digital' | 'physical',
    inventory: '',
    low_stock_threshold: '',
    image: '',
    description: ''
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [customers, setCustomers] = useState<any[]>([]);
  const [customersLoading, setCustomersLoading] = useState(true);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<any[]>([]);
  const [subscribersLoading, setSubscribersLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Check admin authentication
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin');
    }
  }, [user, isAdmin, loading, navigate]);

  // Load orders from Supabase
  const loadOrders = async () => {
    try {
      setOrdersLoading(true);
      if (!supabase) return;

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
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
      setOrdersLoading(false);
    }
  };

  // Load customers from Supabase
  const loadCustomers = async () => {
    try {
      setCustomersLoading(true);
      if (!supabase) return;

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading customers:', error);
        return;
      }

      if (data) {
        setCustomers(data);
      }
    } catch (error) {
      console.error('Error loading customers:', error);
    } finally {
      setCustomersLoading(false);
    }
  };

  // Load newsletter subscribers from Supabase
  const loadNewsletterSubscribers = async () => {
    try {
      setSubscribersLoading(true);
      if (!supabase) return;

      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) {
        console.error('Error loading newsletter subscribers:', error);
        return;
      }

      if (data) {
        setNewsletterSubscribers(data);
      }
    } catch (error) {
      console.error('Error loading newsletter subscribers:', error);
    } finally {
      setSubscribersLoading(false);
    }
  };

  // Set up real-time subscriptions for all admin data
  useEffect(() => {
    if (!supabase) return;

    // Load initial data
    loadOrders();
    loadCustomers();
    loadNewsletterSubscribers();

    // Subscribe to orders table changes
    const ordersChannel = supabase
      .channel('admin_orders_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders'
        },
        (payload) => {
          console.log('Admin orders real-time update:', payload);
          loadOrders();
        }
      )
      .subscribe();

    // Subscribe to user_profiles table changes
    const customersChannel = supabase
      .channel('admin_customers_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_profiles'
        },
        (payload) => {
          console.log('Admin customers real-time update:', payload);
          loadCustomers();
        }
      )
      .subscribe();

    // Subscribe to newsletter_subscribers table changes
    const subscribersChannel = supabase
      .channel('admin_subscribers_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'newsletter_subscribers'
        },
        (payload) => {
          console.log('Admin newsletter real-time update:', payload);
          loadNewsletterSubscribers();
        }
      )
      .subscribe();

    // Cleanup subscriptions on unmount
    return () => {
      if (supabase) {
        supabase.removeChannel(ordersChannel);
        supabase.removeChannel(customersChannel);
        supabase.removeChannel(subscribersChannel);
      }
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin');
    } catch (error) {
      console.error('Logout error:', error);
      // Force navigation even if logout fails
      navigate('/admin');
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await addProduct({
      title: newProduct.title,
      price: parseInt(newProduct.price),
      original_price: newProduct.originalPrice ? parseInt(newProduct.originalPrice) : undefined,
      image: newProduct.image,
      category: newProduct.category,
      type: newProduct.type,
      inventory: parseInt(newProduct.inventory),
      low_stock_threshold: parseInt(newProduct.low_stock_threshold),
      description: newProduct.description
    });

    if (success) {
      setNewProduct({
        title: '',
        price: '',
        originalPrice: '',
        category: '',
        type: 'digital',
        inventory: '',
        low_stock_threshold: '',
        image: '',
        description: ''
      });
    }
  };

  const handleDeleteProduct = (productId: number, productTitle: string) => {
    setProductToDelete({ id: productId, title: productTitle });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);
    try {
      const success = await deleteProduct(productToDelete.id);
      
      if (success) {
        toast({
          title: "Product Deleted Successfully! 🎉",
          description: `"${productToDelete.title}" has been permanently removed from your store.`,
          variant: "default",
        });
        setDeleteDialogOpen(false);
        setProductToDelete(null);
      } else {
        toast({
          title: "Delete Failed",
          description: "Unable to delete the product. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error Occurred",
        description: "Something went wrong while deleting the product.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  // Calculate real-time stats from Supabase data
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const lowStockProducts = getLowStockProducts();
  const totalProducts = products.length;
  const digitalProducts = products.filter(p => p.type === 'digital').length;
  const physicalProducts = products.filter(p => p.type === 'physical').length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const shippedToday = orders.filter(o => {
    const today = new Date().toDateString();
    return o.status === 'shipped' && new Date(o.updated_at).toDateString() === today;
  }).length;
  const totalCustomers = customers.length;
  const totalNewsletterSubscribers = newsletterSubscribers.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-6 h-6 bg-yellow-300 rounded-full opacity-40"></div>
        <div className="absolute top-40 right-20 w-4 h-4 bg-pink-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-40 left-20 w-8 h-8 bg-purple-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-blue-300 rounded-full opacity-40"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-sm shadow-sm border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1
                  className="text-2xl font-bold text-gray-800"
                  style={{fontFamily: 'Amatic SC, cursive'}}
                >
                  Bee Loved's House
                </h1>
                <span className="text-sm text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Admin Dashboard</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="flex items-center gap-2 border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                <Eye className="w-4 h-4" />
                View Store
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white/80 backdrop-blur-sm border border-amber-200">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Orders
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Products
            </TabsTrigger>
            <TabsTrigger
              value="customers"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Customers
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">{totalProducts}</div>
                  <p className="text-xs text-gray-600">
                    {digitalProducts} digital, {physicalProducts} physical
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">₦{totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-gray-600">
                    {ordersLoading ? 'Loading...' : `From ${totalOrders} orders`}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Low Stock Items</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{lowStockProducts.length}</div>
                  <p className="text-xs text-gray-600">
                    Need restocking
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Categories</CardTitle>
                  <BarChart3 className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">8</div>
                  <p className="text-xs text-gray-600">
                    Product categories
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity - Real-time data */}
            <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.length === 0 && customers.length === 0 && newsletterSubscribers.length === 0 && products.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No recent activity yet</p>
                  ) : (
                    <>
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center space-x-4">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">New order #{order.id.slice(0, 8)}</p>
                            <p className="text-xs text-gray-600">{new Date(order.created_at).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                      {newsletterSubscribers.slice(0, 2).map((sub) => (
                        <div key={sub.id} className="flex items-center space-x-4">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">Newsletter signup: {sub.email}</p>
                            <p className="text-xs text-gray-600">{new Date(sub.subscribed_at).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                      {lowStockProducts.slice(0, 2).map((product) => (
                        <div key={product.id} className="flex items-center space-x-4">
                          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">Low stock alert: {product.title}</p>
                            <p className="text-xs text-gray-600">Only {product.inventory} left</p>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2
                className="text-3xl font-bold text-gray-800"
                style={{fontFamily: 'Amatic SC, cursive'}}
              >
                Order Management
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                  <Download className="w-4 h-4 mr-2" />
                  Export Orders
                </Button>
                <Button className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                  <Send className="w-4 h-4" />
                  Send Updates
                </Button>
              </div>
            </div>

            {/* Order Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">{ordersLoading ? '...' : totalOrders}</div>
                  <p className="text-xs text-gray-600">All time</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Pending Orders</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{ordersLoading ? '...' : pendingOrders}</div>
                  <p className="text-xs text-gray-600">Awaiting processing</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Shipped Today</CardTitle>
                  <Truck className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{ordersLoading ? '...' : shippedToday}</div>
                  <p className="text-xs text-gray-600">Orders shipped</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">₦{ordersLoading ? '...' : totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-gray-600">Total sales</p>
                </CardContent>
              </Card>
            </div>

            {/* Orders Table - Real-time */}
            <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Loading orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">No orders yet</h3>
                    <p className="text-gray-500">Orders will appear here once customers start purchasing products.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.slice(0, 10).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border border-amber-200 rounded-lg bg-white/50 hover:bg-white/80 transition-colors">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">Order #{order.id.slice(0, 8)}</p>
                          <p className="text-sm text-gray-600">{new Date(order.created_at).toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{order.order_items?.length || 0} items • {order.customer_name || order.customer_email || 'Guest'}</p>
                        </div>
                        <div className="text-right flex items-center gap-3">
                          <div>
                            <p className="font-bold text-amber-600">₦{order.total_amount.toLocaleString()}</p>
                            <span className={`inline-block px-2 py-1 rounded text-xs ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Invoice
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2
                className="text-3xl font-bold text-gray-800"
                style={{fontFamily: 'Amatic SC, cursive'}}
              >
                Product Management
              </h2>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                <Plus className="w-4 h-4" />
                Add New Product
              </Button>
            </div>

            {/* Add Product Form */}
            <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">Add New Product</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title" className="text-gray-700">Product Title</Label>
                    <Input
                      id="title"
                      value={newProduct.title}
                      onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                      placeholder="e.g., My Shepherd Wallpaper Pack"
                      required
                      className="bg-white/70 border-amber-200 focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-gray-700">Category</Label>
                    <Input
                      id="category"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      placeholder="e.g., Wallpapers"
                      required
                      className="bg-white/70 border-amber-200 focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price" className="text-gray-700">Price (₦)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      placeholder="19.99"
                      required
                      className="bg-white/70 border-amber-200 focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice" className="text-gray-700">Original Price (₦)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      step="0.01"
                      value={newProduct.originalPrice}
                      onChange={(e) => setNewProduct({...newProduct, originalPrice: e.target.value})}
                      placeholder="24.99 (optional)"
                      className="bg-white/70 border-amber-200 focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type" className="text-gray-700">Product Type</Label>
                    <select
                      id="type"
                      value={newProduct.type}
                      onChange={(e) => setNewProduct({...newProduct, type: e.target.value as 'digital' | 'physical'})}
                      className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white/70"
                    >
                      <option value="digital">Digital</option>
                      <option value="physical">Physical</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="inventory" className="text-gray-700">Initial Inventory</Label>
                    <Input
                      id="inventory"
                      type="number"
                      value={newProduct.inventory}
                      onChange={(e) => setNewProduct({...newProduct, inventory: e.target.value})}
                      placeholder="100"
                      required
                      className="bg-white/70 border-amber-200 focus:border-amber-400"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="description" className="text-gray-700">Product Description</Label>
                    <Textarea
                      id="description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      placeholder="Describe your product in detail..."
                      rows={4}
                      className="bg-white/70 border-amber-200 focus:border-amber-400"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="image" className="text-gray-700">Product Image</Label>
                    <FileUpload
                      onUploadSuccess={(url) => {
                        setNewProduct({...newProduct, image: url});
                      }}
                      onUploadError={(error) => {
                        console.error('Upload error:', error);
                      }}
                      maxSizeInMB={5}
                      path="products"
                      label="Upload Product Image"
                      className="mt-2"
                    />
                    {newProduct.image && (
                      <p className="text-sm text-green-600 mt-2">✓ Image uploaded successfully</p>
                    )}
                  </div>
                  <div className="md:col-span-2 flex gap-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowPreview(true)}
                      className="flex-1 border-amber-200 text-amber-700 hover:bg-amber-50"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview Product
                    </Button>

                    <Button type="submit" className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                      <Upload className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Products List */}
            <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">All Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No products found. Add your first product above.</p>
                    </div>
                  ) : (
                    products.map(product => (
                      <div key={product.id} className="flex items-center justify-between p-4 border border-amber-200 rounded-lg bg-white/50">
                        <div className="flex items-center space-x-4">
                          <img src={product.image} alt={product.title} className="w-12 h-12 rounded object-cover" />
                          <div>
                            <h3 className="font-medium text-gray-800">{product.title}</h3>
                            <p className="text-sm text-gray-600">{product.category} • {product.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-2 py-1 rounded text-sm ${product.inventory <= product.low_stock_threshold ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                            Stock: {product.inventory}
                          </span>
                          <span className="font-bold text-amber-600">₦{product.price.toLocaleString()}</span>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-red-200 text-red-600 hover:bg-red-50"
                              onClick={() => handleDeleteProduct(product.id, product.title)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2
                className="text-3xl font-bold text-gray-800"
                style={{fontFamily: 'Amatic SC, cursive'}}
              >
                Customer Management
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                  <Download className="w-4 h-4 mr-2" />
                  Export Customers
                </Button>
                <Button className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                  <Mail className="w-4 h-4" />
                  Send Newsletter
                </Button>
              </div>
            </div>

            {/* Customer Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Total Customers</CardTitle>
                  <Users className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">{customersLoading ? '...' : totalCustomers}</div>
                  <p className="text-xs text-gray-600">Registered users</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Newsletter Subscribers</CardTitle>
                  <Mail className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{subscribersLoading ? '...' : totalNewsletterSubscribers}</div>
                  <p className="text-xs text-gray-600">Email subscribers</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">New Signups</CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{customersLoading ? '...' : customers.filter(c => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return new Date(c.created_at) > weekAgo;
                  }).length}</div>
                  <p className="text-xs text-gray-600">This week</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Avg. Order Value</CardTitle>
                  <DollarSign className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">₦{ordersLoading ? '...' : totalOrders > 0 ? Math.round(totalRevenue / totalOrders).toLocaleString() : '0'}</div>
                  <p className="text-xs text-gray-600">Per order</p>
                </CardContent>
              </Card>
            </div>

            {/* Customer Management */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customer List - Real-time */}
              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-800">Customer Database ({totalCustomers})</CardTitle>
                </CardHeader>
                <CardContent>
                  {customersLoading ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Loading customers...</p>
                    </div>
                  ) : customers.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-2">No customers yet</h3>
                      <p className="text-gray-500">Customer data will appear here once users register.</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {customers.map((customer) => (
                        <div key={customer.id} className="flex items-center justify-between p-3 border border-amber-200 rounded-lg bg-white/50">
                          <div>
                            <p className="font-medium text-gray-800">{customer.full_name || 'N/A'}</p>
                            <p className="text-sm text-gray-600">{customer.email || 'No email'}</p>
                            <p className="text-xs text-gray-500">Joined: {new Date(customer.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Customer Support */}
              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-800">Customer Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-800">Newsletter Subscribers</p>
                          <p className="text-sm text-gray-600">{subscribersLoading ? 'Loading...' : `${totalNewsletterSubscribers} subscribers`}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                        View All
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-800">Total Customers</p>
                          <p className="text-sm text-gray-600">{customersLoading ? 'Loading...' : `${totalCustomers} registered`}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                        View All
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <ShoppingCart className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="font-medium text-gray-800">Total Orders</p>
                          <p className="text-sm text-gray-600">{ordersLoading ? 'Loading...' : `${totalOrders} orders`}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                        View All
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <TrendingUp className="w-5 h-5 text-amber-600" />
                    Sales Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600">₦{ordersLoading ? '...' : totalRevenue.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Total revenue</p>
                  <div className="mt-4 text-sm">
                    <span className="text-green-600">{ordersLoading ? '...' : totalOrders}</span> orders completed
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <ShoppingCart className="w-5 h-5 text-amber-600" />
                    Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600">{ordersLoading ? '...' : totalOrders}</div>
                  <p className="text-sm text-gray-600">Total orders</p>
                  <div className="mt-4 text-sm">
                    <span className="text-blue-600">{ordersLoading ? '...' : pendingOrders}</span> pending
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Users className="w-5 h-5 text-amber-600" />
                    Customers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600">{customersLoading ? '...' : totalCustomers}</div>
                  <p className="text-sm text-gray-600">Registered customers</p>
                  <div className="mt-4 text-sm">
                    <span className="text-purple-600">{subscribersLoading ? '...' : totalNewsletterSubscribers}</span> newsletter subscribers
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">Available Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No products available</p>
                  ) : (
                    products.slice(0, 5).map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg font-bold text-amber-600">#{index + 1}</span>
                          <img src={product.image} alt={product.title} className="w-8 h-8 rounded object-cover" />
                          <span className="font-medium text-gray-800">{product.title}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-amber-600">₦{product.price.toLocaleString()}</div>
                          <div className={`text-sm ${product.inventory <= product.low_stock_threshold ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                            Stock: {product.inventory}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2
                className="text-3xl font-bold text-gray-800"
                style={{fontFamily: 'Amatic SC, cursive'}}
              >
                Store Settings
              </h2>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                <Settings className="w-4 h-4" />
                Save Changes
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Marketing Settings */}
              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-800 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Marketing & Promotions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-700">Email Newsletters</Label>
                      <p className="text-sm text-gray-600">Send promotional emails</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-700">Abandoned Cart Recovery</Label>
                      <p className="text-sm text-gray-600">Send reminder emails</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-700">Discount Codes</Label>
                      <p className="text-sm text-gray-600">Enable promotional codes</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500" />
                  </div>
                  <div>
                    <Label htmlFor="welcomeDiscount" className="text-gray-700">Welcome Discount (%)</Label>
                    <Input
                      id="welcomeDiscount"
                      type="number"
                      defaultValue="10"
                      className="bg-white/70 border-amber-200 focus:border-amber-400"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Admin User Management */}
            <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Admin User Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-amber-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">Current Admin</p>
                      <p className="text-sm text-gray-600">admin@beelovedshouse.com</p>
                    </div>
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-sm">Super Admin</span>
                  </div>
                  <div className="text-center py-4">
                    <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Admin User
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Product Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Product Preview</h2>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowPreview(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-6">
                {/* Preview Header */}
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                    newProduct.type === 'digital' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {newProduct.type === 'digital' ? 'Digital Download' : 'Physical Product'}
                  </span>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {newProduct.title || 'Product Title'}
                  </h1>
                  <p className="text-gray-600">{newProduct.category || 'Category'}</p>
                </div>

                {/* Preview Price */}
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-gray-900">
                    ₦{newProduct.price || '0'}
                  </span>
                  {newProduct.originalPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        ₦{newProduct.originalPrice}
                      </span>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                        Save ₦{(parseFloat(newProduct.originalPrice) - parseFloat(newProduct.price || '0')).toLocaleString()}
                      </span>
                    </>
                  )}
                </div>

                {/* Preview Image */}
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 max-w-sm mx-auto">
                  {newProduct.image ? (
                    <img
                      src={newProduct.image}
                      alt={newProduct.title || 'Product'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Eye className="w-12 h-12" />
                    </div>
                  )}
                </div>

                {/* Preview Description */}
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {newProduct.description || 'No description provided. A beautiful product featuring artwork from "My Shepherd and I".'}
                  </p>

                  {newProduct.type === 'digital' && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">Digital Product Details</h3>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• High-resolution images</li>
                        <li>• Instant download after purchase</li>
                        <li>• Multiple formats available</li>
                        <li>• Commercial use license included</li>
                      </ul>
                    </div>
                  )}

                  {newProduct.type === 'physical' && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-2">Physical Product Details</h3>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• Premium quality materials</li>
                        <li>• Carefully packaged</li>
                        <li>• Free shipping on orders over ₦50,000</li>
                        <li>• 30-day return policy</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Invoice Modal */}
      {selectedOrder && (
        <OrderInvoice 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              Delete Product?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                Are you sure you want to permanently delete{' '}
                <span className="font-semibold text-gray-900">"{productToDelete?.title}"</span>?
              </p>
              <p className="text-sm text-red-600 font-medium">
                ⚠️ This action cannot be undone. The product will be removed from your store immediately.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete} disabled={isDeleting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Product
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;