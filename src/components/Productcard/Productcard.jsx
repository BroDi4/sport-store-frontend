import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from '../../axios';

import styles from './Productcard.module.scss';
import SizeBlock from '../SizeBlock/SizeBlock';
import ColorBlock from '../ColorBlock/ColorBlock';
import BuyBlock from '../BuyBlock/BuyBlock';

const Productcard = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [activeSize, setActiveSize] = useState(0);
  const [activeColor, setActiveColor] = useState(0);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      setProduct(data);
    } catch (err) {
      console.log('cant get user');
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <>
      <Link to={'/'} className={styles.backBtn}>
        Назад
      </Link>

      {product?._id && (
        <div className={styles.root}>
          <div className={styles.header}>
            <div className={styles.imgBox}>
              <img src={product.imgUrl} alt="" />
            </div>
            <div className={styles.titleBox}>
              <h2 className={styles.title}>{product.title}</h2>
              <h3>Общая характеристика</h3>
              <table>
                <tbody>
                  <tr>
                    <td>Пол: </td>
                    <td>{product.gender === 'male' ? 'мужской' : 'женский'}</td>
                  </tr>
                  <tr>
                    <td>Материал: </td>
                    <td>{product.material}</td>
                  </tr>
                  <tr>
                    <td>Код продукта: </td>
                    <td>{product.code}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.priceBox}>
              <p className={styles.name}>Размеры: </p>
              <SizeBlock
                sizes={product.sizes}
                activeSize={activeSize}
                setActiveSize={setActiveSize}
              />
              <p className={styles.name}>Цвет:</p>
              <ColorBlock
                colors={product.colors}
                activeColor={activeColor}
                setActiveColor={setActiveColor}
              />

              <p className={styles.price}>
                Цена: <span>{product.price} ₽</span>
              </p>
              <BuyBlock params={product} activeSize={activeSize} activeColor={activeColor} />
            </div>
          </div>
          <div className={styles.description}>
            <h3>Описание</h3>
            <div className={styles.descBody}>{product.description}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Productcard;
