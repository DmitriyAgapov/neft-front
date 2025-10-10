'use client'

import ProductSelector from "@/Components/ProductSelector/ProductSelector";
import ProductVariants from "@/Components/ProductVariants/ProductVariants";
import {TabsProduct} from "@/Components/TabsProduct";
import {queryWrapper} from "@/utils/queryWrapper";
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

    const { data, error, isLoading, mutate  } = useSWR(
        [`http://127.0.0.1:1337/graphql`, filters],
        ([url, filters]) => fetcher(url, productsQuery , {filters: {...filters, "type": {
                    "eq": "mixers"
                }}}
        )
    );

    useEffect(() => {
        console.log('New, filters', filters)
    }, [filters])

    if (isLoading) return 'Loading';
    if (data?.data.products && data?.data.products.length === 0) return
    return <ProductVariants products={data?.data.products}/>

})