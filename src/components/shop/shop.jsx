import React from 'react'
import { useEffect, useState, useMemo } from "react";
import { useNavigate, Outlet, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getAllCategories1, resetCategories } from '../../features/category/categorySlice';
import { getAllProducts1, resetProducts } from '../../features/product/productSlice';

import "./shop.css"
import ShopPageItem from '../../components/shopPageItem/shopPageItem';

export default function Shop() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allCategories, categoryIsError, categoryIsSuccess, categoryIsLoading, categoryMessage }
    = useSelector((state) => state.categories);

  const { allProducts, productIsError, productIsSuccess, productIsLoading, productMessage }
    = useSelector((state) => state.products);


  useEffect(() => {
    if (categoryIsError) {
      console.log(categoryMessage);
    }
    if (productIsError) {
      console.log(productMessage);
    }
    dispatch(getAllCategories1());
    dispatch(getAllProducts1())
    return () => {
      dispatch(resetCategories());
      dispatch(resetProducts());
    };
  }, [dispatch]);


  const groupByCategory = allProducts.reduce((group, product) => {
    const category = product.category.categoryName;
    group[category] = group[category] ?? [];
    group[category].push(product);
    return group;
  }, {});
 

  return (
    <div className="shop-page-container">
      {productIsLoading ?
        <div className="d-flex justify-content-center mt-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        :
        <section>
          {
            Object.keys(groupByCategory).map((oneKey, i) => {
              return (
                <ShopPageItem key={i} categoryName={oneKey}
                  categoryId={groupByCategory[oneKey][0].category.categoryId} items={groupByCategory[oneKey]} />

              )
            })
          }
        </section>}
    </div>
  )
}
