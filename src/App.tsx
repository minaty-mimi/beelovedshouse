
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import AffiliateProgram from "./pages/AffiliateProgram";
import CardGames from "./pages/CardGames";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import ColoringBooks from "./pages/ColoringBooks";
import ContactUs from "./pages/ContactUs";
import DigitalDownloads from "./pages/DigitalDownloads";
import DigitalWallpapers from "./pages/DigitalWallpapers";
import FAQ from "./pages/FAQ";
import LikedItems from "./pages/LikedItems";
import NotFound from "./pages/NotFound";
import OurStory from "./pages/OurStory";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Returns from "./pages/Returns";
import ShippingInfo from "./pages/ShippingInfo";
import SizeGuide from "./pages/SizeGuide";
import Stickers from "./pages/Stickers";
import Storybooks from "./pages/Storybooks";
import TermsOfService from "./pages/TermsOfService";
import ToteBags from "./pages/ToteBags";
import Wholesale from "./pages/Wholesale";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/digital-wallpapers" element={<DigitalWallpapers />} />
        <Route path="/storybooks" element={<Storybooks />} />
        <Route path="/coloring-books" element={<ColoringBooks />} />
        <Route path="/stickers" element={<Stickers />} />
        <Route path="/tote-bags" element={<ToteBags />} />
        <Route path="/card-games" element={<CardGames />} />
        <Route path="/digital-downloads" element={<DigitalDownloads />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/liked-items" element={<LikedItems />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/shipping-info" element={<ShippingInfo />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/size-guide" element={<SizeGuide />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/wholesale" element={<Wholesale />} />
        <Route path="/affiliate-program" element={<AffiliateProgram />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
