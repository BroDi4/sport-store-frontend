import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Emptycart.module.scss';

const Emptycart = () => {
  return (
    <div className={styles.root}>
      <div className={styles.titlebox}>
        <h1>Корзина пуста 😥</h1>
        <span>Перейдите в каталог и добавьте товары:</span>
        <Link to="/">На главную</Link>
      </div>
    </div>
  );
};

export default Emptycart;
