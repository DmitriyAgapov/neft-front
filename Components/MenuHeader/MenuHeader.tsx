'use client'
import {Menu, Button, Group,  AccordionChevron} from '@mantine/core';

import React from 'react';
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useViewportSize} from "@mantine/hooks";
import styles from "./MenuHeader.module.css";
import {dataMenu} from "@/utils/constants";


const MenuHeader = ({onClose}: {onClose: () => void}) => {
    const router = useRouter();
    const { height, width } = useViewportSize();
    if (!width) return <Group data-content={"menu"} className={"xl:col-span-7 mt-8 lg:mt-0 col-span-full !gap-0 max-w-[64rem]:flex-col"}></Group>
    console.log(width, 'width')
    const mobildeProps = width < 1024 ? {
        loop: false,
        withinPortal:false,
        trapFocus:false,
        defaultOpened:true,
        opened: true,
        trigger: undefined,
    } : {
        trigger: "click-hover",
    } as {
        [key: string]: any;
        trigger: "click-hover" | "click" | "hover" | undefined;
    }
    return <Group data-content={"menu"} className={"xl:col-span-8 lg:col-span-4  min-[74rem]:col-span-8 lg:col-span-4 mt-8 lg:mt-0  !gap-0 max-w-[64rem]:flex-col col-span-full"}>
        {width && dataMenu.map((el, index) =>
        <Menu key={'menu_' + index}  {...mobildeProps}
           menuItemTabIndex={0} width={width > 1024 ? 300 : "target"}  >
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

    </Menu>)}
    </Group>
}

export default MenuHeader