import React from 'react'
import { useNavigate, Outlet, Link, useParams } from "react-router-dom";

import './articlesHeader.css'

export default function ArticlesHeader({items}) {
  return (
    <div className="ah-container bg-primary ">
          <nav className='navbar navbar-light bg-light' >
              <ul className='navbar-nav'>
                  {items.map((item, idx) => <li key={idx} className ='nav-item bg-primary' >
                      <Link className="text-white nav-link m-2 p-2" to={`/collections/${item.categoryId}`}>{item.categoryName.toUpperCase()}</Link>
                  </li>)}
              </ul>
          </nav>
    </div>
  )
}
