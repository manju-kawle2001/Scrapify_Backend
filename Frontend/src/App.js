import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@shoelace-style/shoelace/dist/themes/light.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';
import React, { createContext, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import PageNotFound from './PageNotFound';
import AdminScrapView from './components/Admin/AdminScrapView';
import AdminSignIn from './components/Admin/AdminSignIn';
import AdminSignUp from './components/Admin/AdminSignUp';
import Dashboard from './components/Admin/Dashboard';
import Feedback from './components/Admin/Feedback';
import Menu from './components/Admin/Menu';
import OrderDetails from './components/Admin/OrderDetails';
import ProductDetails from './components/Admin/ProductDetails';
import ScrapList from './components/Admin/ScrapList';
import UserDetails from './components/Admin/UserDetails';
import VehicleDetails from './components/Admin/VehicleDetails';
import Category from './components/Home/Category';
import Home from './components/Home/Home';
import MyProfile from './components/Home/MyProfile';
import OurBrand from './components/Home/OurBrand';
import SellProducts from './components/Home/SellProducts';
import SellScrap from './components/Home/SellScrap';
import Shop from './components/Home/Shop';
import Navbar from './components/Navbar/Navbar';
import AddressPage from './components/ui/AddressPage';
import Footer from './components/ui/Footer';
import ProductPage from './components/ui/ProductPage';
import ProductShoppingPage from './components/ui/ShopingCart';
import UpdateAddress from './components/ui/UpdateAddress';
import UserProductDetails from './components/ui/UserProductDetails';
import UserScrapDetails from './components/ui/UserScrapDetails';
setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/');
// Create the UserContext
export const UserContext = createContext();
function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const shouldHideNavbarFooter =
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/AdminSignUp');


  const [hideNavbar, setHideNavbar] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);

  useEffect(() => {
    const isDashboardRoute = location.pathname.startsWith('/dashboard');
    const isAdminRoute = location.pathname.startsWith('/admin');
    const isAdminSign = location.pathname.startsWith('/AdminSignUp');
    setHideNavbar(isDashboardRoute || isAdminRoute || isAdminSign);
    setHideFooter(isDashboardRoute || isAdminRoute || isAdminSign);

    return () => {
      setHideNavbar(false);
      setHideFooter(false);
    };
  }, [location]);



  return (

    <UserContext.Provider value={{ user, setUser }}>
      <>
        {!shouldHideNavbarFooter && <Navbar />}
        <ToastContainer />
        <Routes>

          <Route path='/shop' element={<Shop />} />
          <Route path='/sellproduct' element={<SellProducts />} />
          <Route path='/list-scrap' element={<SellScrap />} />
          <Route path='/category' element={<Category />} />
          <Route path='/ourbrand' element={<OurBrand />} />
          <Route path='/productdetails' element={<ProductPage />} />
          <Route path='/userproductdetails' element={<UserProductDetails />} />
          <Route path='/userscrapdetails' element={<UserScrapDetails />} />
          <Route path='/shopingcart' element={<ProductShoppingPage />} />
          <Route path='/shippingaddress' element={<AddressPage />} />
          <Route path='/updateshippingaddress' element={<UpdateAddress />} />
          <Route path="/profile" element={<MyProfile />} />
          {/* admin start */}
          <Route path='/dashboard' element={<AdminSignIn />} />
          <Route path='/AdminSignUp' element={<AdminSignUp />} />
          <Route path='/adminHome' element={<Menu />}>
            <Route index element={<Dashboard />} />
            <Route path='orderdetails' element={<OrderDetails />} />
            <Route path='scraplist' element={<ScrapList />} />
            <Route path='productdetails' element={<ProductDetails />} />
            <Route path='vehicledetails' element={<VehicleDetails />} />
            <Route path='userdetails' element={<UserDetails />} />
            <Route path='feedback' element={<Feedback />} />
            <Route path='adminscrapview' element={<AdminScrapView />} />
          </Route>
          {/* admin end */}
          <Route path='*' element={<PageNotFound />} />
          <Route path='/' element={<Home />} />
        </Routes>
        {!shouldHideNavbarFooter && <Footer />}
      </>
    </UserContext.Provider >
  );
}

export default App;
