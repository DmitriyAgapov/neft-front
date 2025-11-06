import Breadcrumb from "./Breadcrumbss";

import {getTitles} from "@/utils/gql/allTitles";
import {Suspense} from "react";

const BreadcrumbsBlock = () => {
    const all = getTitles()
    return (
            	<Suspense fallback={"Loading..."}>
            		<Breadcrumb data={all}/>
        	</Suspense>
        )
}
export default BreadcrumbsBlock
