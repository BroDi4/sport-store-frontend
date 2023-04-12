import React, { createContext, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Product from './pages/Product';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Order from './pages/Order';

export const Context = createContext();

function App() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || []));

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Context.Provider value={{ cart, setCart }}>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/order" element={<Order />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Context.Provider>
    </>
  );
}

export default App;
