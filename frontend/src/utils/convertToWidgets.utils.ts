import { processInlineContent } from "./processInline.utils";
import type { AnyWidget, TextParagraphWidget, TextTitleWidget } from "../types/widget.types";
import type { CustomBlock } from "../App";

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
        myWidgets.push({
          widget_type: "TEXT_TITLE",
          title_level: `H${block.props.level || 1}` as TextTitleWidget["title_level"],
          title: processInlineContent(block.content || []),
        });
        break;

      case "paragraph":
        myWidgets.push({
          widget_type: "TEXT_PARAGRAPH",
          text: processInlineContent(block.content || []),
        });
        break;

      case "bulletListItem":
        if (currentListType === "ORDERED") {
          flushList();
        }

        currentListType = "UNORDERED";
        currentListItems.push({
          widget_type: "TEXT_PARAGRAPH",
          text: processInlineContent(block.content || []),
        });
        break;

      case "numberedListItem":
        if (currentListType === "UNORDERED") {
          flushList();
        }

        currentListType = "ORDERED";
        currentListItems.push({
          widget_type: "TEXT_PARAGRAPH",
          text: processInlineContent(block.content || []),
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

      default:
        console.warn(`Unhandled BlockNote block type: ${block.type}`);
        break;
    }
  }

  flushList();

  return myWidgets;
}
