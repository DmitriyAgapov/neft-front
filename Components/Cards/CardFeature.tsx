
import {Title} from "@mantine/core";
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import {ImageCustoms} from "@/Components/ImageCustom";

const CardFeature = (props:any) => {
    return <div data-type={"card_feature"} className={"p-6 bg-white rounded-xl grid gap-4"}>
        <ImageCustoms src={props.image.url} height={props.image.height} width={props.image.width}/>
        <h5>{props.title}</h5>
        {props.description ? <div  data-type={'card_feature_description'}>
            <BlockRendererClient
                content={props.description}
            />
        </div> : null}
    </div>
}

export default CardFeature