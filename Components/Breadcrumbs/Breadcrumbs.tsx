'use client'

import { useSelectedLayoutSegments } from 'next/navigation'
import {ArrowRight} from "@/Components/Icons/Icons";
import Link from "next/link";

const Breadcrumbs = () => {
    const segments = useSelectedLayoutSegments()
    console.log(segments)
    return (
        <ul className={"!pl-0 mb-4"}>
            <li className={"list-none flex items-center gap-2 text-lg font-[Raleway]"}><Link className={'text-[var(--text-default)] border-b-0'} href={'/'}>Главная</Link> <ArrowRight/></li>
            {segments.map((segment, index) => (
                <li key={index}>{segment}</li>
            ))}
        </ul>
    )

}
export default Breadcrumbs