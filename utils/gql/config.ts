import {ProductFragment} from "@/utils/gql/Fragment";

export const config = `query Configuration{konfiguracziyaSajta{website_name slogan address logo{id logo{url width height}logo_inverse{url width height}}emails{email id label}Phones{id label number phone}Social{icon_inverse{documentId url width height}icon{documentId url width height}label id link}}}`
export const productBySlug = `${ProductFragment} query Product($filters:ProductFiltersInput){products(filters:$filters, pagination: { limit: 100 }){...ProductFields}}`
export const productsQuery = `${ProductFragment} query Products($filters:ProductFiltersInput) { products(pagination: { limit: 100 }, filters: $filters) { ...ProductFields } }`