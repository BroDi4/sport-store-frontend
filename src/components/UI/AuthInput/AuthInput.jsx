import React, { forwardRef, useState } from 'react';

import styles from './AuthInput.module.scss';

const AuthInput = forwardRef(({ label, id, type, onChange, onBlur, name, error }, ref) => {
  const [active, setActive] = useState(false);

  const onInputBlur = (e) => {
    onBlur(e);
    if (e.target.value.length < 1) {
      setActive(false);
    }
  };

  return (
    <div className={[styles.root, error ? styles.errorActive : ''].join(' ')}>
      <input
        id={id}
        onChange={onChange}
        onFocus={() => setActive(true)}
        onBlur={onInputBlur}
        name={name}
        ref={ref}
        className={styles.input}
        type={type}
      />
      <label className={[styles.label, active ? styles.active : ''].join(' ')} htmlFor={id}>
        {label}
      </label>
      <span className={styles.error}>{error}</span>
    </div>
  );
});

export default AuthInput;
