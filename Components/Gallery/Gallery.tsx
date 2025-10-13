'use client'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import {Carousel} from "@mantine/carousel";
import {ImageCustoms} from "@/Components/ImageCustom";
import styles from "./Gallery.module.css";

const Gallery = ({images}: {images: {
    url: string,
    width: number,
    height: number,
    }[]}) => {
    return <Carousel
        withIndicators
        height={300}
        emblaOptions={{
            loop: true,
            dragFree: false,
            align: 'start'
        }}
        slideGap="md"
        classNames={{
            root: styles.gallery,
            indicators: styles.indicators,
            indicator: styles.indicator
        }}
        slideSize={{ base: 300 }}
    >
        {images.map((img) => <Carousel.Slide key={img.url}><div  className={styles.card}><ImageCustoms src={img.url} height={img.height} width={img.width}/></div></Carousel.Slide>)}
    </Carousel>
}
export default Gallery