import {queryWrapper} from "@/utils/queryWrapper";
import Section, {SectonProps} from "@/Components/Section/Section";
import {pagePage} from "@/utils/gql/pageTools";
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import {Title} from "@mantine/core";

import styles from "../[url]/styles.module.css";
import Breadcrumbs from "@/Components/Breadcrumbs/Breadcrumbs";

export default async function Page({params}: { params: Promise<{ url: string }> }) {
    const {url} = await params;
  const {pages} = await queryWrapper(pagePage, {
      "url": "about"
  });
  const page = pages[0];

  return (
      <>
          <section className={styles.section} data-content={`section-page`}>
              <div data-content={"section_title"}>
                  <Breadcrumbs/>
                  <h2>
                      {page.title}
                  </h2>
              </div>
              {page?.short_dedcription && page?.short_dedcription[0].children[0].text !== ""  ? <div data-content={"section_short_description"}>
                  <BlockRendererClient content={page.short_dedcription}/>
              </div> : null}
              {page?.description  && page?.short_dedcription[0].children[0].text !== ""  ?  <div data-content={"section_description"}>
                  <BlockRendererClient content={page.description}/>
              </div> : null}
          </section>
          {page.sections.map((section:SectonProps)  => <Section key={section.documentId} {...section}/>)}

      </>
  );
}
