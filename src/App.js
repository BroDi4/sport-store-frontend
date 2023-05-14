import React, { createContext, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Login from './pages/Login/Login';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Register from './pages/Register/Register';

export const Context = createContext();

function App() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('sportcart') || []));
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    localStorage.setItem('sportcart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetch('http://localhost:4000/auth', {
        method: 'get',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.msg) {
            setIsAuth(true);
          }
        });
    }
  }, []);

  return (
    <>
      <Context.Provider value={{ cart, setCart, isAuth, setIsAuth }}>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Context.Provider>
    </>
  );
}

export default App;
