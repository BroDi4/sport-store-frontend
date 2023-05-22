import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Cartsidebar.module.scss';
import Modal from '../UI/Modal/Modal';
import { Context } from '../../App';

const CartSidebar = () => {
  const { cart, setCart } = useContext(Context);
  const [openModal, setOpenModal] = useState(false);
  const [address, setAddress] = useState('');
  const [error, setError] = useState(false);
  const [selectedWay, setSelectedWay] = useState('courier');
  const navigate = useNavigate();

  const orderWays = [
    { name: 'Курьер', tag: 'courier' },
    { name: 'Пункт выдачи', tag: 'store' },
  ];

  const onSubmit = () => {
    if (address !== '' || selectedWay === 'store') {
      const params = { orders: [...cart], type: selectedWay, address: address };
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
    } else {
      setError(true);
    }
  };

  const onClickSettings = () => {
    setOpenModal(true);
    setError(false);
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
      <div className={styles.inner}>
        <h2 className={styles.title}>Способ доставки</h2>
        <button onClick={() => onClickSettings()} className={styles.deliveryBtn}>
          Выбрать параметры доставки
        </button>
      </div>
      <button onClick={() => onSubmit()} to={'/order'} className={styles.btn}>
        Оформить заказ
      </button>
      {error && <span className={styles.error}>Выберите параметры заказа!</span>}

      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <h2 className={styles.title}>Выберите параметры доставки</h2>
        <div className={styles.ways}>
          {orderWays.map((obj) => {
            return (
              <div
                key={obj.tag}
                onClick={() => {
                  setSelectedWay(obj.tag);
                }}
                className={[styles.item, selectedWay === obj.tag ? styles.active : ''].join(' ')}>
                {obj.name}
              </div>
            );
          })}
        </div>
        <span className={styles.orderInfo}>
          Оплата производится при получении картой или наличными
        </span>
        {selectedWay === 'courier' ? (
          <div className={styles.orderBlock}>
            <h2 className={styles.title}>Введите место доставки</h2>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={styles.address}
              placeholder="улица, подъезд, квартира (дом)"
              type="text"
            />
          </div>
        ) : (
          <div className={styles.orderBlock}>
            Пункт выдачи находится на улице:
            <span>Улица</span>
          </div>
        )}
        <button
          onClick={() => {
            setOpenModal(false);
          }}
          className={[styles.btn, styles.confirmBtn].join(' ')}>
          Подтвердить
        </button>
      </Modal>
    </div>
  );
};

export default CartSidebar;
