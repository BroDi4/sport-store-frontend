import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import { Context } from '../../App';
import cartLogo from '../../assets/img/cart.svg';
import logoutLogo from '../../assets/img/logout.svg';

const Header = () => {
  const { cart, setCart, isAuth, setIsAuth } = useContext(Context);

  const logout = () => {
    setIsAuth(false);
    setCart([]);
    localStorage.removeItem('token');
  };

  return (
    <div className={styles.header}>
      <div className={[styles.inner, 'container'].join(' ')}>
        <Link to={'/'}>
          <div className={styles.title}>Sport&Clothes</div>
        </Link>

        {isAuth ? (
          <div className={styles.btns}>
            <Link to={'/cart'}>
              <div className={styles.btn}>
                <div className={styles.imgbox}>
                  <span>{cart.length}</span>
                  <img src={cartLogo} alt="" />
                </div>
                <span>{cart.reduce((sum, obj) => sum + obj.priceFinal, 0)} ₽</span>
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
