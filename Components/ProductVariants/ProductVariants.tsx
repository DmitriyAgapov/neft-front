'use client'
import VariantCard from "@/Components/Cards/VariantCard";
import styles from './ProductVariants.module.css'
import React, {useMemo, useState} from "react";

const ProductVariants = ({products}: {products: any[]}) => {
    const [selected, setSelected] = useState();

    if (!products) return 'Loading';
    const productItems:React.ReactNode[] = useMemo(() => {
        if (selected) {
          return products.filter(el => el.slug === selected).map((el:any) => <VariantCard setSelected={setSelected} key={el.slug} image={el.Image ? {
              ...el.Image,
              ...(el.Image ? {...el.Image, src: el.Image.url} : {})
          } : null} {...el}/>)
        }
        return products.map((el:any) => <VariantCard setSelected={setSelected} key={el.slug} image={el.Image ? {
            ...el.Image,
            ...(el.Image ? {...el.Image,
                src: el.Image.url
            } : {})
        } : null} {...el}/>)
    }, [selected, products])
    return (
        <div data-content={"section_variants"} className={styles.root}>
            {productItems}
        </div>
    )
}

export default ProductVariants