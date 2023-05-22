import React, { useState } from 'react';
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
      <Link to={`/products/${props._id}`} className={styles.imgBox}>
        <img src={props.imgUrl} alt="" />
      </Link>
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
    </div>
  );
};

export default Itemblock;
