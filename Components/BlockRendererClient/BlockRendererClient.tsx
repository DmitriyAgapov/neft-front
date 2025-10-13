import {
    BlocksRenderer,
    type BlocksContent,
} from "@strapi/blocks-react-renderer";

export default function BlockRendererClient({content,}: { readonly content: BlocksContent; }) {
    if (!content) return null;
    if (content[0].children[0].text === "") return null;
    console.log(content, 'content')
    return (
        <BlocksRenderer
            content={content}
        />
    );
}