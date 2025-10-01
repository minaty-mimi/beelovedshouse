import React from 'react';
import { Download, Mail, Printer, Heart } from 'lucide-react';
import { Button } from './ui/button';

interface OrderItem {
  id: string;
  product_id: number;
  quantity: number;
  price: number;
  products: {
    id: number;
    title: string;
    image: string;
    category: string;
  } | null;
}

interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  payment_status?: string;
  payment_reference?: string;
  customer_name?: string;
  customer_email?: string;
  shipping_address: any;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
}

interface OrderInvoiceProps {
  order: Order;
  onClose?: () => void;
}

export const OrderInvoice: React.FC<OrderInvoiceProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print(); // Browser will offer save as PDF
  };

  const handleEmail = () => {
    const subject = `Invoice #${order.id.slice(0, 8)} - Bee Loved's House`;
    const body = `Your order invoice is attached. Order ID: ${order.id}`;
    window.location.href = `mailto:${order.customer_email || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const subtotal = order.order_items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
  const shipping: number = 0; // Free shipping or calculate based on location
  const tax: number = 0; // Add tax if applicable

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto print:shadow-none print:max-w-full">
        {/* Invoice Header - No Print Buttons */}
        <div className="print:hidden bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Order Invoice</h2>
          <div className="flex gap-2">
            <Button
              onClick={handlePrint}
              variant="outline"
              size="sm"
              className="bg-white/20 border-white text-white hover:bg-white/30"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button
              onClick={handleDownload}
              variant="outline"
              size="sm"
              className="bg-white/20 border-white text-white hover:bg-white/30"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button
              onClick={handleEmail}
              variant="outline"
              size="sm"
              className="bg-white/20 border-white text-white hover:bg-white/30"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
            {onClose && (
              <Button
                onClick={onClose}
                variant="outline"
                size="sm"
                className="bg-white/20 border-white text-white hover:bg-white/30"
              >
                ✕
              </Button>
            )}
          </div>
        </div>

        {/* Invoice Content */}
        <div className="p-8 print:p-12">
          {/* Company Header */}
          <div className="flex justify-between items-start mb-8 print:mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800" style={{fontFamily: 'Amatic SC, cursive'}}>
                    Bee Loved's House
                  </h1>
                  <p className="text-sm text-gray-600">Premium Products & Digital Downloads</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-2">
                <p>beelovedshouse@gmail.com</p>
                <p>www.beelovedshouse.com</p>
                <p>Lagos, Nigeria</p>
              </div>
            </div>

            <div className="text-right">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">INVOICE</h2>
              <div className="text-sm text-gray-600">
                <p className="font-medium">Invoice #: {order.id.slice(0, 8).toUpperCase()}</p>
                <p>Date: {new Date(order.created_at).toLocaleDateString('en-NG', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
                <p>Time: {new Date(order.created_at).toLocaleTimeString('en-NG')}</p>
              </div>
            </div>
          </div>

          {/* Customer Info & Order Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 print:mb-12">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">Bill To:</h3>
              <div className="text-sm text-gray-700">
                <p className="font-medium">{order.customer_name || 'Customer'}</p>
                <p>{order.customer_email || 'N/A'}</p>
                {order.shipping_address && (
                  <>
                    <p className="mt-2">{order.shipping_address.address || ''}</p>
                    <p>{order.shipping_address.city || ''}, {order.shipping_address.state || ''}</p>
                    <p>{order.shipping_address.zipCode || ''}</p>
                    {order.shipping_address.phone && <p>Phone: {order.shipping_address.phone}</p>}
                  </>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">Order Details:</h3>
              <div className="text-sm text-gray-700 space-y-1">
                <div className="flex justify-between">
                  <span>Order ID:</span>
                  <span className="font-medium">{order.id.slice(0, 8)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={`font-medium px-2 py-0.5 rounded text-xs ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Status:</span>
                  <span className={`font-medium px-2 py-0.5 rounded text-xs ${
                    order.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                    order.payment_status === 'failed' ? 'bg-red-100 text-red-800' :
                    order.payment_status === 'refunded' ? 'bg-purple-100 text-purple-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {(order.payment_status || 'pending').toUpperCase()}
                  </span>
                </div>
                {order.payment_reference && (
                  <div className="flex justify-between">
                    <span>Payment Ref:</span>
                    <span className="font-medium text-xs">{order.payment_reference}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Items Table */}
          <div className="mb-8 print:mb-12">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-2 font-bold text-gray-800">#</th>
                  <th className="text-left py-3 px-2 font-bold text-gray-800">Item</th>
                  <th className="text-center py-3 px-2 font-bold text-gray-800">Qty</th>
                  <th className="text-right py-3 px-2 font-bold text-gray-800">Price</th>
                  <th className="text-right py-3 px-2 font-bold text-gray-800">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.order_items?.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="py-3 px-2 text-gray-700">{index + 1}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        {item.products?.image && (
                          <img 
                            src={item.products.image} 
                            alt={item.products.title || 'Product'} 
                            className="w-12 h-12 rounded object-cover print:w-10 print:h-10"
                          />
                        )}
                        <div>
                          <p className="font-medium text-gray-800">{item.products?.title || 'Unknown Product'}</p>
                          <p className="text-xs text-gray-500">{item.products?.category || ''}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center text-gray-700">{item.quantity}</td>
                    <td className="py-3 px-2 text-right text-gray-700">₦{item.price.toLocaleString()}</td>
                    <td className="py-3 px-2 text-right font-medium text-gray-800">₦{(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8 print:mb-12">
            <div className="w-full md:w-1/2 lg:w-1/3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium text-gray-800">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium text-gray-800">{shipping === 0 ? 'FREE' : `₦${shipping.toLocaleString()}`}</span>
                </div>
                {tax > 0 && (
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Tax:</span>
                    <span className="font-medium text-gray-800">₦{tax.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t-2 border-gray-300 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-800">Total:</span>
                    <span className="text-2xl font-bold text-amber-600">₦{order.total_amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t pt-6 text-center text-sm text-gray-600">
            <p className="mb-2 font-medium">Thank you for your order!</p>
            <p className="mb-4">For questions about this invoice, contact us at beelovedshouse@gmail.com</p>
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="font-medium text-gray-800 mb-1">🎁 Digital Downloads</p>
              <p className="text-xs">Digital products will be available for download in your account after payment confirmation.</p>
            </div>
          </div>

          {/* Print Footer */}
          <div className="hidden print:block mt-8 pt-4 border-t text-xs text-gray-500 text-center">
            <p>Invoice generated on {new Date().toLocaleString('en-NG')}</p>
            <p className="mt-1">Bee Loved's House - beelovedshouse@gmail.com - www.beelovedshouse.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInvoice;
