import React, { createContext, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from './axios';

import './scss/main.scss';
import './scss/reset.scss';
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

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/categories');
      setFilter([{ name: 'Все', tag: 'all' }, ...data]);
    } catch (err) {
      alert('Не удалось получить данные!');
    }
  };

  const fetchAuth = async () => {
    try {
      const { data } = await axios.get('/user');
      setCart(data.cart);
      setFavorite(data.favorites);
      setIsAuth(true);
    } catch (err) {
      console.log('Cant auth user');
    }
  };

  const fetchUserChange = async () => {
    try {
      const data = {
        cart: cart,
        favorites: favorite,
      };
      await axios.patch('/user', data);
    } catch (err) {
      console.log('Cant send data');
    }
  };

  useEffect(() => {
    fetchAuth();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchUserChange();
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
