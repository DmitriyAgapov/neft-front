'use client'
import styles from "./CardScreen.module.css";
import {Progress, Text, Title} from "@mantine/core";
import {useInterval} from "@mantine/hooks";
import {useState, useEffect, useMemo} from 'react';
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import Image from "next/image";
import {ImageCustoms} from "@/Components/ImageCustom";
import ScreenCardProgress from "@/Components/Cards/ScreenCardProgress";

const ScreenCard = ({items}: { items: Record<string, unknown | any | undefined>[] }) => {

    const [itemIndex, setItemIndex] = useState(0);


    if (!(!!items)) return;
    return useMemo(() => {
        return <div className={styles.screen_cards + " animate-scaley"} style={{
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
                            <h4 style={{display: "inline-block", marginLeft: '1rem', color: "white"}}>
                                {card.title}
                            </h4>
                        </header>
                        <div style={{
                            overflow: 'hidden',
                            transition: 'max-height 0.5s ease-in-out',
                            maxHeight: itemIndex === index ? "300px" : 0,
                            marginTop: itemIndex === index ? "1rem" : 0,
                        }}>
                            <BlockRendererClient content={card.description}/>
                            <ScreenCardProgress setItemIndexTop={setItemIndex} itemIndex={itemIndex}/>

                        </div>
                    </div>
                )}</div>
            </div>
        }, [itemIndex,  items])

}

export default ScreenCard