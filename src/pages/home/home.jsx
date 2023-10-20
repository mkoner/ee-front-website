import React from 'react'
import { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import './home.css'

import { getAllCategories1, resetCategories } from '../../features/category/categorySlice';
import { CategoryCard } from '../../components/categoryCard/categoryCard';
import Shop from '../../components/shop/shop';


export function Home() {
    const dispatch = useDispatch();


    const { allCategories, categoryIsError, categoryIsSuccess, categoryIsLoading, categoryMessage }
        = useSelector((state) => state.categories);


    useEffect(() => {
        if (categoryIsError) {
            console.log(categoryMessage);
        }
        if (categoryIsError) {
            console.log(categoryMessage);
        }
        dispatch(getAllCategories1());
        return () => {
            dispatch(resetCategories());
        };
    }, [dispatch]);

    useEffect(() => {

    }, [allCategories]);


    return (
        <div className="home-page">
            <section className="home-page-section">
                <div>
                    <p className='home-page-section-title'>Meilleur <span>qualité</span>, meilleur <span>prix</span></p>
                    <p className='home-page-section-para'>Offrez-vous le <span>meilleur</span></p>
                </div>
            </section>
            {categoryIsLoading ?
                <div className="d-flex justify-content-center mt-4">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                :
                <div className="categories-container m-4">
                    <h4 className='m-0'>Trouver un article par catégories</h4>
                    {allCategories && <section className="categies m-0">
                        {
                            allCategories?.map(category => <CategoryCard category={category} key={category.categoryId} />)
                        }
                    </section>}

                </div>}
            <section className="our-products">
                <Shop />
            </section>
        </div>
    )

}