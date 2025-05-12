export interface TextTitleWidget {
  widget_type: "TEXT_TITLE";
  title_level: "H1" | "H2" | "H3" | "H4" | "H5" | "H6";
  title: string;
}

export interface TextParagraphWidget {
  widget_type: "TEXT_PARAGRAPH";
  text: string;
}

export interface ListWidget {
  widget_type: "LIST";
  list_type: "ORDERED" | "UNORDERED"; 
  items: TextParagraphWidget[];
}

export type AnyWidget = TextTitleWidget | TextParagraphWidget | ListWidget
