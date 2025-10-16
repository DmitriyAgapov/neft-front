import Image, {StaticImageData} from "next/image";

const ImageCustoms = (props:StaticImageData & {
    fill?: boolean;
    className?: string;
    style?: any;
}) => {
    const urlResult = (() => {
        if (!props.src.includes('http')) {
            return process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_NEXT_BACK_IMG_DEV + props.src : process.env.NEXT_PUBLIC_NEXT_BACK_IMG + props.src;
        } else {
            return  props.src
        }

    })()

    return <Image alt={''} src={urlResult} width={!props.fill ? props.width : undefined} height={!props.fill ? props.height : undefined} fill={props.fill} className={props.className} style={props.style}/>
}

export default ImageCustoms