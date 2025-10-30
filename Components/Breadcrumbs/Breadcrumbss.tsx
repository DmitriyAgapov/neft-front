'use client'
import {usePathname} from 'next/navigation'
import {Breadcrumbs as Brdcrmbs, Anchor} from "@mantine/core";
import {ArrowRight} from "@/Components/Icons/Icons";
import {use} from "react";
import Link from "next/link";

function transformData(data: { data: { categories: { category: string | number; title: any; }[]; products: { slug: string | number; title: any; }[]; }; }) {
    const result:{ [key:string]:string} = {};

    // Обрабатываем категории
    if (data.data.categories) {
        data.data.categories.forEach((category: { category: string | number; title: any; }) => {
            result[category.category] = category.title;
        });
    }

    // Обрабатываем продукты
    if (data.data.products) {
        data.data.products.forEach((product: { slug: string | number; title: any; }) => {
            result[product.slug] = product.title;
        });
    }

    return result;
}

const titles:{
    [key:string]:string
} = {
    events: "События",
    product: "Продукция",
    about: "О компании"
}

const Breadcrumb = ({data}:{data:Promise<{data: {[key:string]: string}}>}) => {
    const pathname = usePathname()

    const _pathname = ["/", ...pathname.split('/').slice(1, -1)];
    const all = use(data)
    let path: { title: string; href: string; }[] = []

    const _titles = {
        ...titles,
        // @ts-ignore
        ...transformData(all)
    }
    if (_pathname.length > 0) {
		console.log(_pathname)
        _pathname.forEach((segment, index) => {
			const href = _pathname.slice(0, index + 1).join('/').replace('//', '/');

			// Для корневого элемента используем специальное название
			const title = segment === '/' ? 'Главная' : segment;
            path.push(
                {
                    title: _titles[segment as string] || title,
                    href: "" + href
                }
            )
        })
    }
	console.log(path)
    return <Brdcrmbs className={"mb-4"}  separator={<ArrowRight/>} separatorMargin="xs" >{path.map((item, index) => (
            <Anchor component={Link} href={item.href} key={index} >
                {item.title}
            </Anchor>
        ))}</Brdcrmbs>

}
export default Breadcrumb
