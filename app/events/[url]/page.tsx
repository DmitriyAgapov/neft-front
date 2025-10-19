import {queryWrapper} from "@/utils/queryWrapper";
import {pageEvents} from "@/utils/gql/pageTools";
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import {Title, Text} from "@mantine/core";
import styles from "./styles.module.css";
import Breadcrumbs from "@/Components/Breadcrumbs/Breadcrumbs";
import DateFormat from "@/Components/DateFormat/DateFormat";
import Gallery from "@/Components/Gallery/Gallery";

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
                  <Breadcrumbs/>
                  <h3  className={"!my-2"}>
                      {page.title}
                  </h3>
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
