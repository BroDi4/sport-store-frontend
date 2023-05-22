import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from './Register.module.scss';
import Input from '../../components/UI/Input/Input';
import { Context } from '../../App';

const Register = () => {
  const { isAuth, setIsAuth } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      fullname: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  if (isAuth) {
    return <Navigate to="/" />;
  }

  const onSubmit = (value) => {
    const params = { ...value };
    fetch('http://localhost:4000/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result._id) {
          setIsAuth(true);
          localStorage.setItem('token', JSON.stringify(result.token));
          alert('Вы успешно зарегистрировались!');
        } else if (!result.msg) {
          const errorArray = result.map((obj) => `\n${obj.msg}`);
          alert(`${errorArray}`);
        } else {
          alert('Не удалось зарегистрироваться!');
        }
      });
  };
  return (
    <>
      <div className={styles.linkbox}>
        <Link className={styles.link} to={'/'}>
          На главную
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
        <h2 className={styles.title}>Создать аккаунт</h2>
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
            <label htmlFor="fullname">Имя</label>
            <Input
              name="fullname"
              params={{ required: 'Укажите ваше имя' }}
              register={register}
              errors={errors.fullname?.message}
              id="fullname"
              type="text"
              placeholder="Иван Иванов"
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
            Зарегистрироваться
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
