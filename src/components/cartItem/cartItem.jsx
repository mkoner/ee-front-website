import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate, Outlet, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { updateLineItem, deleteLineItem } from '../../features/lineItem/lineItemSlice';

import './cartItem.css';

const CartItem = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setqty] = useState(item.lineItemQuantity)

  const updateItem = async(quantity) => {
    const line = {
      id: item.lineItemId,
      lineItem: {
        lineItemQuantity: quantity
      }
    }
    await dispatch(updateLineItem(line));
  }

  const deleteItem = async (id) => {
    await dispatch(deleteLineItem(id));
  }

  const onQtyChange = (evt) => {
    evt.preventDefault();
    if (evt.target.value <= 0)
      setqty(1);
    else
    setqty(evt.target.value);
    updateItem(evt.target.value) 
  }

  return (
    <div className='cart-item'>
    <img src={`data:image/*;base64,${item.product.files[0].data}`} alt='item' />
    <div className='item-details'>
      <span className='name'>{item.product.productName}</span>
      <span className='price'>
        {qty} x {item.product.productPrice}
      </span>
      </div>
      <div className="line-item-price">
      {qty*item.product.productPrice}
    </div>
    <div className="update-item-quantity">
    <input type="number" id="quantity" name="quantity" min="1" defaultValue={qty} onChange={(evt)=>onQtyChange(evt)}/>
    </div>
      <div className="remove">
      <i class="bi bi-trash" onClick={()=>deleteItem(item.lineItemId)}></i>
    </div>
  </div>
  )
}

export default CartItem;