import React from 'react'
import { useNavigate, Outlet, Link, useParams } from "react-router-dom";

import ProductCard from '../productCard/productCard'

import './shopPageItem.css'

export default function ShopPageItem({ categoryName, items }) {
  return (
    <div className="shop-page-item-container mt-4 mb-4">
          <h4 className='mb-4'>{categoryName}</h4>
          <div className="items">
          {
              items.map(item => <ProductCard key={item.productId} product={item} />)
          }
          </div>
          <div className="view-more mt-4">
          <button type="button" class="btn btn-info">
            <Link to={`/collections/${items[0].category.categoryId}`}>Voir plus </Link>
          </button>
          </div>
    </div>
  )
}
