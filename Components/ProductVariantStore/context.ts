import {Context, createContext, useContext, useMemo} from "react";
import ProductVariantStoreClass from "@/Components/ProductVariantStore/ProductVariantStoreClass";
export const productData = new ProductVariantStoreClass();
export const ProductContext = createContext<ProductVariantStoreClass>(productData);


export const useStore = () => {

    return useContext(ProductContext);
} ;
