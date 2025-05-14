import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import { ResourceReference } from "../components/ResourceReference";
import { TopicReference } from "../components/TopicReference";
import { imageWidget } from "../components/ImageComponent";
import { ColumnBlock, ColumnListBlock} from "@blocknote/xl-multi-column";

export const schema = BlockNoteSchema.create({
  blockSpecs: {
    paragraph: defaultBlockSpecs.paragraph,
    heading: defaultBlockSpecs.heading,
    bulletListItem: defaultBlockSpecs.bulletListItem,
    numberedListItem: defaultBlockSpecs.numberedListItem,
    columnList: ColumnListBlock,
    column: ColumnBlock,
    resourceReference: ResourceReference,
    topicReference: TopicReference,
    imageWidget: imageWidget
  },
});

export type CustomSchema = typeof schema;
export type CustomBlock = CustomSchema["Block"];
