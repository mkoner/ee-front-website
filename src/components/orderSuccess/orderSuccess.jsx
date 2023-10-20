import React from 'react'

import './orderSuccess.css'

export default function OrderSuccess() {
  return (
    <div className='container order-success bg-light'>
        <p>
              Votre commande a été reçu vous recevrez votre article bientôt.<br />
              Merci pour votre confiance!
        </p>
        <a className="nav-link active bg-dark" href="/">Continuer votre shoping</a>
    </div>
  )
}
