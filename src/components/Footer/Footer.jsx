import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './Footer.module.scss';
import SocialLink from '../SocialLink/SocialLink';
import vkLogo from '../../assets/img/social/vklogo.svg';
import telegramLogo from '../../assets/img/social/telegramlogo.svg';
import youtubeLogo from '../../assets/img/social/youtubelogo.svg';
import { Context } from '../../App';

const Footer = () => {
  const { filter, setActiveCategory } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  const findCategory = (tag) => {
    setActiveCategory(tag);
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.root}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.item}>
            <span className={styles.number}>+7 (800) 000-00-00</span>
            <span className={styles.mail}>sportclothes@mail.ru</span>
            <div className={styles.links}>
              <SocialLink img={vkLogo} link={'/'} />
              <SocialLink img={telegramLogo} link={'/'} />
              <SocialLink img={youtubeLogo} link={'/'} />
            </div>
          </div>
          <div className={styles.item}>
            <h2 className={styles.title}>Каталог</h2>
            <ul className={styles.list}>
              {filter.map((obj) => {
                return (
                  <li
                    key={obj.tag}
                    className={styles.listitem}
                    onClick={() => findCategory(obj.tag)}>
                    {obj.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.item}>
            <h2 className={styles.title}>Информация</h2>
            <ul className={styles.list}>
              <li>Политика</li>
              <li>Помощь</li>
              <li>Как оформить заказ</li>
              <li>Реквизиты</li>
              <li>Сертификаты</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
