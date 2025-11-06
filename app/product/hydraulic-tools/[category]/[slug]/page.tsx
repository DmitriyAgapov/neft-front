import {queryWrapper} from "@/utils/queryWrapper";
import { categoryByCategory, config, hydraulicProductBySlug } from "@/utils/gql/config";
import styles from "./style.module.css";
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import {Button, Title} from "@mantine/core";
import ProductRoot from "@/Components/ProductVariantStore/ProductRoot";
import {ImageCustoms} from "@/Components/ImageCustom";
import Section from "@/Components/Section/Section";
import TabsProductControls from "@/Components/TabsProduct/TabsProductControls";
import Breadcrumbs from "@/Components/Breadcrumbs/Breadcrumbs";
import ImageRotate from "@/Components/ImageRotate/ImageRotate";
import { urls } from "@/utils/constants";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

type Props = {
	params: Promise<{ slug: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const slug = (await params).slug

	const {productHydraulics} = await queryWrapper(hydraulicProductBySlug, {
		"slug": slug
	});
	const data = await queryWrapper(config);

	const page = productHydraulics[0];
	if (!page) return  notFound()
	return {
		title: data.konfiguracziyaSajta.website_name + ` - ${page.seo?.metaTitle ?? page.title}` ,
		description: page.seo?.metaDescription ?? "",
		keywords: page.seo?.keywords  ?? "",
	}
}
export default async function Page({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;

    const {productHydraulics} = await queryWrapper(hydraulicProductBySlug, {
        "slug": slug
    });

    if (!productHydraulics[0]) return
    const {title, description, image, short_dedcription, cards, gallery} = productHydraulics[0];
	console.log(productHydraulics[0])
	const hasRotate = urls.hasOwnProperty(slug);
	console.log(hasRotate, slug, urls)
    return <>
        <Breadcrumbs/>
        <section className={styles.section} data-content={`section-hydraulic-product`}>
            <div className={'col-1 xl:col-span-6 col-span-4 self-start'} data-type={`section-hydraulic-product-intro`}>
                <div data-content={"section_title relative"} className={"mb-8"}>

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
                <div className={styles.ProductSelector} data-type={`product-hydraulic-product`}>
                    <div className={styles.wrapper} data-content={`wrapper-hydraulic-product`}>
						{hasRotate ? <ImageRotate slug={slug as string}/> : <ImageCustoms width={image.width} height={image.height} src={image.url}/>}

                    </div>
                </div>
            </ProductRoot>
            <TabsProductControls data={productHydraulics[0]}/>

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
