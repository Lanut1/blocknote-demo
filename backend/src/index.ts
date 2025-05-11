
import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3001;

app.use(cors());

app.use(express.json({ limit: '10mb' }));

const CONTENT_FILE_PATH = path.join(__dirname, '..', 'editor-content.json');

app.post('/api/save-content', (req: Request, res: Response) => {
  try {
    const content = req.body;

    if (!content) {
      return res.status(400).json({ message: 'No content provided.' });
    }

    fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(content, null, 2), 'utf8');
    console.log('Content saved to:', CONTENT_FILE_PATH);
    res.status(200).json({ message: 'Content saved successfully!' });
  } catch (error: any) {
    console.error('Error saving content:', error.message);
    res.status(500).json({ message: 'Failed to save content.', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`Content will be saved to: ${CONTENT_FILE_PATH}`);
});
