import { useEffect, useState, useMemo } from "react";
import { useNavigate, Outlet, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ProductCard from "../../components/productCard/productCard";

import './collectionPage.css'

import { reset, getAllProducts } from "../../features/product/productSlice"
import {getCategoryById} from "../../features/category/categorySlice"

function CollectionPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { products, selectedProduct, productIsError, productISuccess, productIsLoading,
        productMessage, productCreated } =
        useSelector((state) => state.products);
    
    const { selectedCategory, categoryIsError, categoryIsLoading, categoryMessage } =
        useSelector((state) => state.categories);
    
    const [searchString, setSearchString] = useState({
        categoryId: id,
        pageSize: 20,
        currentPage: 0,
          });
    
        useEffect(() => {
            if (productIsError) {
              console.log(productMessage);
            }
            if (categoryIsError) {
                console.log(categoryMessage);
              }

        const string = `?categoryId=${searchString.categoryId}&pageSize=${searchString.pageSize}&currentPage=${searchString.currentPage}`

        dispatch(getCategoryById(id));
         
         const fetchData = async ()=>{
            await dispatch(getCategoryById(id));
            await dispatch(getAllProducts(string));
         }
         fetchData()
        
            return () => {
              dispatch(reset());
            };
        }, [id, dispatch, products]);
    
    const productList = products.content;

    return (
        <div className="collection">
            <h3 className="collection-title">{selectedCategory.categoryName}</h3>
            <div className="collection-items">
                {
                    productList?.map(item => {
                        return <ProductCard product = {item} key ={item.productId}/>
                    })
        
                }
            </div>
        </div>
    );
}

export default CollectionPage;