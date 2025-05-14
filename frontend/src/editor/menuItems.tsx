import { insertOrUpdateBlock } from "@blocknote/core";
import { MdWidgets } from "react-icons/md";
import { type CustomSchema } from "./editorSchema";

export const createSlashMenuItems = (editor: CustomSchema["BlockNoteEditor"]) => [
  {
    title: "Heading 4",
    subtext: "Insert heading level 4",
    onItemClick: () =>
      insertOrUpdateBlock(editor, {
        type: "customHeading",
        props: {
          level: 4,
        },
      }),
    aliases: ["h4", "heading4"],
    group: "Custom Headings",
    icon: <MdWidgets size={18} />,
  },
  {
    title: "Heading 5",
    subtext: "Insert heading level 5",
    onItemClick: () =>
      insertOrUpdateBlock(editor, {
        type: "customHeading",
        props: {
          level: 5,
        },
      }),
    aliases: ["h5", "heading5"],
    group: "Custom Headings",
    icon: <MdWidgets size={18} />,
  },
  {
    title: "Heading 6",
    subtext: "Insert heading level 6",
    onItemClick: () =>
      insertOrUpdateBlock(editor, {
        type: "customHeading",
        props: {
          level: 6,
          
        },
      }),
    aliases: ["h6", "heading6"],
    group: "Custom Headings",
    icon: <MdWidgets size={18} />,
  },
  {
    title: "Two Column Layout",
    subtext: "Insert side-by-side columns",
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: "columnList",
        children: [
          {
            type: "column",
            children: [
              {
                type: "paragraph",
                props: {
                  backgroundColor: "default",
                  textColor: "default",
                  textAlignment: "left"
                },
                content: [{ type: "text", text: "Left Column Content", styles: {} }]
              },
            ],
          },
          {
            type: "column",
            children: [
              {
                type: "paragraph",
                props: {
                  backgroundColor: "default",
                  textColor: "default",
                  textAlignment: "left"
                },
                content: [{ type: "text", text: "Right Column Content", styles: {} }]
              },
            ],
          },
        ],
      }
      )
    },
    aliases: ["columns", "layout"],
    group: "Custom Blocks",
    icon: <MdWidgets size={18} />,
  },
  {
    title: "Resource Reference",
    subtext: "Insert a resource widget block",
    onItemClick: () =>
      insertOrUpdateBlock(editor, {
        type: "resourceReference",
        props: {
          widget_type: "RESOURCE_REFERENCE",
          resource_id: "",
          rich_widget_type: "RESOURCE_SIDE",
          resource_subtype: "SMALL",
          show_author: true,
          show_description: true,
        },
      }),
    aliases: ["resource", "widget"],
    group: "Custom Blocks",
    icon: <MdWidgets size={18} />,
  },
  {
    title: "Topic Reference",
    subtext: "Insert a topic widget block",
    onItemClick: () =>
      insertOrUpdateBlock(editor, {
        type: "topicReference",
        props: {
          widget_type: "TOPIC_REFERENCE",
          ref_topic_id: "",
        },
      }),
    aliases: ["topic", "widget"],
    group: "Custom Blocks",
    icon: <MdWidgets size={18} />,
  },
  {
    title: "Image Widget",
    subtext: "Insert an image widget block",
    onItemClick: () =>
      insertOrUpdateBlock(editor, {
        type: "imageWidget",
        props: {
          widget_type: "IMAGE",
          image_url: "",
          description: "",
          url: "",
        },
      }),
    aliases: ["image", "widget"],
    group: "Custom Blocks",
    icon: <MdWidgets size={18} />,
  },
];
