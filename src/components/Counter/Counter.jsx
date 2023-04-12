import React from 'react';

import styles from './Counter.module.scss';

const Counter = ({ count, onChange, stock }) => {
  const handleChangeInput = (event) => {
    const minMaxValue = Math.max(0, Math.min(stock, event.target.value));
    return minMaxValue;
  };

  return (
    <div onBlur={() => count === 0 && onChange(1)} className={styles.counter}>
      <button onClick={() => onChange(count - 1)} className={count === 0 ? styles.disbtn : ''}>
        -
      </button>
      <input
        type="number"
        onChange={(e) => onChange(handleChangeInput(e))}
        value={count}
        className={styles.count}
      />
      <button onClick={() => onChange(count + 1)} className={count === stock ? styles.disbtn : ''}>
        +
      </button>
    </div>
  );
};

export default Counter;
