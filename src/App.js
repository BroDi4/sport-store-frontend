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
import Footer from './components/Footer/Footer';

export const Context = createContext();

function App() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('sportcart') || []));
  const [isAuth, setIsAuth] = useState(false);
  const [filter, setFilter] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    localStorage.setItem('sportcart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetch('http://localhost:4000/categories')
      .then((res) => res.json())
      .then((arr) => setFilter([{ name: 'Все', tag: 'all' }, ...arr]))
      .catch((err) => console.log(err));
  }, []);

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
      <Context.Provider
        value={{ cart, setCart, isAuth, setIsAuth, filter, activeCategory, setActiveCategory }}>
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
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
