'use client'
import styles from "./CardScreen.module.css";
import {Progress, Text, Title} from "@mantine/core";
import {useInterval} from "@mantine/hooks";
import {useState, useEffect} from 'react';
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import Image from "next/image";
import {ImageCustoms} from "@/Components/ImageCustom";

const ScreenCard = ({items}: { items: Record<string, unknown | any | undefined>[] }) => {
    const maxSeconds = 10;
    const [itemIndex, setItemIndex] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const interval = useInterval(() => setSeconds((s) => s + 1), 1000);

    useEffect(() => {
        interval.start();
        return interval.stop;
    }, []);

    useEffect(() => {
        if (seconds === maxSeconds) {
            setItemIndex(prevState => prevState !== 2 ? prevState + 1 : 0)
            setSeconds(0);
        }
    }, [seconds]);


    if (!(!!items)) return;
    return (<div className={styles.screen_cards + " animate-scaley"} style={{
            minHeight: items[itemIndex].image[0].height + 32 + 'px'
        }}>
            <ImageCustoms fill={true} className={styles.bgimg} style={{maxWidth: 'none'}}
                   src={`${items[itemIndex].image[0].url}`}

                // width={items[itemIndex].image[0].width}
                // height={items[itemIndex].image[0].height}
            />

            <div className={styles.items}>{items.map((card, index) =>
                <div key={card.id} data-active={itemIndex === index} className={styles.card}>
                    <header>
                        <Text component={"span"} style={{fontWeight: 600}} c={"blue.3"}>0{index + 1}</Text>
                        <Title c={"white"} order={5} style={{display: "inline-block", marginLeft: '1rem'}}>
                            {card.title}
                        </Title>
                    </header>
                    <div style={{
                        overflow: 'hidden',
                        transition: 'max-height 0.5s ease-in-out',
                        maxHeight: itemIndex === index ? "300px" : 0,
                        marginTop: itemIndex === index ? "1rem" : 0,
                    }}>
                        <BlockRendererClient content={card.description}/>
                        <Progress transitionDuration={900} size={2} color={'white'} bg={'blue.3'} mt={16}
                                  value={seconds * 10}/>
                    </div>
                </div>
            )}</div>
        </div>
    )
}

export default ScreenCard