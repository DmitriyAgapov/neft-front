'use client'
import styles from "./GridLayout.module.css";
import React from "react";
import {AppShell,  AppShellHeader, Burger, Button} from "@mantine/core";
import Logo from "@/Components/Logo/Logo";
import MenuHeader from "@/Components/MenuHeader/MenuHeader";
import {LinkForm} from "@/Components/Icons/Icons";
import {useDisclosure} from "@mantine/hooks";
import Link from "next/link";

const GridLayoutWrapper = ({data, children}:{data: any, children: React.ReactNode & any}) => {

    const [opened, { toggle }] = useDisclosure();
    console.log(data)
    return (
        <AppShell unstyled className={styles.grid}  navbar={{

            width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened }
        }}>
            <AppShellHeader className={styles.header}  data-open={opened}  >
                <div data-content={"wrapper"}>
                    <div className={`${opened && "max-lg:border-b"} col-span-full border-gray-300 lg:contents flex justify-between items-center h-16`}>
                    <Logo img={data.konfiguracziyaSajta.logo}/>

                    <Burger
                        opened={opened}
                        className={"lg:hidden"}
                        onClick={toggle}
                        hiddenFrom="lg"
                        size="md"
                    />
                    </div>
                    <MenuHeader onClose={toggle}/>
                    <div className={'col-span-2 font-semibold'} data-content={"links"}>
                        <ul className={'pl-0'}>
                            {<li className={'grid my-2 gap-2 justify-center'}>
                                <a href={`tel:${data.konfiguracziyaSajta.Phones[0].number}`}
                                   className={'text-lg font-semibold text-black'}>
                                    {data.konfiguracziyaSajta.Phones[0].phone}
                                </a>
                                <Button component={Link} href={"form"} className={'!bg-gray-100 !text-gray-600'}
                                        variant={"light"} rightSection={<LinkForm className={'w-4 h-4 *:fill-gray-600'}/>}>Оставить
                                    заявку</Button>
                            </li>}
                        </ul>
                    </div>
                </div>
            </AppShellHeader>
            {children}
        </AppShell>
    )
}
export default GridLayoutWrapper
