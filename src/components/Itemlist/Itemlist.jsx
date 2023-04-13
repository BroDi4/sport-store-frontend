import React from 'react';

import styles from './Itemlist.module.scss';
import Itemblock from '../Itemblock/Itemblock';

const Itemlist = ({ books }) => {
  return (
    <div className={styles.root}>
      <h1>Список товаров</h1>
      <div className={styles.itemlist}>
        {books.map((obj) => {
          return <Itemblock key={obj._id} {...obj} />;
        })}
      </div>
    </div>
  );
};

export default Itemlist;
