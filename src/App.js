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
import Favorite from './pages/Favorite';
import Footer from './components/Footer/Footer';

export const Context = createContext();

function App() {
  const [cart, setCart] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [openBurger, setOpenBurger] = useState(false);
  const [filter, setFilter] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetch('http://localhost:4000/categories')
      .then((res) => res.json())
      .then((arr) => setFilter([{ name: 'Все', tag: 'all' }, ...arr]))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetch('http://localhost:4000/user', {
        method: 'get',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setCart(result.cart);
          setFavorite(result.favorites);
          if (!result.msg) {
            setIsAuth(true);
          }
        });
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const data = {
        cart: cart,
        favorites: favorite,
      };
      fetch('http://localhost:4000/user', {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
        body: JSON.stringify(data),
      });
    }
  }, [cart, favorite]);

  return (
    <>
      <Context.Provider
        value={{
          cart,
          setCart,
          isAuth,
          setIsAuth,
          filter,
          activeCategory,
          setActiveCategory,
          favorite,
          setFavorite,
          openBurger,
          setOpenBurger,
        }}>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorite" element={<Favorite />} />
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
