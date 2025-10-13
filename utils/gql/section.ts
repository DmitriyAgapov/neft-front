import {cardsFragment} from "@/utils/gql/Fragment";


export const sectionBeforeScreen:string = `${cardsFragment} query SectionMain { sections(sort: "order", filters: { type: { not: { eq: "page_no_title" } } }) { title order type description documentId ...SectionFragment link { id title url }    gallery { documentId height width url }} }`