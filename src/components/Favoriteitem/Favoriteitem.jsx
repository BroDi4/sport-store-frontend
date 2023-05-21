import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Favortieitem.module.scss';
import SizeBlock from '../SizeBlock/SizeBlock';
import ColorBlock from '../ColorBlock/ColorBlock';
import BuyBlock from '../BuyBlock/BuyBlock';

const Favoriteitem = (props) => {
  const [activeSize, setActiveSize] = useState(0);
  const [activeColor, setActiveColor] = useState(0);

  return (
    <div className={styles.root}>
      <div className={styles.imgbox}>
        <img src={props.imgUrl} alt="" />
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
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
        <div className={styles.priceblock}>
          <div className={styles.price}>
            <span>Цена: </span>
            <span>{props.price} ₽</span>
          </div>
          <BuyBlock params={props} activeSize={activeSize} activeColor={activeColor} />
        </div>
      </div>
    </div>
  );
};

export default Favoriteitem;
