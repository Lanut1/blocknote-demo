import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import { filterSuggestionItems} from "@blocknote/core";
import "@blocknote/mantine/style.css";
import { getDefaultReactSlashMenuItems, SuggestionMenuController, useCreateBlockNote } from "@blocknote/react";
import styled from "@emotion/styled";
import { transformBlockNoteToMyWidgets } from "./utils/convertToWidgets.utils";
import { schema } from "./editor/editorSchema";
import { createSlashMenuItems } from "./editor/menuItems";

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

export default function App() {
  const editor = useCreateBlockNote({schema});

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
      <BlockNoteView editor={editor} slashMenu={false} emojiPicker={false}>
        <SuggestionMenuController
          triggerCharacter="/"
          getItems={async (query) => {
            const defaultItems = getDefaultReactSlashMenuItems(editor);
            const customItems = createSlashMenuItems(editor);
            const filteredItems = defaultItems.filter(item => item.group !== "Others");

            const lastBasicBlockIndex = filteredItems.findLastIndex((item) => item.group === "Basic blocks");
            filteredItems.splice(lastBasicBlockIndex + 1, 0, ...customItems);

            return filterSuggestionItems(filteredItems, query);
          }}
        />
      </BlockNoteView>
    </>
  );
}
 