import { useDispatch, useSelector } from "react-redux"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { decremment_quntite_panier, incremment_quntite_panier, supprimer_panier, Total_prix } from "./store/slice/produits";
import { useEffect, useState } from "react";

function Panier(){
    const {panier}=useSelector(state=>state.produits)
    const {total}=useSelector(state=>state.produits)

    const dispach=useDispatch()
    useEffect(()=>{
      dispach(Total_prix())
    },[panier])

    return(
        <div>
            <h1>panier</h1>
            <Table striped bordered hover>
                <tbody>
                <tr><td>produit</td><td>image</td><td>prix</td><td>quantite</td><td>prix total</td><td>action</td></tr>
                
                    {panier?.map((p)=>(
                         
                        <tr key={p.id}>
                            <td><h3>{p.nom}</h3></td>
                            <td><img src={p.image} height="100px"/></td>
                            <td>prix :{p.prix}</td>
                            <td>
                                <button onClick={()=>{dispach(incremment_quntite_panier(p.id))}}>+</button>
                                <h3>{p.quantite}</h3>
                                <button onClick={()=>{dispach(decremment_quntite_panier(p.id))}}>-</button></td>
                            <td>{p.prix*p.quantite}</td>
                            <td> <button onClick={()=>{dispach(supprimer_panier(p.id))}}>supp</button></td>
                        </tr>
                    ))}
                    

                </tbody>
            </Table>
            <h1>total : {total}</h1>
        </div>
    )
}
export default Panier