export function parseInlineContent(text: string): Array<{
  type: "text";
  text: string;
  styles: Record<string, any>;
}> {
  return [{ type: "text", text: text, styles: {}}];
}
