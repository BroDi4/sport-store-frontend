import React from 'react';

import styles from './Booklist.module.scss';
import Itemblock from '../Itemblock/Itemblock';

const Booklist = ({ books }) => {
  return (
    <div className={styles.booklist}>
      <h1>Список книг</h1>
      <div className={styles.itemlist}>
        {books.map((obj) => {
          return <Itemblock key={obj._id} {...obj} />;
        })}
      </div>
    </div>
  );
};

export default Booklist;
