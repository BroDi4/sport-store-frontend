import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './Navbar.module.scss';
import cartLogo from '../../assets/img/cart.svg';
import favoriteLogo from '../../assets/img/favorite.svg';
import logoutLogo from '../../assets/img/logout.svg';
import { Context } from '../../App';

const Navbar = ({ logout }) => {
  const { cart, isAuth, favorite } = useContext(Context);

  const cartPrice = cart.reduce((sum, obj) => sum + obj.priceFinal, 0);

  return (
    <>
      {isAuth ? (
        <div className={styles.btns}>
          <Link to={'/favorite'}>
            <div className={styles.btn}>
              <img src={favoriteLogo} alt="" />
              <span
                className={[styles.count, favorite.length === 0 ? styles.hidden : ' '].join(' ')}>
                {favorite.length}
              </span>
              <span className={styles.link}>Избранное</span>
            </div>
          </Link>
          <Link to={'/cart'}>
            <div className={styles.btn}>
              <img src={cartLogo} alt="" />
              <span className={[styles.count, cart.length === 0 ? styles.hidden : ' '].join(' ')}>
                {cart.length}
              </span>
              <span className={styles.link}>
                {cart.length === 0 ? 'Корзина' : `${cartPrice} ₽`}
              </span>
            </div>
          </Link>
          <button
            className={styles.logoutBtn}
            onClick={() => {
              logout();
            }}>
            <img src={logoutLogo} alt="" />
            <span>Выйти</span>
          </button>
        </div>
      ) : (
        <div className={styles.btns}>
          <Link className={styles.linkBtn} to={'/login'}>
            Войти в аккаунт
          </Link>
          <Link className={styles.linkBtn} to={'/register'}>
            Зарегистрироваться
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
