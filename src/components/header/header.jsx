import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, Outlet, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import './header.css'

import Logo from '../../assets/e2logo.jpg'

import {getLineItemById} from "../../features/lineItem/lineItemSlice"
import CartItem from '../cartItem/cartItem';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {lineItems, selectedLineItem, } = useSelector((state) => state.lineItems);

  var total = 0;
    lineItems?.map(item => total+=item.lineItemPrice)
      
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
  <div className="container-fluid">
  <a className="navbar-brand" href="Homepage.html"><img src={Logo} width="30" height="30" className="d-inline-block align-top"/> Electronics Express</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul className="navbar-nav container">
        <li className="nav-item">
        <a className="nav-link active" href="/">Accueil</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="/articles">Articles</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="#" data-bs-toggle="modal" data-bs-target="#myModal">Cart <i className="bi bi-cart-dash-fill"></i></a>
              </li>
              <li className="nav-item active">
        <a className="nav-link active" href="/login">Login</a>
      </li>
      </ul>
    </div>
  </div>
      </nav>
      
      

      
      <div
            className="modal fade"
            id="myModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Votre panier
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="cart-contents">
                {
                  lineItems?.map(item => <CartItem key={item.lineItemId} item={item} />)
                    }
                  
                  </div>
                </div>
            <div className="modal-footer">
              <div className="total">
                Total: {total}
              </div>
              <div className="footer-buttons">
              <button
                    type="button"
                    className="btn btn-secondary mr-3"
                    id="closeModal"
                    data-bs-dismiss="modal"
                  >
                    Fermer
                  </button>
                  <button
                    type="button"
                    className="btn btn-success "
                    data-bs-dismiss="modal"
                  >
                    <Link to={"/checkout"}>Passer la commande</Link>
                    
                  </button>
              </div>
                  
                </div>
              </div>
            </div>
          </div>

</header>
  )
}

export default Header