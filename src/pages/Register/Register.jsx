import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from '../../axios';

import styles from './Register.module.scss';
import AuthInput from '../../components/UI/AuthInput/AuthInput';
import { Context } from '../../App';

const Register = () => {
  const { isAuth, setIsAuth } = useContext(Context);
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      email: '',
      fullname: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  if (isAuth) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (value) => {
    try {
      const { data } = await axios.post('/register', value);
      setIsAuth(true);
      alert('Вы успешно зарегистрировались!');
      localStorage.setItem('token', data.token);
    } catch (err) {
      alert('Не удалось зарегистрироваться');
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
        <h2 className={styles.title}>Зарегистрироваться</h2>
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
              label={'Имя'}
              id={'fullname'}
              type={'text'}
              error={errors.fullname?.message}
              {...register('fullname', { required: 'Введите имя' })}
            />
          </div>
          <div className={styles.label}>
            <AuthInput
              label={'Пароль'}
              id={'password'}
              type={'password'}
              error={errors.password?.message}
              {...register('password', {
                required: 'Введите пароль',
                minLength: {
                  value: 5,
                  message: 'Минимальная длина пароль 5 символов',
                },
              })}
            />
          </div>
          <div className={styles.label}>
            <AuthInput
              label={'Подтвердите пароль'}
              id={'confirmPassword'}
              type={'password'}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Подтвердите пароль',
                validate: (value) => {
                  if (value !== watch('password')) {
                    return 'Пароли не совпадают';
                  }
                },
              })}
            />
          </div>
          <button disabled={!isValid} type="submit" className={styles.btn}>
            Зарегистрироваться
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
