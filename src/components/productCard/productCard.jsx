import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, Outlet, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { createLineItem } from '../../features/lineItem/lineItemSlice';

import './productCard.css'


function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { lineItems, selectedLineItem, lineItemCreated, lineItemMessage,
    lineItemIsLoading, lineItemISuccess, lineItemIsError } =
    useSelector((state) => state.lineItems);
  
  const addToCart = async (id) => {
    const line = {
      productId: id,
      lineItemQuantity: 1,
    }
    await dispatch(createLineItem(line));
  }

    return (
<div className="card">
  <img src={`data:image/*;base64,${product.files[0].data}`} className="card-img-top" alt="..."/>
    <div className="card-body">
    <div className="pname-prce">
    <h5 className="card-title">{product.productName}</h5>
    <h5 className="card-title">{product.productPrice} FCFA</h5>
    </div>
    <p className="card-text">{product.productDescription}</p>
    <div className="card-buttons">
    <a href="/checkout" className="btn btn-info">Commander</a>
    <a href="#" className="btn btn-primary" onClick={()=>addToCart(product.productId)}>Ajouter au panier</a>
    </div>
  </div>
</div>
    );
}

export default ProductCard;