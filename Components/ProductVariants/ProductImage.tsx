'use client'
import {ImageCustoms} from "@/Components/ImageCustom";
import {observer} from "mobx-react-lite";
import {useStore} from "@/Components/ProductVariantStore/context";
import {useMemo} from "react";
import {useDebouncedState} from "@mantine/hooks";

const ProductImage = observer((props:any) => {
    const store = useStore();
    const [value, setValue] = useDebouncedState(props.url, 500);
    const path = store.imageSrcPath;

    const srcImg = useMemo(() => {
        if (path) {
            const value = process.env.NEXT_PUBLIC_IMG_PROD + `products/mixers/variants/${path}.png`;
            setValue(value)
            return value
        } else {
            return props.url
        }
    }, [path, props.url]);
    console.log(srcImg)
    return <div data-content={"section_image"} className={srcImg !== value ? "animate-hideandopacity" : ""}>
        <ImageCustoms src={srcImg} width={props.width} height={props.height}/>
    </div>
})
export default ProductImage