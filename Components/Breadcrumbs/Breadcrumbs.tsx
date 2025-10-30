import Breadcrumb from "./Breadcrumbss";

import {getTitles} from "@/utils/gql/allTitles";
import {Suspense} from "react";
import Section from "@/Components/Section/Section";

const Breadcrumbs = () => {
    const all = getTitles()
    return (<Section type={"breadcrumbs"} title={"breadcrumbs"}>
            <Suspense fallback={"Loading..."}>
            <Breadcrumb data={all}/>
        </Suspense>
        </Section>)
}
export default Breadcrumbs