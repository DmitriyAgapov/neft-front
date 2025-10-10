
import styles from './ProductSelector.module.css';
import {ImageCustoms} from "@/Components/ImageCustom";
import {observer} from "mobx-react-lite";
import ProductSelectVariant from "@/Components/ProductVariants/ProductSelectVariant";

const ProductSelector = (props: { data: Record<any, any> }) => {

    const {title, type, description, Image, short_dedcription, cards, gallery} = props.data;


    return <ProductSelectVariant/>
};
export default ProductSelector