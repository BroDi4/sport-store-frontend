import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import cartLogo from '../../assets/img/cart.svg';
import { Context } from '../../App';

const Header = () => {
  const { cart } = useContext(Context);

  return (
    <div className={styles.header}>
      <div className={[styles.inner, 'container'].join(' ')}>
        <Link to={'/'}>
          <div className={styles.title}>📗 Read&Book</div>
        </Link>
        <Link to={'/cart'}>
          <div className={styles.btn}>
            <div className={styles.imgbox}>
              <span>{cart.length}</span>
              <img src={cartLogo} alt="" />
            </div>
            <span>{cart.reduce((sum, obj) => sum + obj.priceFinal, 0)} ₽</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
