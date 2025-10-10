import styles from "./GridLayout.module.css";
import React from "react";
import {AppShell, AppShellFooter, AppShellHeader, AppShellMain, Button, Text, Title} from "@mantine/core";
import {queryWrapper} from "@/utils/queryWrapper";
import {config} from "@/utils/gql/config";
import Logo from "@/Components/Logo/Logo";
import ImageCustoms from "../ImageCustom/ImageCustoms/ImageCustoms";
import MenuHeader from "@/Components/MenuHeader/MenuHeader";
import {LinkForm} from "@/Components/Icons/Icons";


const AddressItem = (el: any) => <li className={'grid !my-2'}>
    <a href={`tel:${el.number}`} className={'text-white text-base font-semibold border-b-0 hover:text-gray-300'}>{el.phone}</a>
    <span className={" text-xs text-white "}>{el.label}</span>
</li>

const EmailItem = (el: any) => <li className={'grid !my-2'}>
    <a href={`mailto:${el.email}`} className={'text-white text-base font-semibold  hover:text-gray-300  border-b-0'}>{el.email}</a>
</li>

const GridLayout = async ({children}: React.ReactNode & any) => {
    const data = await queryWrapper(config);

    return (
        <AppShell className={styles.grid}>
            <AppShellHeader className={styles.header}>
                <div data-content={"wrapper"}>
                    <Logo img={data.konfiguracziyaSajta.logo}/>
                    <MenuHeader/>
                    <div className={'col-span-2 font-semibold'}>
                        <ul>
                            {<li className={'grid my-2 gap-2 justify-center'}>
                                <a href={`tel:${data.konfiguracziyaSajta.Phones[0].number}`}
                                   className={'text-lg font-semibold'}>
                                    {data.konfiguracziyaSajta.Phones[0].phone}
                                </a>
                                <Button component={"a"} href={"form"} className={'!bg-gray-100 !text-gray-600'}
                                        variant={"light"} rightSection={<LinkForm className={'w-4 h-4 *:fill-gray-600'}/>}>Оставить
                                    заявку</Button>
                            </li>}
                        </ul>
                    </div>
                </div>


            </AppShellHeader>
            <AppShellMain className={styles.main}>
                {children}
            </AppShellMain>
            <AppShellFooter className={styles.footer}>
                <div data-content={"wrapper"}>
                    <div className={"contents"}>
                        <div className={'col-span-5'}>
                            <Logo inversed img={data.konfiguracziyaSajta.logo}/>
                            <Text size={"sm"} c={"dimmed"} mt={8}
                                  className={'col-span-3 mt-2'}>{data.konfiguracziyaSajta.slogan}</Text>
                        </div>
                        <div className={'col-span-3'}>
                            <Title order={5} c={"dimmed"} mb={8} className={"leading-[1.25rem] !mb-4"}>Продукция</Title>
                            <ul>
                                <li className={'text-white text-sm my-2'}>Перемешивающие устройства (мешалки)</li>
                                <li className={'text-white text-sm my-2'}>Перемешивающие устройства (мешалки)</li>
                                <li className={'text-white text-sm my-2'}>Перемешивающие устройства (мешалки)</li>
                                <li className={'text-white text-sm my-2'}>Перемешивающие устройства (мешалки)</li>
                            </ul>
                        </div>
                        <div className={'col-span-2'}>
                            <Title order={5} c={"dimmed"} mb={8} className={"leading-[1.25rem] !mb-4"}>Компания</Title>
                            <ul>
                                <li className={'text-white text-sm my-2'}>О компании</li>
                                <li className={'text-white text-sm my-2'}>Документы</li>
                                <li className={'text-white text-sm my-2'}>События</li>
                            </ul>
                        </div>
                        <div className={'col-span-2 col-start-[-3]'}>
                            <Title order={5} c={"dimmed"} className={"!leading-[1.25rem] !mb-4"}>Контакты</Title>
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
        </AppShell>
    )
}
export default GridLayout