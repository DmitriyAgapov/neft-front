import Image, {StaticImageData} from "next/image";

const ImageCustoms = (props:StaticImageData) => {
    return <Image alt={''} src={`${process.env.NEXT_BACK}`+props.src} width={props.width} height={props.height} />
}

export default ImageCustoms