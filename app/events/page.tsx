import {queryWrapper} from "@/utils/queryWrapper";
import styles from "@/app/[url]/styles.module.css";
import {Title} from "@mantine/core";
import {pageEvents, pagePage} from "@/utils/gql/pageTools";
import CardEvent from "@/Components/Cards/CardEvent";
import Section from "@/Components/Section/Section";
import type {Metadata, ResolvingMetadata} from "next";
import {config} from "@/utils/gql/config";
import {notFound} from "next/navigation";

type Props = {
    params: Promise<{ url: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const url = (await params).url

    const {pages} = await queryWrapper(pagePage, {
        "url": url
    });
    const data = await queryWrapper(config);

    const page = pages[0];
    if (!page) return  notFound()
    return {
        title: data.konfiguracziyaSajta.website_name + ` - ${page.seo?.metaTitle ?? page.title}` ,
        description: page.seo?.metaDescription ?? "",
        keywords: page.seo?.keywords  ?? "",
    }
}
export default async function Home() {
  const {events} = await queryWrapper(pageEvents);

  return (
      <>
      <section className={styles.section} data-content={`section-page`}>
          <div data-content={"section_title"}>
              <h1>
                  События
              </h1>
          </div>
      </section>
      <section className={styles.section} data-content={`section-events_cards`}>
          <div data-content={"section_content"}>
              {events.map((event:any) => <CardEvent key={event.documentId} {...event}/>)}
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
  );
}
