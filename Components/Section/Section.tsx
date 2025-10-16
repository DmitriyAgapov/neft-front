import styles  from "./Section.module.css";
import {Button, Title} from "@mantine/core";
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import ScreenCard from "@/Components/Cards/ScreenCard";
import CatalogCard from "@/Components/Cards/CatalogCards";
import Image from "next/image";
import {LinkForm} from "@/Components/Icons/Icons";
import Form from "@/Components/Form/Form";
import Link from "next/link";
import Events from "@/Components/Events/Events";
import AboutCards from "@/Components/AboutCards/AboutCards";
import Gallery from "@/Components/Gallery/Gallery";
import {ImageCustoms} from "@/Components/ImageCustom";

export type SectonProps = {
    documentId?: string;
    title: string;
    type: string;
    description?: any;
    short_dedcription?: any;
    link?: {
        title: string;
        url: string;
    }
    cards?: Record<string, unknown | any>[];
    gallery?: Record<string, unknown | any>[];
}
const Section = ({title, type, description, short_dedcription, cards, gallery, link}:SectonProps) => {
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
                    {gallery && gallery.map((card:any) => <ImageCustoms key={card.documentId}  src={card.url} width={card.width} height={card.height} />)}
                </div>
            </section>

        case 'form':
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
                    <Button variant={"transparent"} href={'/form'} className={"!h-32"} component={"a"}>
                        <LinkForm  className={"w-32 h-32"} />
                    </Button>
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
        case 'page':
            return <section className={styles.section} data-content={`section-page`}>
                <div data-content={"section_description"}>
                    <BlockRendererClient content={short_dedcription}/>
                </div>
                <div data-content={"section_title"}>
                    <Title order={2} size={68}>
                        {title.split(" ")[0]}
                        <span> {title.split(" ")[1]}</span>
                    </Title>
                    {link ? <div data-content={"section_link"} className={"mt-8"}>
                        <Button size={"lg"} variant={"gray"} component={Link} href={link?.url} rightSection={<LinkForm  className={"w-6 h-6"} />}>{link?.title}</Button>
                    </div> : null}
                </div>
                <div data-content={"section_content"}>
                    {cards ? cards.map((card: any) =>
                        <div key={card.id}>
                            <div data-content={"card_title"}>
                                <Title order={4}>
                                    {card.title}
                                </Title>
                            </div>
                            <div data-content={"card_content"}>
                            </div>
                        </div>
                    ) : null}
                </div>
            </section>

        case 'page_event':
            return <section className={styles.section} data-content={`section-page`}>
                <div data-content={"section_description"}>
                    <BlockRendererClient content={short_dedcription}/>
                </div>
                <div data-content={"section_title"} className={"mb-8"}>
                    <Title order={2} size={68}>
                        {title.split(" ")[0]}
                        <span> {title.split(" ")[1]}</span>
                    </Title>
                    {link ? <div data-content={"section_link"} className={"mt-8"}>
                        <Button size={"lg"} variant={"gray"} component={Link} href={link?.url} rightSection={<LinkForm  className={"w-6 h-6"} />}>{link?.title}</Button>
                    </div> : null}
                </div>
                <div data-content={"section_content"}>
                    {cards ? cards.map((card: any) =>
                        <div key={card.id}>
                            <div data-content={"card_title"}>
                                <Title order={4}>
                                    {card.title}
                                </Title>
                            </div>
                            <div data-content={"card_content"}>
                            </div>
                        </div>
                    ) : null}

                </div>
                <Events/>
            </section>
        case 'page_no_title':
            return <section className={styles.section}  data-content={`section-${type}`}>
                <div data-content={"section_content"}>
                    {cards ? cards.map((card: any) =>
                        <div key={card.id} data-content={"card"} data-type={'card_contact'}>
                            <div data-content={"card_title"}>
                                <Title order={3}>
                                    {card.title}
                                </Title>
                            </div>
                            <div data-content={"card_content"}>
                                <BlockRendererClient content={card.description}/>
                            </div>
                        </div>
                    ) : null}
                </div>
            </section>
        case 'about':
            return <section className={styles.section}  data-content={`section-${type}`}>
                {short_dedcription ? <div data-content={"section_short_description"}>
                    <BlockRendererClient content={short_dedcription}/>
                </div> : null}
                {description ? <div data-content={"section_description"}>
                    <BlockRendererClient content={description}/>
                </div> : null}
                <div data-content={"section_content"}>
                    <AboutCards cards={cards as Record<string, any>[]}/>
                </div>
            </section>
        case 'our_manufacture':
            console.log(cards)
            return <section className={styles.section}  data-content={`section-${type}`}>
                <div data-content={"section_title"} className={"mb-8"}>
                    <Title order={2} >
                        {title.split(" ")[0]}
                        <span> {title.split(" ")[1]}</span>
                    </Title>
                    {link ? <div data-content={"section_link"} className={"mt-8"}>
                        <Button size={"lg"} variant={"gray"} component={Link} href={link?.url} rightSection={<LinkForm  className={"w-6 h-6"} />}>{link?.title}</Button>
                    </div> : null}
                </div>
                {cards ? <div data-content="section_gallery">
                    {cards.map((card:any) => <div key={card.id}>
                        <div data-content={"card_title"} className={"mb-8"}>
                            <Title order={3} >
                                {card.title}
                            </Title>
                        </div>
                        <div data-content="section_gallery">
                            <Gallery images={card.gallery}/>
                        </div>
                    </div>)}
                </div> : null}
            </section>

        case 'page_form':
            return <section className={styles.section}  data-content={`section-${type}`}>
                <div data-content={"section_description"}>
                    <BlockRendererClient content={description}/>
                </div>
                <div data-content={"section_content"}>
                    <Form/>
                </div>
            </section>

        default:
            return
    }
}
export default Section