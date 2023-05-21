import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Emptyfavorite.module.scss';

const Emptyfavorite = () => {
  return (
    <div className={styles.root}>
      <div className={styles.titlebox}>
        <h1>В списке нет ни одного избранного товара 😥</h1>
        <span>Перейдите в каталог и добавьте товары:</span>
        <Link to="/">На главную</Link>
      </div>
    </div>
  );
};

export default Emptyfavorite;
