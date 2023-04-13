import React, { useEffect, useState } from 'react';

import SearchBlock from '../components/SearchBlock/SearchBlock';
import Filter from '../components/Filter/Filter';
import Booklist from '../components/Itemlist/Itemlist';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState({ name: 'По цене ⬇', tag: 'price' });
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetch(
      `http://localhost:4000/products?search=${searchValue}&sort=${selectedSort.tag}&category=${activeCategory}`,
    )
      .then((res) => res.json())
      .then((result) => setProducts(result));
  }, [activeCategory, selectedSort, searchValue]);

  return (
    <main>
      <SearchBlock
        sortValue={selectedSort}
        onClickSort={(obj) => setSelectedSort(obj)}
        searchValue={searchValue}
        onChangeSearch={(value) => setSearchValue(value)}
      />
      <Filter value={activeCategory} onClickCategory={(tag) => setActiveCategory(tag)} />
      <Booklist books={products} />
    </main>
  );
};

export default Home;
