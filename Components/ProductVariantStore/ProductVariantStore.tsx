'use client'

import ProductVariants from "@/Components/ProductVariants/ProductVariants";
import {productsQuery} from "@/utils/gql/config";
import useSWR from "swr";
import {useStore} from "@/Components/ProductVariantStore/context";
import {useEffect} from "react";
import {observer} from "mobx-react-lite";
const fetcher = (url: string, query: string | null | undefined, variables = {}) => fetch(url, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        query: query,
        variables: variables
    }),
}).then((r) => r.json())
export const ProductVariantsBlock = observer(() => {
    const store = useStore();
    const filters = store.getParams;

    const { data,  isLoading  } = useSWR(
        [process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_NEXT_API_DEV as string : process.env.NEXT_PUBLIC_NEXT_API as string, filters],
        ([url, filters]) => fetcher(url, productsQuery , {filters: {...filters, "type": {
                    "eq": "mixers"
                }}}
        )
    );
    if (isLoading) return 'Loading';
    if (!data?.data || data?.data.products && data?.data?.products.length === 0) return
    return <ProductVariants products={data?.data.products}/>

})