import React from 'react'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert'

import './login.css'

import { login, resetCustomers } from '../../features/customer/customerSlice';


export default function Login() {
    const alert = useAlert();

    const [formData, setFormData] = useState({
        number: "",
        password: "",
    });

    const { number, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoggedIn, customerIsError, customerISuccess, customerIsLoading, customerMessage } = useSelector(
        (state) => state.customers
    );

    useEffect(() => {
        if (customerIsError) {
            alert.error("Echec de connexion Vérifiez vos identifiants");
        }

        if (customerISuccess) {
            navigate("/");
        }

        return () => {
            dispatch(resetCustomers());
        }
    }, [alert, customerIsError, customerISuccess, customerMessage, navigate, dispatch]);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        const userData = {
            number,
            password,
        };

        dispatch(login(userData));
    };



    return (
        <div className="container-scroller login-page-page">
            <div className="container-fluid page-body-wrapper">
                <div className="row">
                    <div className='login-page'>
                        <h4>Connectez vous à votre compte</h4>
                        <form className="pt-5" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label
                                    htmlFor="email"
                                    data-i18n="account.email_or_telephone"
                                >
                                    Numéro de telephone*
                                </label>
                                <input
                                    value={number}
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                    id="email_or_telephone"
                                    aria-describedby="emailHelp"
                                    name="number"
                                    required
                                />
                                <i className="mdi mdi-account"></i>
                            </div>
                            <div className="form-group ">
                                <label htmlFor="password">Mot de passe*</label>
                                <input
                                    value={password}
                                    onChange={handleChange}
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                />
                            </div>
                            <div className="mt-5 login-btn">
                                <button 
                                disabled={
                                    number.length == 0 ||
                                    password.length == 0 ||
                                    customerIsLoading
                                }
                                type="submit"
                                className="btn btn-block btn-success btn-lg font-weight-medium">
                                    Connexion
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="link-register mb-4">
                    <p> Vous n'avez pas encore de compte?</p>
                    <button type="button" onClick={(()=>navigate("/register"))} className="btn btn-dark">Créer un compte</button>
                </div>
            </div>
        </div>
    )
}
