import {queryWrapper} from "@/utils/queryWrapper";
import {sectionBeforeScreen} from "@/utils/gql/section";
import Section, {SectonProps} from "@/Components/Section/Section";
import {pagePage} from "@/utils/gql/pageTools";
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import {Title} from "@mantine/core";
import styles from "./styles.module.css";

export default async function Page({params}: { params: Promise<{ url: string }> }) {
    const {url} = await params;
  const {pages} = await queryWrapper(pagePage, {
      "url": url
  });
    console.log(pages, 'pages')
  const page = pages[0];

  return (
      <>
          <section className={styles.section} data-content={`section-page`}>
              {page?.short_dedcription ? <div data-content={"section_description"}>
                  <BlockRendererClient content={page.short_dedcription}/>
              </div> : null}
              <div data-content={"section_title"}>
                  <Title order={2} size={68}>
                      {page.title}
                  </Title>
              </div>
          </section>
          {page.sections.map((section:SectonProps)  => <Section key={section.documentId} {...section}/>)}

      </>
  );
}
