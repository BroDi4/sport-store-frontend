import React, { useContext } from 'react';

import Favoritelist from '../components/Favoritelist/Favoritelist';
import Emptyfavorite from '../components/Emptyfavorite/Emptyfavorite';
import { Context } from '../App';

const Favorite = () => {
  const { favorite } = useContext(Context);

  return <>{favorite.length > 0 ? <Favoritelist /> : <Emptyfavorite />}</>;
};

export default Favorite;
