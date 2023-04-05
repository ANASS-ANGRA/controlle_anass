import { configureStore } from '@reduxjs/toolkit';
import  produits_slice  from './slice/produits';


export const Store=configureStore({
    reducer:{
        produits:produits_slice
    }
})

