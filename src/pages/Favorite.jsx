import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import Favoritelist from '../components/Favoritelist/Favoritelist';
import Emptyfavorite from '../components/Emptyfavorite/Emptyfavorite';
import { Context } from '../App';

const Favorite = () => {
  const { favorite, isAuth } = useContext(Context);

  if (!isAuth) {
    return <Navigate to={'/login'} />;
  }

  return <>{favorite.length > 0 ? <Favoritelist /> : <Emptyfavorite />}</>;
};

export default Favorite;
