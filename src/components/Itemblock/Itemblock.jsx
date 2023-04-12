import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './Itemblock.module.scss';
import { Context } from '../../App';

const Itemblock = (props) => {
  const { cart, setCart } = useContext(Context);

  return (
    <div className={styles.item}>
      <div className={styles.content}>
        <div className={styles.imgBox}>
          <img src={props.imgUrl} alt="" />
        </div>
        <div className={styles.info}>
          <Link to={`/products/${props._id}`} className={styles.title}>
            {props.title}
          </Link>
          <span className={styles.author}>{props.author}</span>
          <span className={styles.description}>{props.description}</span>
          <span className={styles.number}>Код: {props.code}</span>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.stock}>В наличии: {props.stock}</div>
        <div className={styles.price}>
          Цена: <span>{props.price} ₽</span>
        </div>
        {cart.findIndex((obj) => obj._id === props._id) === -1 ? (
          <>
            <button
              onClick={() => setCart([...cart, { ...props, count: 1, priceFinal: props.price }])}
              className={styles.button}>
              Купить
            </button>
          </>
        ) : (
          <Link to="/cart" className={styles.confButton}>
            В корзине
          </Link>
        )}
      </div>
    </div>
  );
};

export default Itemblock;
