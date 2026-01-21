import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Men from './pages/Men';
import Women from './pages/Women';
import AllProducts from './pages/AllProducts';
import ProductDetails from './pages/ProductDetails';
import { CartProvider } from './context/CartContext';

import Cart from './pages/Cart';

import Kids from './pages/Kids';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
