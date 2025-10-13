'use client'
import { useState } from 'react';
import {Button, FloatingIndicator, Tabs, Title} from '@mantine/core';
import classes from './TabsProduct.module.css';
import styles from "@/Components/Cards/VariantCard.module.css";
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import CardFeature from "@/Components/Cards/CardFeature";
import {ImageCustoms} from "@/Components/ImageCustom";
import {LinkForm} from "@/Components/Icons/Icons";
import {usePathname} from "next/navigation";

function TabsProductTools({data : _data}: {data: any}) {
    const pathname = usePathname()
    const {documentId, ...data} = _data;
    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [value, setValue] = useState<string | null>(_data[0].category || undefined);
    const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});

    const setControlRef = (val: string) => (node: HTMLButtonElement) => {
        controlsRefs[val] = node;
        setControlsRefs(controlsRefs);
    };
    return (
        <Tabs variant="none" value={value} onChange={setValue} classNames={{
            root: 'col-span-full',
            panel: ' bg-gray-50 p-8 rounded-2xl'
        }}>
            <Tabs.List ref={setRootRef} className={classes.list}>
                {_data.map((el:any, index:number) =>  <Tabs.Tab  key={el.category} value={el.category} ref={setControlRef(index.toString())} className={classes.tab}>
                    {el.title}
                </Tabs.Tab>)}


                <FloatingIndicator
                    target={value ? controlsRefs[value] : null}
                    parent={rootRef}
                    className={classes.indicator}
                />
            </Tabs.List>
            {_data.map((el:any, index:number) =>    <Tabs.Panel value={el.category} key={el.category+"_panel"} className={'grid gap-4'}>
                {el.product_hydraulics && el.product_hydraulics.length ? el.product_hydraulics.map((item:any) =>
                    <div key={item.hydraulic_slug} data-type={'card_product_hydraulic'} className={'grid grid-cols-[8rem_1fr] gap-4 p-6 bg-white rounded-xl'}>
                        <div className={''}>
                            <ImageCustoms src={item.image.url} width={item.image.width} height={item.image.height} />
                        </div>
                        <div className={'flex flex-col gap-4'}>
                            <Title order={5} className={"!text-[var(--mantine-color-blue-light-color)]"}>{item.title}</Title>
                            <BlockRendererClient
                                content={item.short_dedcription}
                            />
                            <div className={'flex gap-4 mt-5'}>
                                <Button  variant={"primary"} href={`/form`} size={"sm"} component={"a"} >Оставить заявку</Button>
                                <Button  variant={"icon"} href={pathname + `/${item.hydraulic_slug}`} size={"sm"} component={"a"} rightSection={<LinkForm className={'w-4 h-4'}/>}>Подробнее</Button>
                            </div>
                        </div>
                    </div>)
                 : null}
                {data.description ? <div  data-type={'card_specs'} className={styles.specs}>
                    <BlockRendererClient
                        content={data.description}
                    />
                </div> : null}

            </Tabs.Panel>)}
            <Tabs.Panel value="description">
                {data.short_dedcription ? <div  data-type={'card_specs'} className={styles.specs}>
                    <BlockRendererClient
                        content={data.short_dedcription}
                    />
                </div> : null}
               {data.description ? <div  data-type={'card_specs'} className={styles.specs}>
                    <BlockRendererClient
                        content={data.description}
                    />
                </div> : null}

            </Tabs.Panel>
        </Tabs>
    );
}
export default TabsProductTools