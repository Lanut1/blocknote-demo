import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import styled from "@emotion/styled";

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
  const editor = useCreateBlockNote();

  const handleSave = async () => {
    if (!editor) return;
    const contentJSON = editor.document;
    try {
      const response = await fetch(`${API_BASE_URL}/save-content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contentJSON),
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
      <BlockNoteView editor={editor} />
    </>
  );
}
 