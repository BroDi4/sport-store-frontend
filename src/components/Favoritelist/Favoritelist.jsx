import React, { useContext } from 'react';

import styles from './Favoritelist.module.scss';
import Favoriteitem from '../Favoriteitem/Favoriteitem';
import { Context } from '../../App';

const Favoritelist = () => {
  const { favorite, setFavorite } = useContext(Context);

  return (
    <div className={styles.root}>
      <div className={styles.titleblock}>
        <h2 className={styles.title}>Избранное</h2>
        <span onClick={() => setFavorite([])} className={styles.clear}>
          Очистить избранное
        </span>
      </div>
      <div className={styles.list}>
        {favorite.map((obj) => {
          return <Favoriteitem key={obj._id} {...obj} />;
        })}
      </div>
    </div>
  );
};

export default Favoritelist;
