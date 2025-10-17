import {queryWrapper} from "@/utils/queryWrapper";
import {hydraulicProductBySlug} from "@/utils/gql/config";
import styles from "./style.module.css";
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import {Button, Title} from "@mantine/core";
import ProductRoot from "@/Components/ProductVariantStore/ProductRoot";
import {ImageCustoms} from "@/Components/ImageCustom";
import Section from "@/Components/Section/Section";
import TabsProductControls from "@/Components/TabsProduct/TabsProductControls";
import Breadcrumbs from "@/Components/Breadcrumbs/Breadcrumbs";
import ImageRotate from "@/Components/ImageRotate/ImageRotate";

export default async function Page({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;

    const {productHydraulics} = await queryWrapper(hydraulicProductBySlug, {
        "slug": slug
    });

    if (!productHydraulics[0]) return
    const {title, description, image, short_dedcription, cards, gallery} = productHydraulics[0];

    return <>

        <section className={styles.section} data-content={`section-hydraulic-product`}>
            <div className={'col-1 col-span-5 self-start'} data-type={`section-hydraulic-product-intro`}>
                <div data-content={"section_title relative"} className={"mb-8"}>
                    <Breadcrumbs/>
                    <Title order={1} size={"h2"}>
                        {title}

                    </Title>
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
                        {gallery && gallery.length ? <ImageRotate images={gallery}/> :
                        <ImageCustoms width={image.width} height={image.height} src={image.url}/>}
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
