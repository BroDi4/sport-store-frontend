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
              className={[styles[`${item}`], activeColor === i ? styles.active : ''].join(
                ' ',
              )}></li>
          );
        })}
      </ul>
    </>
  );
};

export default ColorBlock;
