import {queryWrapper} from "@/utils/queryWrapper";
import {sectionBeforeScreen} from "@/utils/gql/section";
import Section, {SectonProps} from "@/Components/Section/Section";

export default async function Home() {
  const data = await queryWrapper(sectionBeforeScreen);

  return (
      <div>
          {data.sections.map((section:SectonProps)  => <Section key={section.documentId} {...section}/>)}
      </div>
  );
}
