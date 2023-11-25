import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteAsync, updateAsync
} from './cartSlice';
import './Cart.css';

export function Cart() {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();

  const items = useSelector(state => state.cart.items)

  const handleChange = (e,id) => {
    console.log(e.target.value);
    dispatch(updateAsync({id,change :{quantity : +e.target.value}}));
  }

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
              <select value={item.quantity} onChange={(e) => handleChange(e,item.id)}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
            <div className='close'>
              <button onClick={() => dispatch(deleteAsync(item.id))}>X</button>
            </div>
          </div>     
        )}        

      </div>
      <h1>Total : Rs. {items.reduce((acc,item) => item.price * item.quantity + acc,0)}</h1>
    </div>
  );
}
