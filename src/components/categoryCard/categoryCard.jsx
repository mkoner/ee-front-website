import React from 'react'
import { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import './categoryCard.css'
import { URL } from '../../app/constant';

export function CategoryCard({ category }) {
    const navigate = useNavigate();


    const styles = {
        backgroundImage: "url(" + `${URL}files/${category.file.id}` + ")",
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
    }


    return (
        <article onClick={()=>navigate(`/collections/${category.categoryId}`)} className="category-card" style={styles}>
            <p>{category.categoryName}</p>
        </article>
    )

}