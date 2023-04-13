import React from 'react';

import styles from './SizeBlock.module.scss';

const SizeBlock = ({ sizes, activeSize, setActiveSize }) => {
  return (
    <>
      <ul className={styles.sizes}>
        {sizes.map((item, i) => {
          return (
            <li
              onClick={() => setActiveSize(i)}
              key={i}
              className={activeSize === i ? styles.active : ''}>
              {item}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default SizeBlock;
