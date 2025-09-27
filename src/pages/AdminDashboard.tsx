import React, { useState } from 'react';
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
  Heart
} from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { products, updateInventory, getLowStockProducts } = useAppContext();
  const [activeTab, setActiveTab] = useState('overview');
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    originalPrice: '',
    category: '',
    type: 'digital' as 'digital' | 'physical',
    inventory: '',
    lowStockThreshold: '',
    image: ''
  });

  // Check admin authentication immediately - no loading state
  const isAuthenticated = localStorage.getItem('adminAuthenticated');
  if (!isAuthenticated) {
    navigate('/admin');
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin');
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
      lowStockThreshold: '',
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
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border border-amber-200">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Products
            </TabsTrigger>
            <TabsTrigger
              value="inventory"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Inventory
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Analytics
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
                  <div className="text-2xl font-bold text-amber-600">${totalRevenue.toFixed(2)}</div>
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
                    <Label htmlFor="price" className="text-gray-700">Price ($)</Label>
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
                    <Label htmlFor="originalPrice" className="text-gray-700">Original Price ($)</Label>
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
                  {products.map(product => (
                    <div key={product.id} className="flex items-center justify-between p-4 border border-amber-200 rounded-lg bg-white/50">
                      <div className="flex items-center space-x-4">
                        <img src={product.image} alt={product.title} className="w-12 h-12 rounded object-cover" />
                        <div>
                          <h3 className="font-medium text-gray-800">{product.title}</h3>
                          <p className="text-sm text-gray-600">{product.category} • {product.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={product.inventory <= product.lowStockThreshold ? "destructive" : "secondary"} className="bg-amber-100 text-amber-800">
                          Stock: {product.inventory}
                        </Badge>
                        <span className="font-bold text-amber-600">${product.price}</span>
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
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2
                className="text-3xl font-bold text-gray-800"
                style={{fontFamily: 'Amatic SC, cursive'}}
              >
                Inventory Management
              </h2>
              <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                <Upload className="w-4 h-4 mr-2" />
                Bulk Update
              </Button>
            </div>

            {/* Low Stock Alerts */}
            {lowStockProducts.length > 0 && (
              <Card className="border-red-200 bg-red-50/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Low Stock Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {lowStockProducts.map(product => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-white rounded border border-red-200">
                        <div className="flex items-center space-x-3">
                          <img src={product.image} alt={product.title} className="w-8 h-8 rounded object-cover" />
                          <span className="font-medium text-gray-800">{product.title}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-red-600 font-bold">{product.inventory} left</span>
                          <Button size="sm" onClick={() => handleUpdateInventory(product.id, product.inventory + 10)} className="bg-amber-500 hover:bg-amber-600 text-white">
                            Restock +10
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Inventory Table */}
            <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">Current Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-amber-200">
                        <th className="text-left py-2 text-gray-700">Product</th>
                        <th className="text-left py-2 text-gray-700">Category</th>
                        <th className="text-left py-2 text-gray-700">Type</th>
                        <th className="text-left py-2 text-gray-700">Stock</th>
                        <th className="text-left py-2 text-gray-700">Threshold</th>
                        <th className="text-left py-2 text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id} className="border-b border-amber-100">
                          <td className="py-3">
                            <div className="flex items-center space-x-3">
                              <img src={product.image} alt={product.title} className="w-8 h-8 rounded object-cover" />
                              <span className="font-medium text-gray-800">{product.title}</span>
                            </div>
                          </td>
                          <td className="text-gray-700">{product.category}</td>
                          <td>
                            <Badge variant={product.type === 'digital' ? 'default' : 'secondary'} className="bg-amber-100 text-amber-800">
                              {product.type}
                            </Badge>
                          </td>
                          <td>
                            <span className={product.inventory <= product.lowStockThreshold ? 'text-red-600 font-bold' : 'text-gray-700'}>
                              {product.inventory}
                            </span>
                          </td>
                          <td className="text-gray-700">{product.lowStockThreshold}</td>
                          <td>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateInventory(product.id, product.inventory + 1)}
                                className="border-amber-200 text-amber-700 hover:bg-amber-50"
                              >
                                +1
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateInventory(product.id, Math.max(0, product.inventory - 1))}
                                className="border-red-200 text-red-600 hover:bg-red-50"
                              >
                                -1
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
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
                  <div className="text-3xl font-bold text-amber-600">$0.00</div>
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
                  {products.slice(0, 5).map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-bold text-amber-600">#{index + 1}</span>
                        <img src={product.image} alt={product.title} className="w-8 h-8 rounded object-cover" />
                        <span className="font-medium text-gray-800">{product.title}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-amber-600">${product.price}</div>
                        <div className="text-sm text-gray-600">0 sold</div>
                      </div>
                    </div>
                  ))}
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