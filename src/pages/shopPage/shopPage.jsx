import React from 'react'
import { useEffect, useState, useMemo } from "react";
import { useNavigate, Outlet, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getAllCategories, reset } from '../../features/category/categorySlice';
import { getAllProducts } from '../../features/product/productSlice';

import "./shopPage.css"
import ShopPageItem from '../../components/shopPageItem/shopPageItem';
import ArticlesHeader from '../../components/articlesHeader/articlesHeader';

export default function ShopPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { categories, categoryIsError, categoryIsSuccess, categoryIsLoading, categoryMessage }
        = useSelector((state) => state.categories);
    const { products, productIsError, productIsLoading, productMessage} = useSelector((state) => state.products);

    var [stateCategories, setStateCategories] = useState([])
    
        useEffect(() => {
            if (categoryIsError) {
              console.log(categoryMessage);
            }
            if (categoryIsError) {
                console.log(categoryMessage);
            }
            dispatch(getAllCategories());
            dispatch(getAllProducts(""));
            return () => {
              dispatch(reset());
            };
        }, [dispatch]);
    

  var cat = {}
  const fetchProducts = async () => {
    //await dispatch(getAllCategories())
    //await dispatch(getAllProducts(""));
    categories.map(category => {
      cat[category.categoryName] = []
      products.content?.map(product => {
        if (category.categoryId == product.category.categoryId)
          cat[category.categoryName].push(product)
      })
    })
  }

  fetchProducts();
  var arrayCat = [];
  for (const key in cat) {
    var obj = {}
    obj.name = key;
    obj.items = cat[key];
    arrayCat.push(obj);
  }
 
  return (
    <div>
      <ArticlesHeader items={categories}/>
      <div className="shop-page-container">
      <h1>Nos Articles</h1>
      {
        arrayCat.filter((item, idx)=>idx<4)
          .map((item, idx) => item.items.length>0?<ShopPageItem key={idx} categoryName={item.name} items={item.items} />: null)
      }
    </div>
    </div>
  )
}
