import {queryWrapper} from "@/utils/queryWrapper";
import { pageEvents, pagePage } from "@/utils/gql/pageTools";
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import {Title, Text} from "@mantine/core";
import styles from "./styles.module.css";
import Breadcrumbs from "@/Components/Breadcrumbs/Breadcrumbs";
import DateFormat from "@/Components/DateFormat/DateFormat";
import Gallery from "@/Components/Gallery/Gallery";
import type { Metadata, ResolvingMetadata } from "next";
import { config } from "@/utils/gql/config";
import { notFound } from "next/navigation";
import BreadcrumbsBlock from "@/Components/Breadcrumbs/BreadcrumbsBlock";

type Props = {
	params: Promise<{ url: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const url = (await params).url

	const {events} = await queryWrapper(pageEvents, {
		"url": url
	});
	const data = await queryWrapper(config);

	const page = events[0];
	if (!page) return  notFound()
	return {
		title: data.konfiguracziyaSajta.website_name + " - События" + ` - ${page.seo?.metaTitle ?? page.title}` ,
		description: page.seo?.metaDescription ?? "",
		keywords: page.seo?.keywords  ?? "",
	}
}
export default async function PageEvent({params}: { params: Promise<{ url: string }> }) {
    const {url} = await params;
  const {events} = await queryWrapper(pageEvents, {
      "url": url
  });
  const page = events[0];
    console.log(page, 'page')
  return (
      <>

          <section className={styles.section} data-content={`section-page_event`}>

              <div data-content={"section_title"}>
				  <BreadcrumbsBlock/>
                  <h1  className={"!my-2 text-4xl"}>
                      {page.title}
                  </h1>
                  <Text><DateFormat date={page.create_date} formatier="DD MMMM YYYY" /></Text>
              </div>
              <div data-content={"section_content"}>
                  <BlockRendererClient content={page.intro}/>
              </div>
              <div data-content={"section_gallery"}>
                    <Gallery images={page.gallery}/>
              </div>
              <div data-content={"section_content"}>
                  <BlockRendererClient content={page.text}/>
              </div>
          </section>

      </>
  );
}
