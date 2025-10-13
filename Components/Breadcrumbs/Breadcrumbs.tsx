'use client'

import {usePathname} from 'next/navigation'
import {Breadcrumbs as Brdcrmbs, Anchor} from "@mantine/core";
import {ArrowRight} from "@/Components/Icons/Icons";

const titles:{
    [key:string]:string
} = {
    events: "События",
    product: "Продукция",
    about: "О компании"
}

const Breadcrumbs = () => {
    const pathname = usePathname()
    const _pathname = pathname.split('/').splice(1, 1);

    const path = [
        { title: 'Главная', href: '/' }
    ]

    if (_pathname.length > 0) {
        _pathname.forEach((segment, index) => {
            path.push(
                {
                    title: titles[segment as string] || segment,
                    href: "/" + segment
                }
            )
        })
    }

    return <Brdcrmbs className={"mb-4"}  separator={<ArrowRight/>} separatorMargin="xs">{path.map((item, index) => (
            <Anchor href={item.href} key={index}>
                {item.title}
            </Anchor>
        ))}</Brdcrmbs>

}
export default Breadcrumbs