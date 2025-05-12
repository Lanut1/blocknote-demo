import type { Block } from "@blocknote/core";
import { processInlineContent } from "./processInline.utils";
import type { AnyWidget, TextParagraphWidget, TextTitleWidget } from "../types/widget.types";

export function transformBlockNoteToMyWidgets(
  bnDocument: Block[]
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

      default:
        console.warn(`Unhandled BlockNote block type: ${block.type}`);
        break;
    }
  }

  flushList();

  return myWidgets;
}
