import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Cartsidebar.module.scss';
import { Context } from '../../App';

const CartSidebar = () => {
  const { cart, setCart } = useContext(Context);
  const navigate = useNavigate();

  const onSubmit = () => {
    const params = { orders: [...cart] };
    fetch('http://localhost:4000/order', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.id) {
          setCart([]);
          alert('Заказ оформлен!');
          navigate('/');
        } else {
          alert('Не удалось оформить заказ!');
        }
      });
  };

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
      <button onClick={() => onSubmit()} to={'/order'} className={styles.btn}>
        Оформить заказ
      </button>
    </div>
  );
};

export default CartSidebar;
