'use client'
// @ts-ignore
import ThreeSixty from "react-360-view";
import React from "react";
import styles from "./ImageRotate.module.css";
import {PauseIcon, PlayIcon} from "@/Components/Icons/Icons";

const basePath = process.env.NODE_ENV !== "development" ? process.env.NEXT_PUBLIC_IMG_PROD + `/hydro/press/` : "http://localhost:3000/hydro/press/";
export default function ImageRotate({images}: {images: any[]}) {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const ref = React.useRef(null);
    const handlePlay = () => {
        setIsPlaying(prev => !prev)
        // @ts-ignore
        ref.current?.togglePlay()
    }
    return (
        <div className={styles.root}>
            <div className={styles.control}>
                <a onClick={() => handlePlay()}>{!isPlaying ? <PlayIcon/> : <PauseIcon/>}</a>
            </div>
            <ThreeSixty
                ref={ref}
                amount={180}
                imagePath={basePath}
                fileName="file_{index}.jpg"
                spinReverse
                button={null}
            />
        </div>
    );
}
