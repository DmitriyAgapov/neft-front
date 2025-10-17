import {Title, Text} from "@mantine/core";
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import {ImageCustoms} from "@/Components/ImageCustom";
import styles from "./AboutCards.module.css";
const AboutCards = ({cards}: Record<string, any>) => {
    return cards.map((card: any, index: number) => {
            return <div key={card.id} className={'md:contents'} data-type={"card_wrapper"}>
                <div data-content={"card"} data-type={'card_about_text'} className={styles.card}>
                    <div data-content={"card_title"} className={'flex items-center gap-3'}>
                        <Text fw={"600"} className={'mr-3 !mt-0.5 md:!text-2xl  !text-xl  inline semibold flex-0 !text-gray-400'}>0{index + 1}</Text>
                        <Title order={3}>

                            {card.title}
                        </Title>
                    </div>
                    <div data-content={"card_content"}>
                        <BlockRendererClient content={card.description}/>
                    </div>
                </div>
                <div data-content={"card"} data-type={'card_about_image'}  className={styles.card_image}>
                    <ImageCustoms src={card.image[0].url} height={card.image[0].height} width={card.image[0].width}/>
                </div>
            </div>
        })
}
export default AboutCards