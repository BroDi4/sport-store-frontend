import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from '../../axios';

import styles from './Login.module.scss';
import { Context } from '../../App';
import AuthInput from '../../components/UI/AuthInput/AuthInput';

const Login = () => {
  const { isAuth, setIsAuth, setCart, setFavorite } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
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
      <form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
        <h2 className={styles.title}>Авторизация</h2>
        <div className={styles.inputBox}>
          <div className={styles.label}>
            <AuthInput
              label={'E-mail'}
              id={'email'}
              type={'email'}
              error={errors.email?.message}
              {...register('email', { required: 'Введите почту' })}
            />
          </div>
          <div className={styles.label}>
            <AuthInput
              label={'Пароль'}
              id={'password'}
              type={'password'}
              error={errors.password?.message}
              {...register('password', { required: 'Введите пароль' })}
            />
          </div>
          <button disabled={!isValid} type="submit" className={styles.btn}>
            Войти
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
