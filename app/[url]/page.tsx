import {queryWrapper} from "@/utils/queryWrapper";
import Section, {SectonProps} from "@/Components/Section/Section";
import {pagePage} from "@/utils/gql/pageTools";
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import {Title} from "@mantine/core";
import styles from "./styles.module.css";
import {notFound} from "next/navigation";
import type { Metadata, ResolvingMetadata } from 'next'
import {config} from "@/utils/gql/config";

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
export default async function Page({params}: { params: Promise<{ url: string }> }) {
    const {url} = await params;
  const {pages} = await queryWrapper(pagePage, {
      "url": url
  });
    console.log(pages, 'pages')
  const page = pages[0];
    if (!page) return  notFound()
  return (
      <>
          {!page?.settings.isShortDescriptionHidden && !page?.settings.isTitleHidden ?<section className={styles.section} data-content={`section-page`}>
              {!page?.settings.isShortDescriptionHidden ? <div data-content={"section_description"}>
                  <BlockRendererClient content={page.short_dedcription}/>
              </div> : null}
              {!page?.settings.isTitleHidden ? <div data-content={"section_title"}>
                  <h2>
                      {page.title}
                  </h2>
              </div> : null}
          </section> : null}
          {page.sections.map((section:SectonProps)  => <Section key={section.documentId} {...section}/>)}

      </>
  );
}
