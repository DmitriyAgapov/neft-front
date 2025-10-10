'use client'
import { useState } from 'react';
import { FloatingIndicator, Tabs } from '@mantine/core';
import classes from './TabsProduct.module.css';
import styles from "@/Components/Cards/VariantCard.module.css";
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import CardFeature from "@/Components/Cards/CardFeature";

function TabsProduct({data : _data}: {data: any}) {
    const {documentId, ...data} = _data;
    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [value, setValue] = useState<string | null>('description');
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
                <Tabs.Tab value="description" ref={setControlRef('2')} className={classes.tab}>
                    Описание
                </Tabs.Tab>
                <Tabs.Tab value="feature" ref={setControlRef('2')} className={classes.tab}>
                    Доступные опции
                </Tabs.Tab>
                <Tabs.Tab value="docs" ref={setControlRef('3')} className={classes.tab}>
                    Документы и сертификаты
                </Tabs.Tab>

                <FloatingIndicator
                    target={value ? controlsRefs[value] : null}
                    parent={rootRef}
                    className={classes.indicator}
                />
            </Tabs.List>

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
            <Tabs.Panel value="feature">
                <div className={"grid md:grid-cols-2 xl:grid-cols-4 gap-4"}>
                    {data.Feature.map((el:any) => <CardFeature key={el.id} {...el} />)}
                </div>
            </Tabs.Panel>

            <Tabs.Panel value="docs">
                {data.Document.map((el:any) => <p key={el.id}><a href={process.env.NEXT_PUBLIC_NEXT_BACK + el.attachment.url}>{el.title}</a></p>)}
            </Tabs.Panel>
        </Tabs>
    );
}
export default TabsProduct