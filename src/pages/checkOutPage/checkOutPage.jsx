import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, Outlet, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CartItem from '../../components/cartItem/cartItem';

import './checkOutPage.css'

import { createOrder, reset } from '../../features/order/orderSlice';
import { createUser, getUserByNumber } from '../../features/customer/customerSlice';
import customerService from '../../features/customer/customerService';
import OrderSuccess from '../../components/orderSuccess/orderSuccess';

export default function CheckOutPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { lineItems, selectedLineItem, lineItemIsError, lineItemISuccess, lineItemIsLoading, lineItemMessage }
        = useSelector((state) => state.lineItems);
    
    const { orders, orderCreated, selectedOrder, orderIsError, orderISuccess, orderIsLoading, orderMessage }
        = useSelector((state) => state.orders);
    
    const { customers, selectedCustomer, createdCustomer, customerIsError, customerISuccess, customerIsLoading, customerMessage }
        = useSelector((state) => state.customers);
    
    const [customer, setCustomer] = useState({
        name: "",
        email: null,
        password: "",
        number:"",
    })
    const [address, setAddress] = useState({
        addressCity: "",
        addressLine1: "",
        addressLine2: "",
    })

    const onCustomerChange = (evt) => {
        const { value, name } = evt.target;
        setCustomer((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });       
    }

    const onAddressChange = (evt) => {
        const { value, name } = evt.target;
        setAddress((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });       
    }


    const checkIfCustomerExists = async (number) => {
        const customer1 = await customerService.getUserByNumber(customer.number);
    
        return customer1.customerId ? customer1.customerId : null;
    }
    const onOrderSubmit = async (evt) => {
        evt.preventDefault();

        try {
            const customer1 = await checkIfCustomerExists(customer.number);
                const order = {
                    customerId: customer1.customerId,
                    address: {
                        addressCity: address.addressCity,
                        addressLine1: address.addressLine1,
                        addressLine2: address.addressLine2,
                    },
                    lineItemIds: lineItems?.map(line=>line.lineItemId)
                }
                dispatch(createOrder(order));
        } catch (error) {
            await dispatch(createUser(customer));
            const order = {
                customerId: createdCustomer.customerId,
                address: {
                    addressCity: address.addressCity,
                    addressLine1: address.addressLine1,
                    addressLine2: address.addressLine2,
                },
                lineItemIds: lineItems?.map(line=>line.lineItemId)
            }
            dispatch(createOrder(order));
        }

    }

    if (orderCreated) {
        dispatch(reset())
        return <OrderSuccess/>
    }

    var total = 0;
    lineItems?.map(
        item => total += item.lineItemPrice
    )
    
  return (
      <div className='check-out-container container'>
          <div className="order-summury">
          <h4>Détails de la commande</h4>
              {
                  lineItems?.map(item=><CartItem item={item} key={item.lineItemId} /> )
              }
              <div className="total">
                  Total: {total} FCFA
              </div>
          </div>
          <div className="custumer-info">
    <form>
    <h4>Info personnelle</h4>
  <div className="form-group">
    <label >Prénom et nom*</label>
    <input type="text" className="form-control" value={customer.name} name="name" 
       placeholder="Entrez votre prénom et nom" required onChange={onCustomerChange}/>
  </div>
  <div className="form-group">
    <label>Entrez votre numéro de téléphone*</label>
    <input type="text" className="form-control" value={customer.number} 
    name="number" placeholder="numéro de téléphone" required onChange={onCustomerChange} />
  </div>
  <div className="form-group">
    <label>Entrez votre adresse email</label>
    <input type="text" className="form-control" value={customer.email} 
    name="email" placeholder="adresse email" onChange={onCustomerChange} />
  </div>
</form>
</div>
<div className="shipping-address">
<form>
<h4>Adresse de livraison</h4>
  <div className="form-group">
    <label >Ville*</label>
    <input type="text" className="form-control" name='addressCity' required 
    value={address.addressCity} placeholder="Entrez ville de livraison" onChange={onAddressChange} />
  </div>
  <div className="form-group">
    <label>Quartier*</label>
    <input type="text" className="form-control" name='addressLine1' required
    value={address.addressLine1} placeholder="Entrez quartier de livraison" onChange={onAddressChange}/>
  </div>
  <div className="form-group">
    <label>Description</label>
    <input type="text" className="form-control" name='addressLine2' value={address.addressLine2} 
    placeholder="Entrez d'autres descriptifs" onChange={onAddressChange}/>
  </div>

</form>
</div>
<div className="commander">
<button type="submit" className="btn btn-primary" onClick={onOrderSubmit}>COMMANDER</button>
</div>
          
</div>
  )
}
