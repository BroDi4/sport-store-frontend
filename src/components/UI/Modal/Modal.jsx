import React from 'react';

import styles from './Modal.module.scss';

const Modal = ({ openModal, setOpenModal, children }) => {
  return (
    <div className={[styles.modal, openModal ? styles.active : ''].join(' ')}>
      <div className={styles.inner}>
        <button
          onClick={() => {
            setOpenModal(false);
          }}
          className={styles.close}>
          <span></span>
          <span></span>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
