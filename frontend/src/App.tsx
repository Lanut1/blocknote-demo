import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import { filterSuggestionItems} from "@blocknote/core";
import "@blocknote/mantine/style.css";
import { getDefaultReactSlashMenuItems, SuggestionMenuController, useCreateBlockNote } from "@blocknote/react";
import styled from "@emotion/styled";
import { transformBlockNoteToMyWidgets } from "./utils/convertToWidgets.utils";
import { schema } from "./editor/editorSchema";
import { createSlashMenuItems } from "./editor/menuItems";
import { saveAs } from 'file-saver';
import { transformMyWidgetsToBlockNote } from "./utils/convertToBlocknote.utils";
import type { ChangeEvent } from "react";
import type { AnyWidget } from "./types/widget.types";

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

const LabelStyled = styled.label`
  background-color:rgba(243, 4, 0, 0.75);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    background-color:rgb(181, 6, 0);
  }
`;

export default function App() {
  const editor = useCreateBlockNote({
    schema
  });

  const handleDownload = () => {
    if (!editor) return;
    const contentJSON = editor.document;

    const widgets = transformBlockNoteToMyWidgets(contentJSON);
    
    const jsonContent = JSON.stringify(widgets, null, 2);
    
    const blob = new Blob([jsonContent], { type: 'application/json' });
 
    saveAs(blob, 'editor-content.json');
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
    try {
      const result = e.target?.result;
      if (typeof result !== 'string') {
        throw new Error('File content is not a string');
      }

      const json = JSON.parse(result);
      let widgets: AnyWidget[];

      if (Array.isArray(json)) {
        widgets = json;
      } else if (json && typeof json === 'object' && Array.isArray(json.widgets)) {
        widgets = json.widgets;
      } else {
        throw new Error('Invalid widgets structure');
      }

      const blocks = transformMyWidgetsToBlockNote(widgets);
      editor.replaceBlocks(editor.document.map(block => block.id), blocks);
    } catch (error) {
      console.error('Error processing uploaded file:', error);
      alert("Failed to parse the uploaded file. Please make sure it's a valid JSON file with a proper widgets structure.");
    }
  };

    reader.readAsText(file);
  };

  return (
    <>
      <ButtonStyled onClick={handleDownload}>Get JSON</ButtonStyled>
      <input 
        type="file" 
        id="file-upload" 
        accept=".json"
        style={{ display: 'none' }} 
        onChange={handleFileUpload} 
      />
      <LabelStyled htmlFor="file-upload">
          Upload JSON
      </LabelStyled>
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
 