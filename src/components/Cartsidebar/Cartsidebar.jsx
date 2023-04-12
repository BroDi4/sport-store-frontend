import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './Cartsidebar.module.scss';
import { Context } from '../../App';

const CartSidebar = () => {
  const { cart } = useContext(Context);
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.countBox}>
          <div>Всего предметов</div>
          <div className={styles.counter}>{cart.reduce((sum, obj) => sum + obj.count, 0)}</div>
        </div>
        <div className={styles.priceBox}>
          <div className={styles.title}>Итого</div>
          <div className={styles.price}>{cart.reduce((sum, obj) => sum + obj.priceFinal, 0)}₽</div>
        </div>
      </div>
      <Link to={'/order'} className={styles.btn}>
        Оформить заказ
      </Link>
    </div>
  );
};

export default CartSidebar;
