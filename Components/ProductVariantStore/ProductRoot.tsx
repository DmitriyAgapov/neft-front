'use client'
import {ProductContext, productData} from "@/Components/ProductVariantStore/context";


const ProductRoot = ({children}:{children: React.ReactNode}) => {
    return <ProductContext.Provider value={productData}>
        {children}
    </ProductContext.Provider>
}
export default ProductRoot