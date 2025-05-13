import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import { BlockNoteSchema, defaultBlockSpecs, filterSuggestionItems, insertOrUpdateBlock } from "@blocknote/core";
import "@blocknote/mantine/style.css";
import { getDefaultReactSlashMenuItems, SuggestionMenuController, useCreateBlockNote } from "@blocknote/react";
import styled from "@emotion/styled";
import { transformBlockNoteToMyWidgets } from "./utils/convertToWidgets.utils";
import { ResourceReference } from "./components/ResourceReference";
import { MdWidgets } from "react-icons/md";

const ButtonStyled = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

const API_BASE_URL = 'http://localhost:3001/api';
const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    resourceReference: ResourceReference,
  },
});

type CustomSchema = typeof schema;
export type CustomBlock = CustomSchema["Block"];

export default function App() {
  const editor = useCreateBlockNote({schema});

  const insertResourceReferenceItem = (editor: typeof schema.BlockNoteEditor) => ({
    title: "Resource Reference",
    subtext: "Insert a resource widget block",
    onItemClick: () =>
      insertOrUpdateBlock(editor, {
        type: "resourceReference",
        props: {
          resource_id: "",
          widget_type: "RESOURCE_REFERENCE",
          show_author: true,
          show_description: true,
          rich_widget_type: "RESOURCE_SIDE",
          resource_subtype: "SMALL",
        },
      }),
    aliases: ["resource", "reference", "widget"],
    group: "Custom Blocks",
    icon: <MdWidgets size={18} />,
  });

  const handleSave = async () => {
    if (!editor) return;
    const contentJSON = editor.document;
    const widgets = transformBlockNoteToMyWidgets(contentJSON);

    try {
      const response = await fetch(`${API_BASE_URL}/save-content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(widgets),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to save');
    } catch (error: any) {
      console.error('Error saving content:', error);
    }
  };

  return (
    <>
      <ButtonStyled onClick={handleSave}>Get JSON</ButtonStyled>
      <BlockNoteView editor={editor} slashMenu={false}>
        <SuggestionMenuController
          triggerCharacter="/"
          getItems={async (query) => {
            const defaultItems = getDefaultReactSlashMenuItems(editor);
            const customItem = insertResourceReferenceItem(editor);

            const lastBasicBlockIndex = defaultItems.findLastIndex((item) => item.group === "Basic blocks");
            defaultItems.splice(lastBasicBlockIndex + 1, 0, customItem);

            return filterSuggestionItems(defaultItems, query);
          }}
        />
      </BlockNoteView>

    </>
  );
}
 