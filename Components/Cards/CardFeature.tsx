
import Image from "next/image";
import {Title} from "@mantine/core";
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";

const CardFeature = (props:any) => {
    return <div data-type={"card_feature"} className={"p-6 bg-white rounded-xl grid gap-4"}>
        <Image src={`${process.env.NEXT_BACK}` + props.image.url} height={props.image.height} width={props.image.width} alt={""}/>
        <Title order={5}>{props.title}</Title>
        {props.description ? <div  data-type={'card_feature_description'}>
            <BlockRendererClient
                content={props.description}
            />
        </div> : null}
    </div>
}

export default CardFeature