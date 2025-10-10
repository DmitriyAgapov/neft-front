import {queryWrapper} from "@/utils/queryWrapper";
import {productBySlug} from "@/utils/gql/config";
import styles from "./style.module.css";
import styless from "@/Components/ProductSelector//ProductSelector.module.css";
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import {Button, Title} from "@mantine/core";
import ProductRoot from "@/Components/ProductVariantStore/ProductRoot";
import {ImageCustoms} from "@/Components/ImageCustom";
import Section from "@/Components/Section/Section";
import TabsProductControls from "@/Components/TabsProduct/TabsProductControls";
import Breadcrumbs from "@/Components/Breadcrumbs/Breadcrumbs";

export default async function Page({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;
    const {products} = await queryWrapper(productBySlug, {
        "filters": {"slug": {"eq": slug}}
    });
    if (!products[0]) return
    const {title, type, description, Image, short_dedcription, cards, gallery} = products[0];
    return <>

        <section className={styles.section} data-content={`section-${type}`}>
            <div className={'col-1 col-span-5 self-start'} data-type={`section-${type}-intro`}>
                <div data-content={"section_title relative"} className={"mb-8"}>
                    <Breadcrumbs/>
                    <Title order={1} size={"h2"}>
                        {title}

                    </Title>
                    <div data-content={"section_description"} className={'mt-8 max-w-[30rem]'}>
                        <BlockRendererClient content={short_dedcription}/>
                    </div>
                </div>


                <div data-content={'section_link'} className={'max-w-[20rem]'}>
                    <Button fullWidth variant={"primary"} href={'/form'} size={"xl"} component={"a"}>Оставить
                        заявку</Button>
                </div>
            </div>

            <ProductRoot>
                <div className={styless.ProductSelector} data-type={`product-${type}`}>
                    <div className={styless.wrapper} data-content={`wrapper-${type}`}>
                        <ImageCustoms width={Image.width} height={Image.height} src={Image.url}/>
                    </div>
                </div>
            </ProductRoot>
            <TabsProductControls data={products[0]}/>

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
