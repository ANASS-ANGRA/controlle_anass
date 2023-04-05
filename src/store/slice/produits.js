import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Await } from "react-router-dom";

const initialState={
    produits:[],
    erreur:null,
    loading:false,
    panier:[],
    total:0,
    token:null

}
export const fetch_produits=createAsyncThunk("produits", async ()=>{
     const response= await axios.get("http://127.0.0.1:8000/api/tous_produit")
     return response
})

export const rech=createAsyncThunk("recherche",async (para)=>{
    const response= await axios.get(`http://127.0.0.1:8000/api/produit/${para}`)
    return response
})

export const login_=createAsyncThunk("login",async (data)=>{
    const response = await axios.post("http://127.0.0.1:8000/api/login",data)
    
     return response
})

export const produits_slice=createSlice({
    name:"produits",
    initialState,
    reducers:{
        recherche:(state,action)=>{
             state.produits=state.produits.filter((p)=>p.nom==action.payload)
             // return{
            //    ..state.
            // produits:state.produits.filter((p)=>p.nom==action.payload || p.desc == action.payload)
            // }
        },
        ajouter_panier:(state,action)=>{
            console.log(action.payload)
            const exist=state.panier.find(p=>p.id===action.payload.id)
            if(exist){
                alert("Le produit est déjà ajouté au panier")
            }else{
                const pr=state.produits.find(p=>p.id==action.payload.id)
                state.panier = [...state.panier, { ...pr , quantite: action.payload.quantite }];
                alert("produit ajouter dans panier")
            }
        },
        supprimer_panier:(state,action)=>{
            state.panier=state.panier.filter(p=>p.id !== action.payload)
        },
        incremment_quntite_panier:(state,action)=>{
             state.panier=state.panier.map((p)=>{
                return p.id==action.payload?
                    {...p,quantite:++p.quantite}
                :
                 {...p}
             })
        },
        decremment_quntite_panier:(state,action)=>{
            state.panier=state.panier.map((p)=>{
               if(p.id==action.payload){
                  return {...p,quantite:--p.quantite}
               }
               return{...p}
            })
       },
       Total_prix:(state,action)=>{
           state.total=0
        state.panier.map((p) => {
            state.total += p.prix * p.quantite;
          });
       }

    },
    extraReducers:(builder)=>{
        builder.addCase(fetch_produits.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(fetch_produits.fulfilled,(state,action)=>{
            state.produits=action.payload.data
            state.loading=false
        })
        builder.addCase(fetch_produits.rejected,(state,action)=>{
            state.erreur=action.payload.message
        })

        ///////////

        builder.addCase(rech.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(rech.fulfilled,(state,action)=>{
            state.produits=[action.payload.data]
            state.loading=false
        })
        builder.addCase(rech.rejected,(state,action)=>{
            state.erreur=action.payload.message
        })

        /////////////////////

        builder.addCase(login_.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(login_.fulfilled,(state,action)=>{
            state.token=action.payload.data.token
            state.loading=false
        })
        builder.addCase(login_.rejected,(state,action)=>{
            state.erreur=action.payload.message
        })
        
        
    }
})
export const {recherche ,ajouter_panier ,supprimer_panier , incremment_quntite_panier ,decremment_quntite_panier ,Total_prix }= produits_slice.actions
export default produits_slice.reducer