import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

import styles from './Orderform.module.scss';
import Input from '../UI/Input/Input';
import { Context } from '../../App';

const Orderform = () => {
  const { cart, setCart } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      fullname: '',
      phone: '',
    },
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (!open && cart.length === 0) {
      navigate('/');
    }
  }, []);

  const onSubmit = (value) => {
    const params = { ...value, orders: [...cart] };
    fetch('http://localhost:4000/order', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        setId(result.id);
        setCart([]);
        setOpen(true);
      });
  };

  return (
    <>
      {open && (
        <div className={styles.popup}>
          <div className={styles.popupBox}>
            <div className={styles.popupTitle}>Ваш заказ оформлен!</div>
            <span>Номер: {id}</span>
            <Link className={styles.popupBtn} to="/">
              На главную
            </Link>
          </div>
        </div>
      )}

      <div className={styles.btnBox}>
        <Link to="/cart" className={styles.backBtn}>
          Назад
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
        <h2 className={styles.title}>Оформление заказа</h2>
        <div className={styles.inputBox}>
          <div className={styles.label}>
            <label htmlFor="email">Email *</label>
            <Input
              name="email"
              params={{ required: 'Укажите почту' }}
              register={register}
              errors={errors.email?.message}
              id="email"
              type="email"
              placeholder="mail@mail.ru"
            />
          </div>
          <div className={styles.label}>
            <label htmlFor="fullname">Полное имя *</label>
            <Input
              name="fullname"
              params={{ required: 'Укажите имя' }}
              register={register}
              errors={errors.fullname?.message}
              id="fullname"
              type="text"
              placeholder="Иван Иванов"
            />
          </div>
          <div className={styles.label}>
            <label htmlFor="phone">Телефон</label>
            <Input
              name="phone"
              register={register}
              errors={errors.phone?.message}
              id="phone"
              type="text"
              placeholder="8(000)000-00-00"
            />
          </div>
          <button type="submit" className={styles.btn}>
            Оформить заказ
          </button>
        </div>
      </form>
    </>
  );
};

export default Orderform;
