'use client'
import {Button, ButtonProps} from "@mantine/core";
import {useRouter} from "next/navigation";
import Link from "next/link";

const CustomButton = (props:ButtonProps & { hreftype?: "button" | "link", href?: string }) => {
    const router = useRouter();
    // @ts-ignore
    return <Button component={props.hreftype === "link" ? Link : undefined} href={(props.hreftype === "link" && props.href) ? () => router.push(props.href as string) : null}  {...props}/>
}
export default CustomButton