'use client'
import {Menu, Button, Group,  AccordionChevron} from '@mantine/core';

import React from 'react';
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useViewportSize} from "@mantine/hooks";
import styles from "./MenuHeader.module.css";

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
const MenuHeader = ({onClose}: {onClose: () => void}) => {
    const router = useRouter();
    const { height, width } = useViewportSize();
    return <Group data-content={"menu"} className={"xl:col-span-7 mt-8 lg:mt-0 col-span-full !gap-0 max-w-[64rem]:flex-col"}>{data.map((el, index) =>
        <Menu

            loop={false}
                   withinPortal={false}
                   trapFocus={false}
            defaultOpened={true}
            opened={true}
                   menuItemTabIndex={0} width={width > 1024 ? 300 : "target"} key={'menu_' + index} trigger={width > 1024 ? "click-hover" : undefined}>
        <Menu.Target>
            <Button href={el.href}  component={Link} className={"hover:border-b border-gray-500"} size={"md"} color={"gray-500"} variant={"transparent"} onClick={onClose} rightSection={el.subitems && <AccordionChevron className={'text-gray-500'}/>}>{el.title}</Button>
        </Menu.Target>

        {el.subitems ? <Menu.Dropdown className={styles.dropdown}>
            {el.subitems.map((sel, index) => <Menu.Item key={"menu_subitem_" + index} onClick={() => {

                router.push(`${el.href}/${sel.href}`);
                onClose();
            }}>
                {sel.title}
            </Menu.Item>)}
        </Menu.Dropdown> : null}

    </Menu>)}</Group>
}

export default MenuHeader