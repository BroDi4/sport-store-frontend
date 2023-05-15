import React from 'react';

import styles from './ColorBlock.module.scss';

const ColorBlock = ({ colors, activeColor, setActiveColor }) => {
  return (
    <>
      <ul className={styles.colors}>
        {colors.map((item, i) => {
          return (
            <li
              key={i}
              onClick={() => setActiveColor(i)}
              className={[styles.colorItem, activeColor === i ? styles.active : ''].join(' ')}>
              <div className={styles[`${item}`]}></div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ColorBlock;
