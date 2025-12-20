'use client'
import { useState } from 'react';
import { Button, FloatingIndicator, Tabs } from '@mantine/core';
import classes from './TabsProduct.module.css';
import styles from "@/Components/Cards/VariantCard.module.css";
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import CardFeature from "@/Components/Cards/CardFeature";
import { ImageCustoms } from "@/Components/ImageCustom";

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
            panel: ' bg-gray-50 p-8 rounded-2xl',
            list: 'max-[64em]:!pl-0 max-[64em]:!ml-0  max-[64em]:!mr-0 !flex-nowrap overflow-x-auto'
        }}>
            <Tabs.List ref={setRootRef} className={classes.list}>
                <Tabs.Tab value="description" ref={setControlRef('1')} className={classes.tab}>
                    Описание
                </Tabs.Tab>
                <Tabs.Tab value="feature" ref={setControlRef('2')} className={classes.tab}>
                    Доступные опции
                </Tabs.Tab>
				{_data.schema || (_data.gallery && _data.gallery.length > 0) ? <Tabs.Tab value="schema" ref={setControlRef('3')} className={classes.tab}>
                   Схема
                </Tabs.Tab> : null}

				{data.dokumenties && data.dokumenties.length > 0 ? <Tabs.Tab value="docs" ref={setControlRef('4')} className={classes.tab}>
                    Документы и сертификаты
                </Tabs.Tab> : null}

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
			{_data.schema && _data.schema.image ? <Tabs.Panel value="schema">
				<div className={"grid md:grid-cols-2 xl:grid-cols-2 gap-x-4"}>
					<div data-type={"schema-description"} className={"col-start-1 col-end-2 row-start-1 row-end-2 max-w-[24rem]"} style={{
						position: 'relative',
						zIndex: 2
					}}>
						<BlockRendererClient
							content={_data.schema.description}
						/>
					</div>
					<div style={{
						margin: '-2rem',
						width: 'calc(100% + 4rem)'
					}} data-type={'schema-image'} className={`flex justify-end col-start-1 col-end-3 row-start-1 row-end-2 -mb-8`}>
						{_data.schema.image && _data.schema.image?.mime ==="video/mp4" ? <video width={"100%"} height={"100%"} style={{
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

			</Tabs.Panel> : null}
			{_data.gallery && _data.gallery.length > 0 ? <Tabs.Panel value="schema" component={"section"}  className={styles.section + " bg-gray-100 md:!p-8 !p-4 rounded-2xl"} data-content={`section-komplekt`}>
				{/*<div className={"grid md:grid-cols-2 xl:grid-cols-2 gap-x-4"}>*/}


						<div data-content={"section_cards"} className={'grid flex xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 max-md:overflow-x-scroll max-md:cursor-grab'}>
							{_data.gallery.map((item: any) => <div
								key={item?.documentId} className={'flex w-full h-96 flex-col flex-wrap card_child_category aspect-square bg-white rounded-xl relative'}>

								<div className={'card_child_category_image flex-1'}>
									<ImageCustoms width={item.width} height={item.height} src={item.url} className={'w-full h-full object-cover rounded-xl'}/>
								</div>
							</div>)}
						</div>
					{/*<div data-type={"schema-description"} className={"col-start-1 col-end-2 row-start-1 row-end-2 max-w-[24rem]"} style={{*/}
					{/*	position: 'relative',*/}
					{/*	zIndex: 2*/}
					{/*}}>*/}
					{/*	<BlockRendererClient*/}
					{/*		content={_data.schema.description}*/}
					{/*	/>*/}
					{/*</div>*/}
					{/*<div style={{*/}
					{/*	margin: '-2rem',*/}
					{/*	width: 'calc(100% + 4rem)'*/}
					{/*}} data-type={'schema-image'} className={`flex justify-end col-start-1 col-end-3 row-start-1 row-end-2 -mb-8`}>*/}
					{/*	{_data.schema.image.mime ==="video/mp4" ? <video width={"100%"} height={"100%"} style={{*/}
					{/*			marginBottom: '-1px',*/}
					{/*			width: '100%',*/}
					{/*		}}  loop autoPlay={true} muted  src={process.env.NEXT_PUBLIC_NEXT_BACK_IMG as string + _data.schema.image.url}/>*/}
					{/*		:*/}

					{/*		<ImageCustoms*/}
					{/*			src={_data.schema.image.url}*/}
					{/*			width={_data.schema.image.width ?? 640}*/}
					{/*			height={_data.schema.image.height ?? 480}*/}

					{/*		/>*/}
					{/*	}*/}
					{/*</div>*/}
				{/*</div>*/}

			</Tabs.Panel> : _data.schema}

			{data.dokumenties && data.dokumenties.length > 0 ? <Tabs.Panel value="docs">
				<ul>{data.dokumenties.map((el:any) => <li key={el.documentId}><a href={process.env.NEXT_PUBLIC_NEXT_BACK + el.file.url}>{el.title}</a></li>)}</ul>
            </Tabs.Panel> : null}
        </Tabs>
    );
}
export default TabsProduct
