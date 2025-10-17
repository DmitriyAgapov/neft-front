'use client'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import {Carousel} from "@mantine/carousel";
import {ImageCustoms} from "@/Components/ImageCustom";
import styles from "./Gallery.module.css";

const Gallery = ({images, ...props}: {images: {
    url: string,
    width: number,
    height: number,
    }[]} & Record<string, unknown>) => {
    return <Carousel
        withIndicators
        height={300}
        emblaOptions={{
            loop: true,
            dragFree: false,
            align: 'start'
        }}
        slideSize={{ base: 300 }}
        slideGap="md"
        {...props}
        classNames={{
            root: styles.gallery,
            indicators: styles.indicators,
            indicator: styles.indicator,
            viewport: "overflow-x-visible"
        }}

    >
        {images.map((img) => <Carousel.Slide key={img.url}><div  className={styles.card}><ImageCustoms src={img.url} height={img.height} width={img.width}/></div></Carousel.Slide>)}
    </Carousel>
}
export default Gallery