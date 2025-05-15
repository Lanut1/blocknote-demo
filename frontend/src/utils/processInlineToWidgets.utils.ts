import type { BlockNoteInlineContent } from "../types/blocknote.types";

export function processInlineContent(bnInlineContent: BlockNoteInlineContent[]): string | null {
  let resultText = "";

  for (const item of bnInlineContent) {
    let widgetText;

    if (item.type === "text") {
      widgetText = item.text ?? "";

      if (!widgetText.trim()) continue;

      if (item.styles?.bold) {
        widgetText = `**${widgetText}**`;
      }

      if (item.styles?.italic) {
        widgetText = `*${widgetText}*`;
      }
      
    } else if (item.type === "link") {
      const linkText = item.content?.[0]?.text ?? "";
      const linkURL = item.href ?? "";
      if (!linkText.trim() || !linkURL.trim()) continue;

      widgetText = `[${linkText}](${linkURL})`;
    }
    
    resultText += widgetText;;
  }

  return resultText.trim() === "" ? null : resultText;
}
