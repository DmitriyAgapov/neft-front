import {queryWrapper} from "@/utils/queryWrapper";
import {categoryByCategory, productBySlug} from "@/utils/gql/config";
import styles from "../style.module.css";
import styless from "@/Components/ProductSelector/ProductSelector.module.css";
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import {Button, Title} from "@mantine/core";
import ProductRoot from "@/Components/ProductVariantStore/ProductRoot";
import ProductSelector from "@/Components/ProductSelector/ProductSelector";
import {ImageCustoms} from "@/Components/ImageCustom";
import ProductSelectVariant from "@/Components/ProductVariants/ProductSelectVariant";
import {TabsProduct} from "@/Components/TabsProduct";
import {ProductVariantsBlock} from "@/Components/ProductVariantStore/ProductVariantStore";
import ProductImage from "@/Components/ProductVariants/ProductImage";
import Section from "@/Components/Section/Section";
import TabsProductControls from "@/Components/TabsProduct/TabsProductControls";
import Breadcrumbs from "@/Components/Breadcrumbs/Breadcrumbs";
import type {Metadata, ResolvingMetadata} from "next";
import {config} from "@/utils/gql/config";
import {notFound} from "next/navigation";
import CardTool from "@/Components/Cards/CardTool";

type Props = {
    params: Promise<{ category: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const category = (await params).category

    const {categories} = await queryWrapper(categoryByCategory, {
        "category": category

    });
    const data = await queryWrapper(config);

    const page = categories[0];
    if (!page) return  notFound()
    return {
        title: data.konfiguracziyaSajta.website_name + ` - ${page.seo?.metaTitle ?? page.title}` ,
        description: page.seo?.metaDescription ?? "",
        keywords: page.seo?.keywords  ?? "",
    }
}
export default async function Page({params}: { params: Promise<{ category: string }> }) {
    const {category} = await params;

    const {categories} = await queryWrapper(categoryByCategory, {
       "category": category
    });

    if (!categories) return
    const {title,  description, image,image_full, short_dedcription, product_hydraulics, gallery} = categories[0];
    const type = "hydraulic-tools"
	const _img = image_full ?? image;
	const imgProps = {
		width:_img.width,
		height: _img.height,
		src:_img.url
	}
    return <>
        <Breadcrumbs/>
        <section className={styles.section} data-content={`section-${type}`}>
            <div className={'col-1 col-span-5 self-start'} data-type={`section-${type}-intro`}>
                <div data-content={"section_title"} className={"mb-8 relative z-1"}>

                    <h1 style={{
                            fontSize: `var(--mantine-h2-font-size)`, lineHeight: `var(--mantine-h2-line-height)`
                    }}>
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
                        <ImageCustoms {...imgProps}/>
                    </div>
                </div>
            </ProductRoot>

            {/*<TabsProductControls data={products[0]}/>*/}

        </section>
        <section className={styles.section + " "} data-content={`section-tabs`}>
            {product_hydraulics && product_hydraulics.length ? <div className={" bg-gray-50 lg:p-8 col-span-full p-4 rounded-2xl m_b0c91715 mantine-Tabs-panel grid gap-4"}>{ product_hydraulics.map((item:any) =>
                <CardTool  key={item.hydraulic_slug} item={item}/>
			)}</div> : null}
        </section>
		{description ? <section className={styles.section + " bg-gray-100 !p-8 rounded-2xl"} data-content={`section-description`}>
            <div data-content={"section_description relative"}>
                <BlockRendererClient
                    content={description}
                />
            </div>
        </section>: null}

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
