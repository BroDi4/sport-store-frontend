import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import styles from './Productcard.module.scss';
import { Context } from '../../App';

const Productcard = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { cart, setCart } = useContext(Context);
  const navigate = useNavigate();

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

      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.imgBox}>
            <img src={product.imgUrl} alt="" />
          </div>
          <div className={styles.titleBox}>
            <h2 className={styles.title}>{product.title}</h2>
            <div className={styles.names}>
              <p>Автор: </p>
              <p>Количество страниц: </p>
              <p>Вес: </p>
              <p>Год издания: </p>
              <p>Код: </p>
            </div>
            <div className={styles.values}>
              <p>{product.author}</p>
              <p>{product.pages}</p>
              <p>{product.weight} g</p>
              <p>{product.year}</p>
              <p>{product.code}</p>
            </div>
          </div>
          <div className={styles.priceBox}>
            <p>В наличии: {product.stock}</p>
            <p>Цена: {product.price} ₽</p>
            {cart.findIndex((obj) => obj._id === product._id) === -1 ? (
              <button
                className={styles.btn}
                onClick={() =>
                  setCart([...cart, { ...product, count: 1, priceFinal: product.price }])
                }>
                Купить
              </button>
            ) : (
              <Link className={styles.confButton} to="/cart">
                В корзине
              </Link>
            )}
          </div>
        </div>
        <div className={styles.description}>
          <h3>Описание</h3>
          <div className={styles.descBody}>{product.descriptionFull}</div>
        </div>
      </div>
    </>
  );
};

export default Productcard;
