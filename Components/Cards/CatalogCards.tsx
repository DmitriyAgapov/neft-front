import styles from "./CatalogCard.module.css";
import {Title} from "@mantine/core";
import Link from "next/link";
import {IconUp} from "@/Components/Icons/Icons";
import Image from "next/image";

type CatalogCardProps = {
    title: string | undefined,
    link?: { title: string, url: string },
    image?: { documentId: string, width: number, height: number, url: string }[]
}
const CatalogCard = ({props}: {props:CatalogCardProps}) => {

    return (<div className={styles.card}>
            <header>
                <Title  order={3} >
                    {props.title}
                </Title>
            </header>
            {(props.image && props.image.length) ? (() => {
                const {documentId, ...prop} = props.image[0];
                return <Image alt={''} key={documentId} src={process.env.NEXT_BACK + prop.url} {...prop} />
            })() : null}
            <footer>
                <Link href={props.link?.url as string} className={styles.linkOverflow + " w-10 h-10 bg-blue-800 rounded-md flex justify-center items-center hover:bg-blue-700"}>
                    <IconUp/>
                </Link>
            </footer>
        </div>
    )
}

export default CatalogCard