import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAsync
} from './cartSlice';
import './Cart.css';

export function Cart() {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();

  const items = useSelector(state => state.cart.items)

  useEffect(() => {
      dispatch(fetchAsync())
  },[]);

  console.log(items);
  return (
    <div>
      <div>
        {/* <button          
          aria-label="Decrement value"
          onClick={() => dispatch(fetchAsync())}
        >
          fetch Products
        </button> */}
        {items.map((item) => 
            <div className="cart-item">
            <img
              className="img-fluid"
              src={item.thumbnail}
              alt=""
            />
            <div className="description">
              <p>{item.title}</p>
              <span>{item.brand}</span>
              <strong>${item.price}</strong>
            </div>
            <div className="quantity">
              Quantity
              <select value={item.quantity}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
            <div className='close'>
              <button>X</button>
            </div>
          </div>     
        )}        

      </div>
      
    </div>
  );
}
