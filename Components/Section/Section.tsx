import styles  from "./Section.module.css";
import {Button, Title} from "@mantine/core";
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import ScreenCard from "@/Components/Cards/ScreenCard";
import CatalogCard from "@/Components/Cards/CatalogCards";
import Image from "next/image";
import {LinkForm} from "@/Components/Icons/Icons";

export type SectonProps = {
    documentId?: string;
    title: string;
    type: string;
    description?: any;
    link?: {
        title: string;
        url: string;
    }
    cards?: Record<string, unknown | any>[];
    gallery?: Record<string, unknown | any>[];
}
const Section = ({title, type, description, cards, gallery}:SectonProps) => {
    switch (type) {
        case 'before_screen':
            return <section className={styles.section} data-content={`section-${type}`}>
                <div data-content={"section_description"}>
                    <BlockRendererClient content={description}/>
                </div>
                <div data-content={"section_title"}>
                    <Title order={1}>
                        {title.split(" ").slice(0, 3).join(" ")}
                        <span> {title.split(" ").slice(3).join(" ")}</span>
                    </Title>
                </div>
            </section>

        case 'catalog':
            return <section className={styles.section} data-content={`section-${type}`}>
                <div data-content={"section_description"}>
                    <BlockRendererClient content={description}/>
                </div>
                <div data-content={"section_title"}>
                    <Title order={2}>
                        {title}
                    </Title>
                </div>
                <div data-content={'section_cards'}>
                    {cards && cards.map((card:any) => <CatalogCard key={card.id}  props={card}/>)}
                </div>
            </section>

        case 'useourproducts':
            return <section className={styles.section} data-content={`section-${type}`}>
                <div data-content={"section_description"}>
                    <BlockRendererClient content={description}/>
                </div>
                <div data-content={"section_title"}>
                    <Title order={2}>
                        {title}
                    </Title>
                </div>
                <div data-content={'section_gallery'}>
                    {gallery && gallery.map((card:any) => <Image key={card.documentId}  src={process.env.NEXT_BACK + card.url} width={card.width} height={card.height} alt={''}/>)}
                </div>
            </section>

        case 'form':
            console.log('descriptionsss', description[0].children)
            return <section className={styles.section} data-content={`section-${type}`}>
                <div data-content={"section_description"}>
                    <BlockRendererClient content={description}/>
                </div>
                <div data-content={"section_title"}>
                    <Title order={2} size={68}>
                        {title.split(" ")[0]}
                        <span> {title.split(" ")[1]}</span>
                    </Title>
                </div>
                <div data-content={'section_link'}>
                    <Button variant={"transparent"} href={'/form'} className={"!h-32"} component={"a"}><LinkForm  className={"w-32 h-32"} /></Button>
                </div>
            </section>

        case 'screen':
            return <section className={styles.section} data-content={`section-${type}`}>
                <div data-content={'section_cards'}>
                    <ScreenCard items={cards as Record<string, any>[]}/>
                </div>
            </section>

        case 'product':
            return <section className={styles.section} data-content={`section-${type}`}>
                <div data-content={'section_cards'}>
                    <ScreenCard items={cards as Record<string, any>[]}/>
                </div>
            </section>
        default:
            return
    }
}
export default Section