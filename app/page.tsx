import {queryWrapper} from "@/utils/queryWrapper";
import Section, {SectonProps} from "@/Components/Section/Section";
import {pagePage} from "@/utils/gql/pageTools";

export default async function Home() {
      const {pages} = await queryWrapper(pagePage, {
          "url": "index"
      });
    const page = pages[0];
  return page.sections.map((section:SectonProps)  => <Section key={section.documentId} {...section}/>);
}
