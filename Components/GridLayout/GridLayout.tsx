import styles from "./GridLayout.module.css";
import React from "react";
import {AppShellFooter, AppShellMain, NavLink, Text, Title} from "@mantine/core";
import {queryWrapper} from "@/utils/queryWrapper";
import {config} from "@/utils/gql/config";
import Logo from "@/Components/Logo/Logo";
import ImageCustoms from "../ImageCustom/ImageCustoms/ImageCustoms";
import GridLayoutWrapper from "@/Components/GridLayout/GridLayoutWrapper";
import {dataMenu} from "@/utils/constants";
import Link from "next/link";


const AddressItem = (el: any) => <li className={'grid !my-2'}>
    <a href={`tel:${el.number}`} className={'text-white text-base font-semibold border-b-0 hover:text-gray-300'}>{el.phone}</a>
    <span className={" text-xs text-white "}>{el.label}</span>
</li>

const EmailItem = (el: any) => <li className={'grid !my-2'}>
    <a href={`mailto:${el.email}`} className={'text-white text-base font-semibold  hover:text-gray-300  border-b-0'}>{el.email}</a>
</li>

const GridLayout = async ({children}: React.ReactNode & any) => {
    const data = await queryWrapper(config);
    const [menu, ...rest] = dataMenu;
    return (
        <GridLayoutWrapper data={data}>
            <AppShellMain className={styles.main}>
                {children}
            </AppShellMain>
            <AppShellFooter className={styles.footer}>
                <div data-content={"wrapper"}>
                    <div className={"contents"}>
                        <div className={'xl:col-span-5 min-[74em]:col-span-4 col-span-full'}>
                            <Logo inversed={true} img={data.konfiguracziyaSajta.logo}/>
                            <Text size={"sm"} c={"dimmed"}
                                  className={'col-span-3'}>{data.konfiguracziyaSajta.slogan}</Text>
                        </div>
                        <div className={'md:col-span-3  col-span-full'}>
                            <Title order={5} c={"dimmed"} mb={8} className={"leading-[1.25rem] !mb-2"}>Продукция</Title>
                            <ul style={{listStyle: "none", paddingLeft: 0}}>
                                {menu.subitems?.map((el: any) => <li key={el.href}><Link className={'text-white hover:text-gray-400 text-sm my-2'}  href={'/product/' + el.href} >{el.title}</Link></li>)}
                            </ul>
                        </div>
                        <div className={'md:col-span-2 col-span-full'}>
                            <Title order={5} c={"dimmed"} mb={8} className={"leading-[1.25rem] !mb-2"}>Компания</Title>

                                <ul style={{listStyle: "none", paddingLeft: 0}}>
                                    {rest.slice(0, 3)?.map((el: any) => <li key={el.href}><Link className={'text-white hover:text-gray-400 text-sm my-2'}  href={el.href} >{el.title}</Link></li>)}
                                </ul>

                        </div>
                        <div className={'md:col-span-2 xl:col-start-[-3] col-span-full '}>
                            <Title order={5} c={"dimmed"} className={"!leading-[1.25rem] !mb-2"}>Контакты</Title>
                            <ul className={'!pl-0'}>
                                {data.konfiguracziyaSajta.Phones.map((el: any) => <AddressItem key={el.id}  {...el}/>)}
                                {data.konfiguracziyaSajta.emails.map((el: any) => <EmailItem key={el.id}  {...el}/>)}
                                <li className={'text-white text-sm block'}>{data.konfiguracziyaSajta.address}</li>
                            </ul>
                        </div>

                    </div>
                    <hr className={"col-span-full my-6"}/>
                    <div className={"col-span-full"}>
                        <div className={'col-span-full flex justify-between'}>
                            <Text size={"sm"} c={"dimmed"} mt={8} className={'col-span-3 '}>© ООО «Конверсия–Нефть»,
                                2025 г. </Text>
                            <div className={'flex gap-4'}>{data.konfiguracziyaSajta.Social.map((el: any) =>
                                <ImageCustoms key={el.icon_inverse.documentId} src={el.icon_inverse.url}
                                              width={el.icon_inverse.width} height={el.icon_inverse.height}/>)}</div>
                        </div>
                    </div>
                </div>
            </AppShellFooter>
        </GridLayoutWrapper>
    )
}
export default GridLayout