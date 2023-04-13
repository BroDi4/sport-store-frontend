import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import styles from './Productcard.module.scss';
import SizeBlock from '../SizeBlock/SizeBlock';
import ColorBlock from '../ColorBlock/ColorBlock';
import { Context } from '../../App';

const Productcard = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { cart, setCart, isAuth } = useContext(Context);
  const navigate = useNavigate();
  const [activeSize, setActiveSize] = useState(0);
  const [activeColor, setActiveColor] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      let product = await fetch(`http://localhost:4000/products/${id}`);
      product = await product.json();
      if (product.error) {
        navigate('/notfound');
      }
      setProduct(product);
    };
    fetchUser();
  }, [id]);

  return (
    <>
      <Link to={'/'} className={styles.backBtn}>
        Назад
      </Link>

      {product._id && (
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
              <p lassName={styles.name}>Цвет:</p>
              <ColorBlock
                colors={product.colors}
                activeColor={activeColor}
                setActiveColor={setActiveColor}
              />

              <p className={styles.price}>Цена: {product.price} ₽</p>
              {cart.findIndex((obj) => obj._id === product._id) === -1 ? (
                isAuth ? (
                  <button
                    className={styles.btn}
                    onClick={() =>
                      setCart([
                        ...cart,
                        {
                          ...product,
                          count: 1,
                          priceFinal: product.price,
                          currSize: product.sizes[activeSize],
                          currColor: product.colors[activeColor],
                        },
                      ])
                    }>
                    Купить
                  </button>
                ) : (
                  <Link className={styles.btn} to={'/login'}>
                    Купить
                  </Link>
                )
              ) : (
                <Link className={styles.confButton} to="/cart">
                  В корзине
                </Link>
              )}
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
