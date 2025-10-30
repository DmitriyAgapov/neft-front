import {ImageCustoms} from "@/Components/ImageCustom";
import {Button, Title} from "@mantine/core";
import BlockRendererClient from "@/Components/BlockRendererClient/BlockRendererClient";
import {LinkForm} from "@/Components/Icons/Icons";

const CardTool = ({item}: {item:any}) => {
    console.log(item)
    return  <div data-type={'card_product_hydraulic'} className={'md:grid grid-cols-[8rem_1fr] gap-4 p-6 bg-white rounded-xl'}>
        {item.image ? <div className={''}>
            <ImageCustoms src={item.image.url} width={item.image.width} height={item.image.height} />
        </div> : null}
        <div className={'flex flex-col gap-4 mt-4 md:mt-0'}>
            <Title order={4} className={"!text-[var(--mantine-color-blue-light-color)]"}>{item.title}</Title>
            <BlockRendererClient
                content={item.short_dedcription}
            />
            <div className={'md:flex gap-4 mt-5'}>
                <Button className={"max-md:!block"} variant={"primary"} href={`/form`} mb={16} size={"sm"} component={"a"} >Оставить заявку</Button>
                <Button className={"max-md:!block"} variant={"icon"} href={`/product/hydraulic-tools/${item.category.category}/${item.hydraulic_slug}`} size={"sm"} component={"a"} rightSection={<LinkForm className={'w-4 h-4'}/>}>Подробнее</Button>
            </div>
        </div>
    </div>
}
export default CardTool
