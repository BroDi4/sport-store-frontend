import React, { useContext, useEffect, useState } from 'react';
import axios from '../axios';

import SearchBlock from '../components/SearchBlock/SearchBlock';
import Filter from '../components/Filter/Filter';
import Itemlist from '../components/Itemlist/Itemlist';
import { Context } from '../App';

const Home = () => {
  const { activeCategory, setActiveCategory } = useContext(Context);
  const [products, setProducts] = useState([]);
  const [selectedSort, setSelectedSort] = useState({ name: 'По возрастанию цены', tag: 'price' });
  const [searchValue, setSearchValue] = useState('');

  const fetchProducts = async () => {
    const { data } = await axios.get(
      `/products?search=${searchValue}&sort=${selectedSort.tag}&category=${activeCategory}`,
    );
    setProducts(data);
  };

  useEffect(() => {
    try {
      fetchProducts();
    } catch (err) {
      console.log('cant resive products');
    }
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
      <Itemlist products={products} />
    </main>
  );
};

export default Home;
