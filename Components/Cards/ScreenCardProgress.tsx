'use client'
import styles from "./CardScreen.module.css";
import {Progress, Text, Title} from "@mantine/core";
import {useInterval} from "@mantine/hooks";
import {useState, useEffect, useMemo} from 'react';
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import Image from "next/image";
import {ImageCustoms} from "@/Components/ImageCustom";

const ScreenCardProgress = ({setItemIndexTop, itemIndex}:{setItemIndexTop: (value:any) => void, itemIndex: number}) => {
    const maxSeconds = 10;
    const [seconds, setSeconds] = useState(0);
    const interval = useInterval(() => setSeconds((s) => s + 1), 1000);
    useEffect(() => {
        interval.start();
        return interval.stop;
    }, []);

    useEffect(() => {
        if (seconds === maxSeconds) {
            setItemIndexTop(() => itemIndex !== 2 ? itemIndex + 1 : 0)
            setSeconds(0);
        }
    }, [seconds, itemIndex]);

    return <Progress transitionDuration={900} size={2} color={'white'} bg={'blue.3'} mt={16}
                     value={seconds * 10}/>

}

export default ScreenCardProgress