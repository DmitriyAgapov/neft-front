'use client'
import {variants} from "@/Components/ProductSelector/data";
import {Center, SegmentedControl, Title} from "@mantine/core";
import {observer} from "mobx-react-lite";
import {useStore} from "@/Components/ProductVariantStore/context";

const ProductSelectVariant = () => {
    const store = useStore();
    const filters = store.getFilters;

    return <div data-content={"section_select__variant"}>
        {variants.map((el) => {
            return <div key={el.slug}>
                <Title order={4} size="sm" fw={500} mb={3}>
                    {el.title}
                </Title>

                <SegmentedControl
                    value={filters[el.slug] as string ?? ""}
                    onChange={(value) => store.addFilter(el.slug, value)} radius="xl"
                    defaultValue={""}
                    withItemsBorders={false}
                    classNames={{
                        root: '!bg-transparent'
                    }}
                    data={el.items.map((item) => ({
                        value: item.slug,
                        label: (<Center onMouseEnter={() => {
                            el.slug !== "dvigatel" && store.setImagePath("hover", el.slug, item.slug)
                        }} onMouseLeave={() => {
                            el.slug !== "dvigatel" && store.setImagePath("default")
                        }}
                            className={"text-md p-1 font-semibold"}><span>{item.title}</span></Center>),
                    }))}
                />
            </div>
        })}
    </div>
}
export default observer(ProductSelectVariant);