import React, { useEffect, useState } from 'react';

import styles from './Filter.module.scss';

const Filter = ({ value, onClickCategory }) => {
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/categories')
      .then((res) => res.json())
      .then((arr) => setFilter([{ name: 'Все', tag: 'all' }, ...arr]))
      .catch((err) => console.log(err));
  }, []);

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
