'use client'
// @ts-ignore
import ThreeSixty from "react-360-view";
import React from "react";
import styles from "./ImageRotate.module.css";
import {PauseIcon, PlayIcon} from "@/Components/Icons/Icons";
const urls = {
    "press-krab-nh-67-04-000-100ts" : `/hydro/press/`,
    "press-krab-nh-41-09-000-50ts" : `/hydro/press1/`,
    "press-krab-nh-41-06-000-36ts" : `/hydro/press2/`,
    "nasosnaya-stancziya-nh-67-12-000" : `/hydro/nasos-station/`,
    "nasosnaya-stancziya-nh-67-17-000-01" : `/hydro/nasos-station2/`,
}
const basePath = process.env.NODE_ENV !== "development" ? process.env.NEXT_PUBLIC_IMG_PROD  : "http://localhost:3000/";
export default function ImageRotate(props:{slug?: string | undefined;}) {
    console.log(props.slug)
    // @ts-ignore
    if (!props.slug || !urls[props.slug as any]) return;

    const [isPlaying, setIsPlaying] = React.useState(false);
    const ref = React.useRef(null);
    const handlePlay = () => {
        setIsPlaying(prev => !prev)
        // @ts-ignore
        ref.current?.togglePlay()
    }
    console.log(ref.current)
    console.log(props.slug)
    return (
        <div className={styles.root}>
            <div className={styles.control}>
                <a onClick={() => handlePlay()}>{!isPlaying ? <PlayIcon/> : <PauseIcon/>}</a>
            </div>
            <ThreeSixty
                ref={ref}
                amount={180}
                // @ts-ignore
                imagePath={basePath+urls[props.slug]}
                fileName="file_{index}.jpg"
                spinReverse
                button={null}
            />
        </div>
    );
}
