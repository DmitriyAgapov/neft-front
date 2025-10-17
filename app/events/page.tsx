import {queryWrapper} from "@/utils/queryWrapper";
import styles from "@/app/[url]/styles.module.css";
import {Title} from "@mantine/core";
import {pageEvents} from "@/utils/gql/pageTools";
import CardEvent from "@/Components/Cards/CardEvent";
import Section from "@/Components/Section/Section";

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
