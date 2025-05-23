import { processInlineContent } from "./processInlineToWidgets.utils";
import type { AnyWidget, TextParagraphWidget, TextTitleWidget } from "../types/widget.types";
import type { CustomBlock } from "../editor/editorSchema";

export function transformBlockNoteToMyWidgets(
  bnDocument: CustomBlock[]
): AnyWidget[] {
  const myWidgets: AnyWidget[] = [];
  let currentListItems: TextParagraphWidget[] = [];
  let currentListType: "ORDERED" | "UNORDERED" | null = null;

  function flushList() {
    if (currentListItems.length > 0 && currentListType) {
      myWidgets.push({
        widget_type: "LIST",
        list_type: currentListType,
        items: [...currentListItems],
      });

      currentListItems = [];
      currentListType = null;
    }
  }
  
  for (const block of bnDocument) {
    if (block.type !== "bulletListItem" && block.type !== "numberedListItem" && currentListType) {
      flushList();
    }

    switch (block.type) {
      case "heading":
        const title = processInlineContent(block.content || []);
        if (!title) break;

        myWidgets.push({
          widget_type: "TEXT_TITLE",
          title_level: `H${block.props.level || 1}` as TextTitleWidget["title_level"],
          title
        });
        break;
      
      case "customHeading":
        const customTitle = processInlineContent(block.content || []);
        if (!customTitle) break;

        myWidgets.push({
          widget_type: "TEXT_TITLE",
          title_level: "H4" as TextTitleWidget["title_level"],
          title: customTitle,
        });
        break;

      case "paragraph":
        const text = processInlineContent(block.content || []);
        if (!text) break;

        myWidgets.push({
          widget_type: "TEXT_PARAGRAPH",
          text,
        });
        break;

      case "bulletListItem":
        if (currentListType === "ORDERED") {
          flushList();
        }

        currentListType = "UNORDERED";
        const bulletList = processInlineContent(block.content || []);
        if (!bulletList) break;

        currentListItems.push({
          widget_type: "TEXT_PARAGRAPH",
          text: bulletList,
        });
        break;

      case "numberedListItem":
        if (currentListType === "UNORDERED") {
          flushList();
        }

        currentListType = "ORDERED";
        const numberedList = processInlineContent(block.content || []);
        if (!numberedList) break;

        currentListItems.push({
          widget_type: "TEXT_PARAGRAPH",
          text: numberedList,
        });
        break;
      
      case "resourceReference":
        myWidgets.push({
          widget_type: "RESOURCE_REFERENCE",
          resource_id: block.props.resource_id,
          rich_widget_type: block.props.rich_widget_type,
          resource_subtype: block.props.resource_subtype,
          show_author: block.props.show_author,
          show_description: block.props.show_description,
        });
        break;

      case "topicReference":
        myWidgets.push({
          widget_type: "TOPIC_REFERENCE",
          ref_topic_id: block.props.ref_topic_id,
        });
        break;

      case "imageWidget":
        myWidgets.push({
          widget_type: "IMAGE",
          image_url: block.props.image_url,
          description: block.props.description,
          url: block.props.url,
        });
        break;
      
      case "columnList":
        const columns = block.children || [];
        const leftColumn = columns[0]?.children || [];
        const rightColumn = columns[1]?.children || [];

        myWidgets.push({
          widget_type: "STRUCT_COLUMNS",
          left_column: transformBlockNoteToMyWidgets(leftColumn),
          right_column: transformBlockNoteToMyWidgets(rightColumn),
        });
        break;

      default:
        console.warn('Unhandled BlockNote block type');
        break;
    }
  }

  flushList();

  return myWidgets;
}
