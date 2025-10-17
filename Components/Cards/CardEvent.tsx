import { Title, Text} from "@mantine/core";
import ImageCustoms from "@/Components/ImageCustom/ImageCustoms/ImageCustoms";
import CustomButton from "@/Components/CustomButton/CustomButton";
import styles from "./CardEvent.module.css";

export interface CardEventProps {
    documentId: string;
    title: string;
    url: string;
    create_date: string;
    image: {
        width: number;
        height: number;
        url: string;
        documentId: string;
    }
}

const CardEvent = (props: CardEventProps) => {
    return <div key={props.documentId} className={styles.root + ' card_event rounded-xl p-8 bg-white'}>
        <div data-content={"card_title"}>
            <Text  c={"white"} component={"span"} size={'sm'} className={"!mb-0"}>{props.create_date}</Text>
            <h3 style={{color: "white", marginTop: 4, lineHeight: 1.25}}>
                {props.title}
            </h3>
        </div>
        <div data-content={"card_image"}>
            <ImageCustoms src={props.image.url} height={props.image.height} width={props.image.width}/>
        </div>
        <div data-content={"card_link"}>
            <CustomButton size={"md"} variant={"default"} hreftype={"link"} href={`/events/${props.url}`}>Читать</CustomButton>.
        </div>
    </div>
}
export default CardEvent