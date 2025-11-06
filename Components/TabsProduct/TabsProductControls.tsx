'use client'
import { useState } from 'react';
import { FloatingIndicator, Tabs } from '@mantine/core';
import classes from './TabsProduct.module.css';
import styles from "@/Components/Cards/VariantCard.module.css";
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import CardFeature from "@/Components/Cards/CardFeature";
import {ImageCustoms} from "@/Components/ImageCustom";

function TabsProductControls({data : _data}: {data: any}) {
    const {documentId, ...data} = _data;
    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [value, setValue] = useState<string | null>('description');
    const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});

    const setControlRef = (val: string) => (node: HTMLButtonElement) => {
        controlsRefs[val] = node;
        setControlsRefs(controlsRefs);
    };
	console.log(_data.schema)
    return (
        <Tabs variant="none" value={value} onChange={setValue} classNames={{
            root: 'col-span-full mt-16',
            panel: ' bg-gray-50 p-8 rounded-2xl overflow-hidden',
            list: 'max-[64em]:!pl-0 max-[64em]:!ml-0  max-[64em]:!mr-0 !flex-nowrap overflow-x-auto'
        }}>
            <Tabs.List ref={setRootRef} className={classes.list}>
                <Tabs.Tab value="description" ref={setControlRef('1')} className={classes.tab}>
                    Описание
                </Tabs.Tab>
                <Tabs.Tab value="specs" ref={setControlRef('2')} className={classes.tab}>
                    Технические характеристики
                </Tabs.Tab>
                <Tabs.Tab value="schema" ref={setControlRef('3')} className={classes.tab}>
                    Схема
                </Tabs.Tab>

                <Tabs.Tab value="docs" ref={setControlRef('4')} className={classes.tab}>
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
            <Tabs.Panel value="specs">
                <div className={"grid md:grid-cols-2 xl:grid-cols-2 gap-x-4"}>
                    {data.spec_item.map((el:any) => <div key={el.id}  className={styles.specs_item}>
                        <div data-card={'title'}>
                            <BlockRendererClient
                            content={el.title}
                        /></div>
                        <div data-card={'description'}>  <BlockRendererClient
                            content={el.description}
                        /></div>
                    </div>)}
                </div>
            </Tabs.Panel>
            {_data.schema ? <Tabs.Panel value="schema">
                <div className={"grid md:grid-cols-2 xl:grid-cols-2 gap-x-4"}>
                        <div data-type={"schema-description"} className={"col-start-1 col-end-2 row-start-1 row-end-2 max-w-[24rem]"} style={{
							position: 'relative',
							zIndex: 2
						}}>
                            <BlockRendererClient
                            content={_data.schema.description}
                        /></div>
                        <div style={{
							margin: '-2rem',
							width: 'calc(100% + 4rem)'
						}} data-type={'schema-image'} className={"flex justify-end col-start-1 col-end-3 row-start-1 row-end-2 -mb-8"}>
							{_data.schema.image.mime ==="video/mp4" ? <video width={"100%"} height={"100%"} style={{
									marginBottom: '-1px',
								width: '100%',
								}}  loop autoPlay={true} muted  src={process.env.NEXT_PUBLIC_NEXT_BACK_IMG as string + _data.schema.image.url}/>
								:

								<ImageCustoms
                                src={_data.schema.image.url}
                                width={_data.schema.image.width ?? 640}
                                height={_data.schema.image.height ?? 480}

                        />
							}
							</div>
                </div>

            </Tabs.Panel> : _data.schema}

            {data.Document ? <Tabs.Panel value="docs">
                {data.Document.map((el:any) => <p key={el.id}><a href={process.env.NEXT_PUBLIC_NEXT_BACK + el.attachment.url}>{el.title}</a></p>)}
            </Tabs.Panel> : null}
        </Tabs>
    );
}
export default TabsProductControls
