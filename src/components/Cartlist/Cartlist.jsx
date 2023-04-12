import React, { useContext } from 'react';

import styles from './Cartlist.module.scss';
import CartItem from '../Cartitem/Cartitem';
import CartSidebar from '../Cartsidebar/Cartsidebar';

import { Context } from '../../App';

const Cartlist = () => {
  const { cart, setCart } = useContext(Context);

  return (
    <div className={styles.root}>
      <div className={styles.grid}>
        <div className={styles.list}>
          <div className={styles.titlebox}>
            <h1>Корзина</h1>
            <span onClick={() => setCart([])} className={styles.delcart}>
              Очистить корзину
            </span>
          </div>
          {cart.map((obj) => {
            return <CartItem key={obj._id} {...obj} />;
          })}
        </div>
        <CartSidebar />
      </div>
    </div>
  );
};

export default Cartlist;
