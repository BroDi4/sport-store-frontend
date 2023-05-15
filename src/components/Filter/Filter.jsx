import React, { useContext } from 'react';

import styles from './Filter.module.scss';
import { Context } from '../../App';

const Filter = ({ value, onClickCategory }) => {
  const { filter } = useContext(Context);

  return (
    <div className={styles.filterbox}>
      {filter.map((obj) => {
        return (
          <div
            key={obj.tag}
            onClick={() => onClickCategory(obj.tag)}
            className={[styles.item, value === obj.tag ? styles.active : ''].join(' ')}>
            {obj.name}
          </div>
        );
      })}
    </div>
  );
};

export default Filter;
