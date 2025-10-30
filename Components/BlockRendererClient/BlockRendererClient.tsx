import {
    BlocksRenderer,
    type BlocksContent,
} from "@strapi/blocks-react-renderer";

export default function BlockRendererClient({content,}: { readonly content: BlocksContent; }) {
    if (!content) return null;
    // @ts-ignore
    if (content[0].children[0].text === "") return null;

    return (
        <BlocksRenderer
            content={content}
        />
    );
}