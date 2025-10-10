'use client'
import useSWR from 'swr'
import {productsQuery} from "@/utils/gql/config";
import VariantCard from "@/Components/Cards/VariantCard";
import styles from './ProductVariants.module.css'
import {useStore} from "@/Components/ProductVariantStore/context";
import {useMemo, useState} from "react";
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

const ProductVariants = ({products}: {products: any[]}) => {
    const [selected, setSelected] = useState();
    console.log(selected);
    // const { data, error, isLoading } = useSWR(
    //     `http://127.0.0.1:1337/graphql`,
    //     () => fetcher(`http://127.0.0.1:1337/graphql`, productsQuery , {})
    // );
    if (!products) return 'Loading';
    const productItems = useMemo(() => {
        if (selected) {
          return products.filter(el => el.slug === selected).map((el:any) => <VariantCard setSelected={setSelected} key={el.slug} image={el.Image ? {
              ...el.Image,
              ...(el.Image ? {...el.Image, src: `http://127.0.0.1:1337`+el.Image.url} : {})
          } : null} {...el}/>)
        }
        return products.map((el:any) => <VariantCard setSelected={setSelected} key={el.slug} image={el.Image ? {
            ...el.Image,
            ...(el.Image ? {...el.Image, src: `http://127.0.0.1:1337`+el.Image.url} : {})
        } : null} {...el}/>)
    }, [selected, products])
    return (
        <div data-content={"section_variants"} className={styles.root}>
            {productItems}
        </div>
    )
}

export default ProductVariants