import React from 'react';

import styles from './SocialLink.module.scss';

const SocialLink = ({ img, link }) => {
  return (
    <a className={styles.root} href={link}>
      <img src={img} alt="" />
    </a>
  );
};

export default SocialLink;
