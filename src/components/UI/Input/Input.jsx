import React from 'react';

import styles from './Input.module.scss';

const Input = ({ style, errors, name, params, register, ...props }) => {
  return (
    <>
      <input
        {...props}
        className={[styles.root, style, errors && styles.inputErr].join(' ')}
        {...register(name, params)}
      />
      <span className={styles.error}>{errors || ''}</span>
    </>
  );
};

export default Input;
