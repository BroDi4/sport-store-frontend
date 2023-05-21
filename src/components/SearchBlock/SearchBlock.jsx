import React, { useEffect, useRef, useState } from 'react';

import styles from './SearchBlock.module.scss';
import searchimg from '../../assets/img/search.svg';
import arrowimg from '../../assets/img/arrow.svg';

const SearchBlock = ({ sortValue, onClickSort, searchValue, onChangeSearch }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const sortBox = useRef(null);
  const sortMethdos = [
    { name: 'По возрастанию цены', tag: 'price' },
    { name: 'По убыванию цены', tag: '-price' },
    { name: 'По названию', tag: 'title' },
  ];

  const selectSort = (obj) => {
    onClickSort(obj);
    setOpenPopup(false);
  };

  const handleOutsideClick = (event) => {
    if (sortBox.current && !sortBox.current.contains(event.target)) {
      setOpenPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.searchblock}>
      <div className={styles.search}>
        <img src={searchimg} alt="" />
        <input
          onChange={(e) => onChangeSearch(e.target.value)}
          value={searchValue}
          type="text"
          placeholder="Поиск..."
        />
      </div>
      <div className={styles.sortbox}>
        <div onClick={() => setOpenPopup(!openPopup)} className={styles.sort} ref={sortBox}>
          <img src={arrowimg} className={openPopup ? styles.arrow_open : ''} alt="" />
          <span>{sortValue.name}</span>
        </div>
        {openPopup && (
          <>
            <div className={styles.popup}>
              <ul>
                {sortMethdos.map((obj, i) => {
                  return (
                    <li key={i} onClick={() => selectSort(obj)}>
                      {obj.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBlock;
