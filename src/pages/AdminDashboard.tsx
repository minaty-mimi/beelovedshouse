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
  MessageSquare,
  FileText,
  CreditCard,
  Truck,
  Tag,
  Download,
  Send,
  UserCheck,
  Shield,
  Globe
} from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { supabase } from '../lib/supabase';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { products, productsLoading, updateInventory, getLowStockProducts } = useAppContext();
  const { user, userProfile, isAdmin, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    originalPrice: '',
    category: '',
    type: 'digital' as 'digital' | 'physical',
    inventory: '',
    low_stock_threshold: '',
    image: ''
  });
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

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

  // Set up real-time subscription for orders
  useEffect(() => {
    if (!supabase) return;

    // Load initial orders
    loadOrders();

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
          // Reload orders when any change occurs
          loadOrders();
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      if (supabase) {
        supabase.removeChannel(ordersChannel);
      }
    };
  }, []);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated or not admin
  if (!user || !isAdmin) {
    return null;
  }

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

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Product added successfully! (Demo - would save to database)');
    setNewProduct({
      title: '',
      price: '',
      originalPrice: '',
      category: '',
      type: 'digital',
      inventory: '',
      low_stock_threshold: '',
      image: ''
    });
  };

  const handleUpdateInventory = (productId: number, newInventory: number) => {
    updateInventory(productId, newInventory);
  };

  const totalRevenue = products.reduce((sum, product) => sum + (product.price * (100 - product.inventory)), 0);
  const lowStockProducts = getLowStockProducts();
  const totalProducts = products.length;
  const digitalProducts = products.filter(p => p.type === 'digital').length;
  const physicalProducts = products.filter(p => p.type === 'physical').length;

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
                    Estimated potential
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

            {/* Recent Activity */}
            <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">Dashboard accessed</p>
                      <p className="text-xs text-gray-600">Just now</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">Inventory checked</p>
                      <p className="text-xs text-gray-600">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">Low stock alert for Tote Bags</p>
                      <p className="text-xs text-gray-600">5 minutes ago</p>
                    </div>
                  </div>
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
                  <div className="text-2xl font-bold text-amber-600">0</div>
                  <p className="text-xs text-gray-600">All time</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Pending Orders</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">0</div>
                  <p className="text-xs text-gray-600">Awaiting processing</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Shipped Today</CardTitle>
                  <Truck className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <p className="text-xs text-gray-600">Orders shipped</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">$0.00</div>
                  <p className="text-xs text-gray-600">This month</p>
                </CardContent>
              </Card>
            </div>

            {/* Orders Table */}
            <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No orders yet</h3>
                  <p className="text-gray-500">Orders will appear here once customers start purchasing products.</p>
                </div>
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
                    <Label htmlFor="image" className="text-gray-700">Image URL</Label>
                    <Input
                      id="image"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                      placeholder="https://..."
                      required
                      className="bg-white/70 border-amber-200 focus:border-amber-400"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
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
                  {productsLoading ? (
                    <div className="flex justify-center items-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                      <span className="ml-2 text-gray-600">Loading products...</span>
                    </div>
                  ) : products.length === 0 ? (
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
                            <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
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
                  <div className="text-2xl font-bold text-amber-600">0</div>
                  <p className="text-xs text-gray-600">Registered users</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Active Customers</CardTitle>
                  <UserCheck className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <p className="text-xs text-gray-600">Active this month</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">New Signups</CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <p className="text-xs text-gray-600">This week</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Avg. Order Value</CardTitle>
                  <DollarSign className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">₦0</div>
                  <p className="text-xs text-gray-600">Per customer</p>
                </CardContent>
              </Card>
            </div>

            {/* Customer Management */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customer List */}
              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-800">Customer Database</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">No customers yet</h3>
                    <p className="text-gray-500">Customer data will appear here once users register and make purchases.</p>
                  </div>
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
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-800">Support Tickets</p>
                          <p className="text-sm text-gray-600">0 open tickets</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                        View All
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-800">Email Campaigns</p>
                          <p className="text-sm text-gray-600">Send newsletters & promotions</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                        Create
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="font-medium text-gray-800">Loyalty Program</p>
                          <p className="text-sm text-gray-600">Manage rewards & points</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                        Configure
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
                  <div className="text-3xl font-bold text-amber-600">₦0</div>
                  <p className="text-sm text-gray-600">Total sales this month</p>
                  <div className="mt-4 text-sm">
                    <span className="text-green-600">+0%</span> from last month
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
                  <div className="text-3xl font-bold text-amber-600">0</div>
                  <p className="text-sm text-gray-600">Total orders</p>
                  <div className="mt-4 text-sm">
                    <span className="text-blue-600">0</span> pending
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
                  <div className="text-3xl font-bold text-amber-600">0</div>
                  <p className="text-sm text-gray-600">Registered customers</p>
                  <div className="mt-4 text-sm">
                    <span className="text-purple-600">0</span> new this month
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">Top Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productsLoading ? (
                    <div className="flex justify-center items-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-500"></div>
                      <span className="ml-2 text-sm text-gray-600">Loading products...</span>
                    </div>
                  ) : products.length === 0 ? (
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
                          <div className="text-sm text-gray-600">0 sold</div>
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
    </div>
  );
};

export default AdminDashboard;