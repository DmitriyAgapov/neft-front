import {queryWrapper} from "@/utils/queryWrapper";
import styles from "./style.module.css";
import styless from "@/Components/ProductSelector/ProductSelector.module.css";
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import {Button, Title} from "@mantine/core";
import ProductRoot from "@/Components/ProductVariantStore/ProductRoot";
import {ImageCustoms} from "@/Components/ImageCustom";
import Section from "@/Components/Section/Section";
import Breadcrumbs from "@/Components/Breadcrumbs/Breadcrumbs";
import {pageTools} from "@/utils/gql/pageTools";
import TabsProductTools from "@/Components/TabsProduct/TabsProductTools";
import type { Metadata, ResolvingMetadata } from "next";
import { categoryByCategory, config } from "@/utils/gql/config";
import { notFound } from "next/navigation";

type Props = {
	params: Promise<{ category: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export async function generateMetadata(): Promise<Metadata> {
	const {category} = await queryWrapper(pageTools);
	console.log(category)
	const data = await queryWrapper(config);

	const page = category;
	if (!page) return  notFound()
	return {
		title: data.konfiguracziyaSajta.website_name + ` - ${page.seo?.metaTitle ?? page.title}` ,
		description: page.seo?.metaDescription ?? "",
		keywords: page.seo?.keywords  ?? "",
	}
}
export default async function Page() {
    const {category} = await queryWrapper(pageTools);
    if (!category) return
    const {title, description,child_categories, image, short_dedcription, category:type, cards, gallery} = category;

    return <>
        <Breadcrumbs/>
        <section className={styles.section} data-content={`section-${type}`}>
            <div  data-type={`section-${type}-intro`}>
                <div data-content={"section_title"} className={"mb-8 relative z-1"}>

                    <h1>
                        {title}

                    </h1>
                    <div data-content={"section_description"} className={'mt-8 max-w-[30rem]'}>
                        <BlockRendererClient content={short_dedcription}/>
                    </div>
                </div>


                <div data-content={'section_link'} className={'md:max-w-[20rem]'}>
                    <Button fullWidth variant={"primary"} href={'/form'} size={"xl"} component={"a"}>Оставить
                        заявку</Button>
                </div>
            </div>

            <ProductRoot>
                <div className={styless.ProductSelector} data-type={`product-${type}`}>
                    <div className={styless.wrapper} data-content={`wrapper-${type}`}>
                        <ImageCustoms width={image.width} height={image.height} src={image.url}/>
                    </div>
                </div>
            </ProductRoot>

            {/*<TabsProductControls data={products[0]}/>*/}

        </section>
        <section className={styles.section + " bg-gray-100 md:!p-8 !p-4 rounded-2xl"} data-content={`section-komplekt`}>
            <div data-content={"section_title relative"}>
                <h3>Что входит в комплект/сборку?</h3>
            </div>
            <div data-content={"section_cards"} className={'mt-4  md:grid flex lg:grid-cols-4 md:grid-cols-2 gap-4 max-md:overflow-x-scroll max-md:cursor-grab'}>
                {child_categories ? child_categories.map((item: any) => <div
                    key={item?.category} className={'flex w-full h-80 flex-col flex-wrap card_child_category aspect-square bg-white rounded-xl px-6 pt-8 pb-4 relative'}>
                    <div className={'card_child_category_title relative z-10'}>
                        <h4 className={'my-0'}>{item.title}</h4>
                    </div>
                    <div className={'card_child_category_image absolute top-4 left-4  bottom-4 right-4 '}>
                        <ImageCustoms width={item.image.width} height={item.image.height} src={item.image.url}/>
                    </div>
                    <div className={'card_child_category_link relative z-10 mt-auto'}>
                        <Button  variant={"glass"} href={`/product/${type}/${item?.category}`} size={"md"} component={"a"}>Смотреть все</Button>
                    </div>
                </div>) : null}
            </div>
        </section>
        <section className={styles.section + " "} data-content={`section-tabs`}>
            <TabsProductTools data={child_categories}/>
        </section>
        <section className={styles.section + " bg-gray-100 !p-8 rounded-2xl"} data-content={`section-description`}>
            <div data-content={"section_description relative"}>
            <BlockRendererClient
                content={description}
            />
            </div>
        </section>

        <Section title={'Оставьте заявку '} type={"form"} link={{title: "#", url: "form"}} description={[{
            type: "paragraph",
            "children": [
                {
                    "type": "text",
                    "text": "Наш специалист свяжется с вами!"
                }
            ]
        }]}/>
    </>

}
