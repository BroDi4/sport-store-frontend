import React, { useContext } from 'react';
import Cartlist from '../components/Cartlist/Cartlist';

import { Context } from '../App';
import Emptycart from '../components/Emptycart/Emptycart';

const Cart = () => {
  const { cart } = useContext(Context);

  return <>{cart.length > 0 ? <Cartlist /> : <Emptycart />}</>;
};

export default Cart;
