import type { BlockNoteInlineContent } from "../types/blocknote.types";


export function processInlineContent(bnInlineContent: BlockNoteInlineContent[]): string {
  let resultText = "";

  for (const item of bnInlineContent) {
    let widgetText;

    if (item.type === "text") {
      widgetText = item.text;

      if (item.styles?.bold) {
        widgetText = `**${widgetText}**`;
      }

      if (item.styles?.italic) {
        widgetText = `*${widgetText}*`;
      }
      
    } else if (item.type === "link") {
      widgetText = `[${item.content[0].text}](${item.href})`;
    }
    
    resultText += widgetText;;
  }

  return resultText;
}
