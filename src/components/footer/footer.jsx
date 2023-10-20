import React from 'react'

import './footer.css'

function Footer() {
    return ( 
        <footer>
            <div class="footer">
            <div class="row" id="break">
            <div class="col-lg-4 col-sm-4 col-xs-4">
      <h3>Actualite</h3>
        <hr/>
    </div>
    <div class="col-lg-4 col-sm-4 col-xs-4" id="corner">
    <h3>Location</h3>
    <hr/>
    <b>Lome, Togo</b><br/><br/>
    <p><strong>CONTACT</strong></p>
    <hr/>
    (+228) 93-49-49-83 <br/><br/>
    (+228) 90-03-47-75 <br/><br/><br/>
                </div>
                <div class="col-lg-4 col-sm-4 col-xs-4">
      <h3>Hours Of Operation</h3>
        <hr/>
             <span id="date"> 
          Lundi-Mercredi: 8h-17h <br/>
          Jeudi-Vendredi: 10h-16h <br/>
          Samedi-Dimanche: 07h-18h <br/>
      </span>
    </div>
                </div>
                </div>
        </footer>
     );
}

export default Footer;