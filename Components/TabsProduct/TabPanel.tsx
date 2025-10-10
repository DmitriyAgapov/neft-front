import {Tabs} from "@mantine/core";

interface TabPanelParams {
    value: string;
    title: string;
}

const TabPanel = (props: TabPanelParams) => {
    return <Tabs.Panel value={props.value}>{props.title}</Tabs.Panel>
}

const TabPanels = ({items}: {items: TabPanelParams[]}) =>  {
    return items.map((el) => <TabPanel key={el.value} value={el.value} title={el.title} />)
}

export default TabPanels