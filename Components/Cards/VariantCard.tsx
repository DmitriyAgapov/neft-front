'use client'
import Image from "next/image";
import {Button, Title} from "@mantine/core";
import styles from "./VariantCard.module.css"
import {ChevronRight} from "@/Components/Icons/Icons";
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import {useState} from "react";
import {ImageCustoms} from "@/Components/ImageCustom";

const VariantCard = (props: any) => {
    const [open, setOpen] = useState(false);

    return (
        <div data-content={"variant_card"} className={styles.card} data-specs-open={open}>
            <div className={styles.card_link} data-type={'card_link_back'}>
                <Button onClick={() => {
                    setOpen(false)
                    props.setSelected(null);
                }} leftSection={<ChevronRight className={'rotate-180'}/>} className={"bg-"} variant={"transparent"} >Назад к выбору</Button>
            </div>

            <div className={styles.image} data-type={'image'}>
                {props.image ? <ImageCustoms src={props.image.src} width={40} height={40}/> : null}
            </div>

            <div className={styles.card_title}  data-type={'card_title'}>
                <Title order={6} className={'uppercase'}>{props.title}</Title>
            </div>

            <div className={styles.card_link} data-type={'card_link'}>
                <Button leftSection={<ChevronRight/>} className={"bg-"} variant={"transparent"} onClick={() => {
                    setOpen(true)
                    props.setSelected(props.slug)
                }}>Смотреть характеристики</Button>
            </div>

            {props.specs && props.specs.length > 0 ? <div  data-type={'card_specs'} className={styles.specs}>
                <BlockRendererClient
                    content={props.specs}
                />
            </div> : null}
        </div>
    )
}

export default VariantCard