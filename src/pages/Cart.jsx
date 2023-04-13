import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import Cartlist from '../components/Cartlist/Cartlist';
import { Context } from '../App';
import Emptycart from '../components/Emptycart/Emptycart';

const Cart = () => {
  const { cart, isAuth } = useContext(Context);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return <>{cart.length > 0 ? <Cartlist /> : <Emptycart />}</>;
};

export default Cart;
