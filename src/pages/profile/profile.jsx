import React from 'react'
import { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'


import './profile.css'

import { updateUser, resetCustomers, getUserByNumber, logout } from '../../features/customer/customerSlice'

export default function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();


    const { isLoggedIn, createdCustomer, selectedCustomer, customerIsError, customerISuccess, customerIsLoading,
        customerMessage, customerCreated } = useSelector((state) => state.customers);

    const [customerData, setCustomerData] = useState({
        name: "",
        number: "",
        email: "",
        password: "",
        confirmedPassword: "",
    });

    const { name, number, email, password, confirmedPassword } = customerData;


    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/")
        }

        if (customerIsError) {
            alert.error(customerMessage);
        }

        if(customerMessage.includes("status code 403")){
            dispatch(logout())
        }


        setCustomerData({
            name: createdCustomer.name,
            number: createdCustomer.number,
            email: createdCustomer.email,
            password: "",
            confirmedPassword: "",
            isEnabled: createdCustomer.isEnabled,
        });


        dispatch(getUserByNumber(createdCustomer.number))

        dispatch(resetCustomers());
    }, [isLoggedIn, dispatch, navigate, customerIsError]);

    useEffect(()=>{
        setCustomerData({
            name: createdCustomer.name,
            number: createdCustomer.number,
            email: createdCustomer.email,
            password: "",
            confirmedPassword: "",
            isEnabled: createdCustomer.isEnabled,
        });
    },[createdCustomer]);

    



    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setCustomerData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();


        if (!name) {
            alert.error("Le nom ne peut être vide");
            return;
        }

        if (!(number.replaceAll(" ", "").match('[0-9]'))) {
            alert.error("Verifier le numero");
            return;
        }

        if (email &&!(email.replaceAll(" ", "").match("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])"))) {
            alert.error("Verifier l'email");

            return;
        }

        if (password && password != confirmedPassword) {
            alert.error("Echec de confirmation du mot de passe");
            return;
        }

        const customerToUpdate = {
            id: createdCustomer.customerId,
            customer: {
                name,
                number,
                email,
                password,
            }

        };


        customerToUpdate.customer.number = number ? number.replaceAll(" ", "") : "";
        customerToUpdate.customer.email = email ? email.replaceAll(" ", "") : "";

        await dispatch(updateUser(customerToUpdate));

        if (customerISuccess) {
            alert.info("Modification réussi")
        }

    }


    if (customerIsLoading) {
        return <div className="text-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }



    return (
        <div className='create-customer'>
            <form className="row g-3 needs-validation" noValidate>
                <h4>Informartions: {createdCustomer.name}</h4>
                <div className="col-12">
                    <label htmlFor="validationCustom01" className="form-label">Prénom et nom:</label>
                    <input type="text" className="form-control" id="validationCustom01" name='name'
                        onChange={handleChange} value={name} />
                </div>
                <div className="col-12">
                    <label htmlFor="validationCustom02" className="form-label">Numéro:</label>
                    <input type="text" className="form-control" id="validationCustom02" name='number'
                        onChange={handleChange} value={number} />
                </div>
                <div className="col-12">
                    <label htmlFor="validationCustomUsername" className="form-label">Adresse email:</label>
                    <div className="input-group has-validation">
                        <input type="text" className="form-control" id="validationCustomUsername"
                            onChange={handleChange} name='email' value={email} />
                    </div>
                </div>
                <div className="col-12">
                    <label htmlFor="validationCustom03" className="form-label">Mot de passe:</label>
                    <input type="password" className="form-control" id="validationCustom03"
                        onChange={handleChange} name='password' />
                </div>
                <div className="col-12">
                    <label htmlFor="validationCustom04" className="form-label">Confirmer mot de passe:</label>
                    <input type="password" className="form-control" value={confirmedPassword} name='confirmedPassword'
                        onChange={handleChange} />
                </div>

                <div className="col-12">
                    <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Modifier</button>
                </div>
            </form>
        </div>
    )
}
