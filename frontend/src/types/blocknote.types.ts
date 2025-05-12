import {
  defaultInlineContentSchema,
  defaultStyleSchema,
  type InlineContent,
} from "@blocknote/core";

export type BlockNoteInlineContent = InlineContent<typeof defaultInlineContentSchema, typeof defaultStyleSchema>;
