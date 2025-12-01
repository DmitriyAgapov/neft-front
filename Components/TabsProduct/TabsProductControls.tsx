'use client'
import { useState } from 'react';
import { FloatingIndicator, Tabs } from '@mantine/core';
import classes from './TabsProduct.module.css';
import styles from "@/Components/Cards/VariantCard.module.css";
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import CardFeature from "@/Components/Cards/CardFeature";
import {ImageCustoms} from "@/Components/ImageCustom";
import { useParams, usePathname } from "next/navigation";
import CardTool from "@/Components/Cards/CardTool";

function TabsProductControls({data : _data}: {data: any}) {
    const {documentId, ...data} = _data;
    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [value, setValue] = useState<string | null>('description');
    const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
	const location = usePathname();
	const params = useParams();
	console.log(data)
    const setControlRef = (val: string) => (node: HTMLButtonElement) => {
        controlsRefs[val] = node;
        setControlsRefs(controlsRefs);
    };
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
				{data.spec_item && data.spec_item.length > 0 ? <Tabs.Tab value="specs" ref={setControlRef('2')} className={classes.tab}>
                    Технические характеристики
                </Tabs.Tab> : null}
				{_data.produkty_instrumenties && _data.produkty_instrumenties.length > 0 || _data.schema ? <Tabs.Tab value="schema" ref={setControlRef('3')} className={classes.tab}>
					{location.includes('/hydraulic-tools') ? 'Комплектация' : 'Схема'}
                </Tabs.Tab> : null}

				{data.Document && data.Document.length > 0 ? <Tabs.Tab value="docs" ref={setControlRef('4')} className={classes.tab}>
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
				{data.specs ? <div  data-type={'card_specs'} className={styles.specs}>
                    <BlockRendererClient
                        content={data.specs}
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
			{data.produkty_instrumenties ? <Tabs.Panel value={'schema'} className={'grid gap-4'}>
				{data.produkty_instrumenties && data.produkty_instrumenties.length ? data.produkty_instrumenties.map((item:any) =>
							<CardTool  key={item.hydraulic_slug} item={item}/>
						// <div key={item.hydraulic_slug} data-type={'card_product_hydraulic'} className={'md:grid grid-cols-[8rem_1fr] gap-4 p-6 bg-white rounded-xl'}>
						//     {item.image ? <div className={''}>
						//         <ImageCustoms src={item.image.url} width={item.image.width} height={item.image.height} />
						//     </div> : null}
						//     <div className={'flex flex-col gap-4 mt-4 md:mt-0'}>
						//         <Title order={4} className={"!text-[var(--mantine-color-blue-light-color)]"}>{item.title}</Title>
						//         <BlockRendererClient
						//             content={item.short_dedcription}
						//         />
						//         <div className={'md:flex gap-4 mt-5'}>
						//             <Button className={"max-md:!block"} variant={"primary"} href={`/form`} mb={16} size={"sm"} component={"a"} >Оставить заявку</Button>
						//             <Button className={"max-md:!block"} variant={"icon"} href={pathname + `/${item.hydraulic_slug}`} size={"sm"} component={"a"} rightSection={<LinkForm className={'w-4 h-4'}/>}>Подробнее</Button>
						//         </div>
						//     </div>
						// </div>
					)
					: null}
				{data.description ? <div  data-type={'card_specs'} className={styles.specs}>
					<BlockRendererClient
						content={data.description}
					/>
				</div> : null}

			</Tabs.Panel> : null}
            {_data.schema ? <Tabs.Panel value="schema">
                <div className={"grid md:grid-cols-2 xl:grid-cols-2 gap-x-4"}>
                        <div data-type={"schema-description"} className={"col-start-1 col-end-2 row-start-1 row-end-2 max-w-[24rem]"} style={{
							position: 'relative',
							zIndex: 2
						}}>
                            <BlockRendererClient
                            content={_data.schema.description}
                        />
						</div>
                        <div style={params.slug === "signalizator-sdviga-czistern" ? {
							margin: '-2rem',
							width: 'calc(100% + 4rem)'
						}:{}} data-type={'schema-image'} className={`flex justify-end col-start-1 col-end-3 row-start-1 row-end-2 ${params.slug === "signalizator-sdviga-czistern" ? "-mb-8" : ""}`}>
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

            {data.Document && data.Document.length > 0 ? <Tabs.Panel value="docs">
                {data.Document.map((el:any) => <p key={el.id}><a href={process.env.NEXT_PUBLIC_NEXT_BACK + el.attachment.url}>{el.title}</a></p>)}
            </Tabs.Panel> : null}
        </Tabs>
    );
}
export default TabsProductControls
