import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import Burger from '../Burger/Burger';
import Navbar from '../Navbar/Navbar';
import cartLogo from '../../assets/img/cart.svg';
import favoriteLogo from '../../assets/img/favorite.svg';
import logoutLogo from '../../assets/img/logout.svg';
import { Context } from '../../App';

const Header = () => {
  const [isBurger, setIsBurger] = useState(false);
  const { openBurger, setOpenBurger, isAuth, setIsAuth, setCart, setFavorite } =
    useContext(Context);

  const checkResize = () => {
    if (window.innerWidth <= 769) {
      setIsBurger(true);
    } else {
      setIsBurger(false);
      setOpenBurger(false);
    }
  };

  useEffect(() => {
    checkResize();
    window.addEventListener('resize', checkResize);
    return () => {
      window.removeEventListener('resize', checkResize);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
    setCart([]);
    setFavorite([]);
    setOpenBurger(false);
  };

  return (
    <div className={styles.header}>
      <div className={[styles.inner, 'container'].join(' ')}>
        <Link
          to={'/'}
          onClick={() => {
            setOpenBurger(false);
          }}>
          <div className={styles.title}>Sport&Clothes</div>
        </Link>
        {isBurger ? (
          <Burger isBurger={isBurger} setIsBurger={setIsBurger} />
        ) : (
          <Navbar logout={logout} />
        )}
      </div>

      <div className={[styles.modal, openBurger ? styles.active : ''].join(' ')}>
        {isAuth ? (
          <div className={styles.list}>
            <Link
              onClick={() => {
                setOpenBurger(false);
              }}
              className={styles.link}
              to={'/favorite'}>
              <img src={favoriteLogo} alt="" />
              <span>Избранное</span>
            </Link>
            <Link
              onClick={() => {
                setOpenBurger(false);
              }}
              className={styles.link}
              to={'/cart'}>
              <img src={cartLogo} alt="" />
              <span>Корзина</span>
            </Link>
            <button
              className={[styles.link, styles.exit].join(' ')}
              onClick={() => {
                logout();
              }}>
              <img src={logoutLogo} alt="" />
              <span>Выйти</span>
            </button>
          </div>
        ) : (
          <div className={styles.list}>
            <Link
              onClick={() => {
                setOpenBurger(false);
              }}
              className={styles.link}
              to={'/login'}>
              Войти
            </Link>
            <Link
              onClick={() => {
                setOpenBurger(false);
              }}
              className={styles.link}
              to={'/register'}>
              Зарегистрироваться
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
