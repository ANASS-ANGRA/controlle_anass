import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ajouter_panier, fetch_produits } from "./store/slice/produits"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";



function List_produit(){
    const produits=useSelector((state)=>state.produits.produits)
    const loading=useSelector((state)=>state.produits.loading)
    const token=useSelector((state)=>state.produits.token)
    const dispatch=useDispatch()
    const nav=useNavigate()
     useEffect(()=>{
        dispatch(fetch_produits())
     },[])
  
     function env_panier(e){
        e.preventDefault()
       // if(token==null){
         // nav("/login")
       // }else{
           const quantite=parseInt(e.target.quantite.value)
       const id =parseInt(e.target.quantite.id)
       const  data={id:id,quantite:quantite}
     // const data= {...p,quantite:quantite}
       //console.log(p)
       //(e)=>{env_panier(e,p)}
      dispatch(ajouter_panier(data))
       // }
       
     }
 
      if(loading==true){
        return (<div>Chargement en cours...</div>)
      }
        

    
    return(
        <div id="list_produit">
            <h1>list produits</h1>
          <Row xs={1} md={2} className="g-4">
            {produits?.map((p,i)=>(
               <Col>
               
                <form key={p.id} onSubmit={env_panier} >
                    <img src={p.image} height="200px" />
                    <h1>{p.nom}</h1>
                    <p>{p.description}</p>
                    <p>{p.prix}</p>
                    <input type="number" name="quantite"  id={p.id} />
                    <button >ajouter panier</button>
                </form>
                </Col>
            ))}
            </Row>
        </div>
    )
}
export default List_produit