'use client'
import {Menu, Button, Group,  AccordionChevron} from '@mantine/core';

import React from 'react';
import Link from "next/link";
import {useRouter} from "next/navigation";

const data = [
    {
        title: "Продукция",
        href: "/product",
        subitems: [
            {
                title: "Перемешивающие устройства (мешалки)",
                href: "mixers",
            },
            {
                title: "Система контроля наличия газа и жидких углеводородов в магистрали",
                href: "sistema-kontrolya-nalichiya-gaza-i-zhidkih-uglevodorodov-v-magistrali"
            },
            {
                title: "Сигнализатор сдвига цистерн",
                href: "signalizator-sdviga-czistern"
            },
            {
                title: "Гидравлический инструмент «КРАБ»",
                href: "hydraulic-tools"
            }
        ]
    },
    {
        title: "О компании",
        href: "/about",
    },
    {
        title: "Документы",
        href: "/docs"
    },
    {
        title: "События",
        href: "/events"
    },
    {
        title: "Контакты",
        href: "/contacts"
    }
]
const MenuHeader = () => {
    const router = useRouter();
    return <Group className={"col-span-7 !gap-0"}>{data.map((el, index) =>
        <Menu width={300} key={'menu_' + index} trigger="click-hover" >
        <Menu.Target>
            <Button href={el.href}  component={Link} className={"hover:border-b border-gray-500"} size={"md"} color={"gray-500"} variant={"transparent"} rightSection={el.subitems && <AccordionChevron className={'text-gray-500'}/>}>{el.title}</Button>
        </Menu.Target>

        {el.subitems ? <Menu.Dropdown>
            {el.subitems.map((sel, index) => <Menu.Item key={"menu_subitem_" + index} onClick={() => router.push(`${el.href}/${sel.href}`)}>
                {sel.title}
            </Menu.Item>)}
        </Menu.Dropdown> : null}

    </Menu>)}</Group>
}

export default MenuHeader