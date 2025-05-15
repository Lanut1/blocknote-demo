import type { AnyWidget, ListWidget } from '../types/widget.types';
import { parseInlineContent } from './processInlineToBlocknote.utils';

export function transformMyWidgetsToBlockNote(
  widgets: AnyWidget[]
): any[] {
  const blocks: any[] = [];

  if (widgets.length === 0 || !Array.isArray(widgets)) {
    console.warn('Received empty input');
    blocks.push({
      type: "paragraph",
      content: [
        {
          "type": "text",
          "text": "",
          "styles": {}
        }
      ]
    });

    return blocks;
  }
  
  for (const widget of widgets) {
    switch (widget.widget_type) {
      case 'TEXT_TITLE':
        const level = parseInt(widget.title_level.substring(1)) as 1 | 2 | 3 | 4;

        if (level < 4) {
          blocks.push({
            type: 'heading',
            props: {
              level: level
            },
            content: parseInlineContent(widget.title),
          });
        } else {
          blocks.push({
            type: 'customHeading',
            props: {},
            content: parseInlineContent(widget.title),
          });
        }

        break;
        
      case 'TEXT_PARAGRAPH':
        blocks.push({
          type: 'paragraph',
          content: parseInlineContent(widget.text),
        });
        break;
        
      case 'LIST':
        const listWidget = widget as ListWidget;
        for (const item of listWidget.items) {
          blocks.push({
            type: listWidget.list_type === 'ORDERED' ? 'numberedListItem' : 'bulletListItem',
            content: parseInlineContent(item.text),
          });
        }
        break;
        
      case 'RESOURCE_REFERENCE':
        blocks.push({
          type: 'resourceReference',
          props: {
            resource_id: widget.resource_id,
            rich_widget_type: widget.rich_widget_type,
            resource_subtype: widget.resource_subtype,
            show_author: widget.show_author,
            show_description: widget.show_description,
          },
        });
        break;
        
      case 'TOPIC_REFERENCE':
        blocks.push({
          type: 'topicReference',
          props: {
            ref_topic_id: widget.ref_topic_id,
          },
        });
        break;
        
      case 'IMAGE':
        blocks.push({
          type: 'imageWidget',
          props: {
            image_url: widget.image_url,
            description: widget.description,
            url: widget.url,
          },
        });
        break;
        
      case 'STRUCT_COLUMNS':
        const leftBlocks = transformMyWidgetsToBlockNote(widget.left_column);
        const rightBlocks = transformMyWidgetsToBlockNote(widget.right_column);
        
        blocks.push({
          type: 'columnList',
          children: [
            {
              type: 'column',
              children: leftBlocks,
            },
            {
              type: 'column',
              children: rightBlocks,
            },
          ],
        });
        break;
        
      default:
        console.warn('Unhandled widget type');
        break;
    }
  }
  
  return blocks;
}
