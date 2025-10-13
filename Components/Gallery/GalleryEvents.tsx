'use client'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import {Carousel} from "@mantine/carousel";
import styles from "./Gallery.module.css";
import CardEvent, {CardEventProps} from "@/Components/Cards/CardEvent";

const GalleryEvents = ({cards}: {cards: CardEventProps[]}) => {
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
        {cards.map((img) => <Carousel.Slide key={img.url}>
            <CardEvent {...img}/>
        </Carousel.Slide>)}
    </Carousel>
}
export default GalleryEvents