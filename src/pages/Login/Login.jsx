import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from '../../axios';

import styles from './Login.module.scss';
import { Context } from '../../App';
import Input from '../../components/UI/Input/Input';

const Login = () => {
  const { isAuth, setIsAuth, setCart, setFavorite } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  if (isAuth) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (value) => {
    try {
      const { data } = await axios.post('/login', value);
      setIsAuth(true);
      setCart(data.cart);
      setFavorite(data.favorites);
      localStorage.setItem('token', data.token);
    } catch (err) {
      alert('Не удалось авторизироваться, проверьте логин и пароль');
    }
  };

  return (
    <>
      <div className={styles.linkbox}>
        <Link className={styles.link} to={'/'}>
          На главную
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
        <h2 className={styles.title}>Войти в аккаунт</h2>
        <div className={styles.inputBox}>
          <div className={styles.label}>
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password">Пароль</label>
            <Input
              name="password"
              params={{ required: 'Укажите пароль' }}
              register={register}
              errors={errors.password?.message}
              id="password"
              type="password"
              placeholder="Пароль"
            />
          </div>
          <button type="submit" className={styles.btn}>
            Войти
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
