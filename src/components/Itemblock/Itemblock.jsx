import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Itemblock.module.scss';
import SizeBlock from '../SizeBlock/SizeBlock';
import ColorBlock from '../ColorBlock/ColorBlock';
import BuyBlock from '../BuyBlock/BuyBlock';

const Itemblock = (props) => {
  const [activeSize, setActiveSize] = useState(0);
  const [activeColor, setActiveColor] = useState(0);

  return (
    <div className={styles.root}>
      <div className={styles.imgBox}>
        <img src={props.imgUrl} alt="" />
      </div>
      <div className={styles.info}>
        <div className={styles.price}>{props.price} ₽</div>
        <Link to={`/products/${props._id}`} className={styles.title}>
          {props.title}
        </Link>
        <SizeBlock sizes={props.sizes} activeSize={activeSize} setActiveSize={setActiveSize} />
        <ColorBlock
          colors={props.colors}
          activeColor={activeColor}
          setActiveColor={setActiveColor}
        />
      </div>

      <BuyBlock params={props} activeColor={activeColor} activeSize={activeSize} />
      {/* {cart.findIndex((item) => item._id === props._id) === -1 ? (
        isAuth ? (
          <>
            <button className={styles.favoriteBtn}>
              <img src={favoriteLogo} alt="" />
            </button>
            <button
              onClick={() =>
                setCart([
                  ...cart,
                  {
                    _id: props._id,
                    title: props.title,
                    imgUrl: props.imgUrl,
                    code: props.code,
                    price: props.price,
                    priceFinal: props.price,
                    currSize: props.sizes[activeSize],
                    currColor: props.colors[activeColor],
                    count: 1,
                  },
                ])
              }
              className={styles.btn}>
              В корзину
            </button>
          </>
        ) : (
          <Link className={styles.btn} to={'/login'}>
            В корзину
          </Link>
        )
      ) : (
        <Link className={[styles.btn, styles.confBtn].join(' ')} to={'/cart'}>
          В корзине
        </Link>
      )} */}
    </div>
  );
};

export default Itemblock;
