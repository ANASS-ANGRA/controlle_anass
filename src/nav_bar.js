import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import { rech, recherche } from "./store/slice/produits"



function Nav_bar(){
    const [input_recherche,setRecherche]=useState()
    const dispatch=useDispatch()
    return(
        <div >
        <div id="nav_bar">
          
            <ul>
            <li><Link to="/">accueil</Link></li>
            <li><Link to="/produit">produit</Link></li>
            <li><Link to="/panier">panier</Link></li>
            </ul>
           <input type="text" value={input_recherche} onChange={(e)=>{setRecherche(e.target.value)}} />
           <button onClick={()=>{dispatch(rech(input_recherche))}}>recherche</button>
        </div>
        </div>
    )
}
export default Nav_bar