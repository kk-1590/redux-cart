import React, { useState } from 'react';
import './App.css';
import { Products } from './features/products/Products';
import { Cart } from './features/cart/Cart';
import { useSelector } from 'react-redux';

function App() {
  const [showCart,setShowCart] = useState(false);
  const items = useSelector((state) => state.cart.items);
  return (
    <div className="App">
      {/* <Cart></Cart> */}
          <button onClick={() => setShowCart(!showCart)}>Cart [ {items.length} ]</button>
          {showCart ? <Cart></Cart> : <Products></Products>}
      {/* <Products></Products> */}
    </div>
  );
}

export default App;
