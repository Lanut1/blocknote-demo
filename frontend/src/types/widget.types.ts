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

export interface ResourceReferenceWidget {
  widget_type: "RESOURCE_REFERENCE";
  resource_id: string;
  show_author: boolean;
  show_description: boolean;
  rich_widget_type: string;
  resource_subtype: string;
}

export interface TopicReferenceWidget {
  widget_type: "TOPIC_REFERENCE";
  ref_topic_id: string;
}

export interface ImageWidget {
  widget_type: "IMAGE";
  image_url: string;
  description: string;
  url: string;
}

export interface TwoColumnWidget {
  widget_type: "STRUCT_COLUMNS",
  left_column: AnyWidget[],
  right_column: AnyWidget[]
}

export type AnyWidget =
  TextTitleWidget |
  TextParagraphWidget | 
  ListWidget | 
  ResourceReferenceWidget | 
  TopicReferenceWidget | 
  ImageWidget |
  TwoColumnWidget
  ;
