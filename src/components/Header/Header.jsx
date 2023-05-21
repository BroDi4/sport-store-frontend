import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import { Context } from '../../App';
import cartLogo from '../../assets/img/cart.svg';
import favoriteLogo from '../../assets/img/favorite.svg';
import logoutLogo from '../../assets/img/logout.svg';

const Header = () => {
  const { cart, setCart, isAuth, setIsAuth, favorite } = useContext(Context);

  const logout = () => {
    setIsAuth(false);
    setCart([]);
    localStorage.removeItem('token');
  };

  const cartPrice = cart.reduce((sum, obj) => sum + obj.priceFinal, 0);

  return (
    <div className={styles.header}>
      <div className={[styles.inner, 'container'].join(' ')}>
        <Link to={'/'}>
          <div className={styles.title}>Sport&Clothes</div>
        </Link>

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
            </button>
          </div>
        ) : (
          <div className={styles.btns}>
            <Link className={styles.linkBtn} to={'/login'}>
              Войти
            </Link>
            <Link className={styles.regLinkBtn} to={'/register'}>
              Создать аккаунт
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
