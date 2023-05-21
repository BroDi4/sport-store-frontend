import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './BuyBlock.module.scss';
import { Context } from '../../App';

const BuyBlock = ({ params, activeSize, activeColor }) => {
  const { cart, setCart, isAuth, favorite, setFavorite } = useContext(Context);

  const favoriteLogo = (
    <svg viewBox="0 0 32 32" fill="#5c5c5c" xmlns="http://www.w3.org/2000/svg">
      <g data-name="Layer 54" id="Layer_54">
        <path
          className="cls-1"
          d="M16,28.72a3,3,0,0,1-2.13-.88L3.57,17.54a8.72,8.72,0,0,1-2.52-6.25,8.06,8.06,0,0,1,8.14-8A8.06,8.06,0,0,1,15,5.68l1,1,.82-.82h0a8.39,8.39,0,0,1,11-.89,8.25,8.25,0,0,1,.81,12.36L18.13,27.84A3,3,0,0,1,16,28.72ZM9.15,5.28A6.12,6.12,0,0,0,4.89,7a6,6,0,0,0-1.84,4.33A6.72,6.72,0,0,0,5,16.13l10.3,10.3a1,1,0,0,0,1.42,0L27.23,15.91A6.25,6.25,0,0,0,29,11.11a6.18,6.18,0,0,0-2.43-4.55,6.37,6.37,0,0,0-8.37.71L16.71,8.8a1,1,0,0,1-1.42,0l-1.7-1.7a6.28,6.28,0,0,0-4.4-1.82Z"
        />
      </g>
    </svg>
  );

  const favoriteBtn = () => {
    if (favorite.findIndex((item) => item._id === params._id) === -1) {
      return (
        <button
          className={styles.favoriteBtn}
          onClick={() => setFavorite([...favorite, { ...params }])}>
          {favoriteLogo}
        </button>
      );
    } else {
      return (
        <button
          className={[styles.favoriteBtn, styles.confFavorite].join(' ')}
          onClick={() => setFavorite(favorite.filter((obj) => obj._id !== params._id))}>
          {favoriteLogo}
        </button>
      );
    }
  };

  const cartBtn = () => {
    if (cart.findIndex((item) => item._id === params._id) === -1) {
      return (
        <button
          onClick={() =>
            setCart([
              ...cart,
              {
                _id: params._id,
                title: params.title,
                imgUrl: params.imgUrl,
                code: params.code,
                price: params.price,
                priceFinal: params.price,
                currSize: params.sizes[activeSize],
                currColor: params.colors[activeColor],
                count: 1,
              },
            ])
          }
          className={styles.btn}>
          В корзину
        </button>
      );
    } else {
      return (
        <Link className={[styles.btn, styles.confBtn].join(' ')} to={'/cart'}>
          В корзине
        </Link>
      );
    }
  };

  return (
    <>
      <div className={styles.btns}>
        {isAuth ? (
          favoriteBtn()
        ) : (
          <Link className={styles.favoriteBtn} to={'/login'}>
            {favoriteLogo}
          </Link>
        )}

        {isAuth ? (
          cartBtn()
        ) : (
          <Link className={styles.btn} to={'/login'}>
            В корзину
          </Link>
        )}
      </div>
    </>
  );
};

export default BuyBlock;
