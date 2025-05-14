import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import { ResourceReference } from "../components/ResourceReference";
import { TopicReference } from "../components/TopicReference";
import { ImageWidget } from "../components/ImageComponent";
import { ColumnBlock, ColumnListBlock} from "@blocknote/xl-multi-column";
import { CustomHeadingBlock } from "../components/ExtendedHeadings";

export const schema = BlockNoteSchema.create({
  blockSpecs: {
    paragraph: defaultBlockSpecs.paragraph,
    heading: defaultBlockSpecs.heading,
    customHeading: CustomHeadingBlock,
    bulletListItem: defaultBlockSpecs.bulletListItem,
    numberedListItem: defaultBlockSpecs.numberedListItem,
    columnList: ColumnListBlock,
    column: ColumnBlock,
    resourceReference: ResourceReference,
    topicReference: TopicReference,
    imageWidget: ImageWidget
  },
});

export type CustomSchema = typeof schema;
export type CustomBlock = CustomSchema["Block"];
