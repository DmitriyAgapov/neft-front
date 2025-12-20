import {
    BlocksRenderer,
    type BlocksContent,
} from "@strapi/blocks-react-renderer";

export default function BlockRendererClient({content,}: { readonly content: BlocksContent; }) {
	console.log(content);
    if (!content) return null;
    // @ts-ignore
    if (content[0].children[0].text === "" && content.length === 0) return null;

    return (
        <BlocksRenderer
            content={content}
        />
    );
}
