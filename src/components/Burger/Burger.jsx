import React, { useContext, useEffect, useState } from 'react';

import styles from './Burger.module.scss';
import { Context } from '../../App';

const Burger = () => {
  const { openBurger, setOpenBurger } = useContext(Context);

  useEffect(() => {
    if (openBurger) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [openBurger]);

  return (
    <button
      onClick={() => {
        setOpenBurger(!openBurger);
      }}
      className={[styles.burger, openBurger ? styles.openburger : ''].join(' ')}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default Burger;
