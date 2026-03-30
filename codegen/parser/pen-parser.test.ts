/**
 * Unit Tests for .pen File Parser
 */

import { describe, it, expect } from 'vitest';
import { parsePenFile, extractStyles, parseFrame, parseText, parseRectangle, parseCircle, parseLine, parseColor } from './pen-parser';

describe('PenParser', () => {
  describe('parsePenFile', () => {
    it('should parse a minimal valid .pen file', () => {
      const content = JSON.stringify({
        version: '2.6',
        children: []
      });

      const result = parsePenFile(content);

      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
      expect(result.data).toBeDefined();
      expect(result.data?.version).toBe('2.6');
      expect(result.stats.totalElements).toBe(0);
    });

    it('should parse a .pen file with Frame elements', () => {
      const content = JSON.stringify({
        version: '2.6',
        children: [
          {
            type: 'frame',
            id: 'frame1',
            name: 'Main Frame',
            x: 0,
            y: 0,
            width: 800,
            height: 600,
            fill: '#FFFFFF',
            layout: 'vertical'
          }
        ]
      });

      const result = parsePenFile(content);

      expect(result.success).toBe(true);
      expect(result.elements.frames).toHaveLength(1);
      expect(result.elements.frames[0].id).toBe('frame1');
      expect(result.elements.frames[0].name).toBe('Main Frame');
      expect(result.elements.frames[0].width).toBe(800);
      expect(result.elements.frames[0].height).toBe(600);
      expect(result.stats.frameCount).toBe(1);
    });

    it('should parse nested Frame elements', () => {
      const content = JSON.stringify({
        version: '2.6',
        children: [
          {
            type: 'frame',
            id: 'parent',
            name: 'Parent',
            children: [
              {
                type: 'frame',
                id: 'child1',
                name: 'Child 1'
              },
              {
                type: 'frame',
                id: 'child2',
                name: 'Child 2'
              }
            ]
          }
        ]
      });

      const result = parsePenFile(content);

      expect(result.success).toBe(true);
      expect(result.elements.frames).toHaveLength(3);
      expect(result.stats.frameCount).toBe(3);
    });

    it('should parse Text elements', () => {
      const content = JSON.stringify({
        version: '2.6',
        children: [
          {
            type: 'text',
            id: 'text1',
            name: 'Title',
            content: 'Hello World',
            fontFamily: 'Inter',
            fontSize: 24,
            fontWeight: 'bold',
            fill: '#000000'
          }
        ]
      });

      const result = parsePenFile(content);

      expect(result.success).toBe(true);
      expect(result.elements.texts).toHaveLength(1);
      expect(result.elements.texts[0].content).toBe('Hello World');
      expect(result.elements.texts[0].fontFamily).toBe('Inter');
      expect(result.elements.texts[0].fontSize).toBe(24);
      expect(result.stats.textCount).toBe(1);
    });

    it('should parse Rectangle elements', () => {
      const content = JSON.stringify({
        version: '2.6',
        children: [
          {
            type: 'rectangle',
            id: 'rect1',
            name: 'Box',
            x: 10,
            y: 20,
            width: 100,
            height: 50,
            fill: '#FF0000',
            cornerRadius: 5
          }
        ]
      });

      const result = parsePenFile(content);

      expect(result.success).toBe(true);
      expect(result.elements.rectangles).toHaveLength(1);
      expect(result.elements.rectangles[0].width).toBe(100);
      expect(result.elements.rectangles[0].height).toBe(50);
      expect(result.elements.rectangles[0].cornerRadius).toBe(5);
    });

    it('should parse Circle elements', () => {
      const content = JSON.stringify({
        version: '2.6',
        children: [
          {
            type: 'circle',
            id: 'circle1',
            name: 'Dot',
            x: 50,
            y: 50,
            radius: 25,
            fill: '#00FF00'
          }
        ]
      });

      const result = parsePenFile(content);

      expect(result.success).toBe(true);
      expect(result.elements.circles).toHaveLength(1);
      expect(result.elements.circles[0].radius).toBe(25);
    });

    it('should parse Line elements', () => {
      const content = JSON.stringify({
        version: '2.6',
        children: [
          {
            type: 'line',
            id: 'line1',
            name: 'Divider',
            x1: 0,
            y1: 100,
            x2: 200,
            y2: 100,
            stroke: {
              fill: '#000000',
              thickness: 2
            }
          }
        ]
      });

      const result = parsePenFile(content);

      expect(result.success).toBe(true);
      expect(result.elements.lines).toHaveLength(1);
      expect(result.elements.lines[0].x1).toBe(0);
      expect(result.elements.lines[0].y1).toBe(100);
      expect(result.elements.lines[0].x2).toBe(200);
      expect(result.elements.lines[0].stroke?.thickness).toBe(2);
    });

    it('should parse Color elements', () => {
      const content = JSON.stringify({
        version: '2.6',
        children: [
          {
            type: 'color',
            id: 'color1',
            name: 'Primary',
            value: '#FF5500'
          }
        ]
      });

      const result = parsePenFile(content);

      expect(result.success).toBe(true);
      expect(result.elements.colors).toHaveLength(1);
      expect(result.elements.colors[0].value).toBe('#FF5500');
      expect(result.elements.colors[0].name).toBe('Primary');
    });

    it('should parse mixed element types', () => {
      const content = JSON.stringify({
        version: '2.6',
        children: [
          { type: 'frame', id: 'f1', name: 'Frame' },
          { type: 'text', id: 't1', content: 'Text' },
          { type: 'rectangle', id: 'r1' },
          { type: 'circle', id: 'c1' },
          { type: 'line', id: 'l1' }
        ]
      });

      const result = parsePenFile(content);

      expect(result.success).toBe(true);
      expect(result.elements.frames).toHaveLength(1);
      expect(result.elements.texts).toHaveLength(1);
      expect(result.elements.rectangles).toHaveLength(1);
      expect(result.elements.circles).toHaveLength(1);
      expect(result.elements.lines).toHaveLength(1);
      expect(result.stats.totalElements).toBe(5);
    });

    it('should handle invalid JSON', () => {
      const content = '{ invalid json }';

      const result = parsePenFile(content);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('Parse error');
    });

    it('should handle missing children array', () => {
      const content = JSON.stringify({
        version: '2.6'
      });

      const result = parsePenFile(content);

      expect(result.success).toBe(false);
      expect(result.error).toContain('missing children array');
    });

    it('should parse stroke definitions', () => {
      const content = JSON.stringify({
        version: '2.6',
        children: [
          {
            type: 'frame',
            id: 'f1',
            stroke: {
              fill: '#FF0000',
              thickness: 3
            }
          }
        ]
      });

      const result = parsePenFile(content);

      expect(result.success).toBe(true);
      expect(result.elements.frames[0].stroke).toBeDefined();
      expect(result.elements.frames[0].stroke?.fill).toBe('#FF0000');
      expect(result.elements.frames[0].stroke?.thickness).toBe(3);
    });

    it('should parse theme variables', () => {
      const content = JSON.stringify({
        version: '2.6',
        themes: {
          Mode: ['Light', 'Dark'],
          Accent: ['Blue', 'Red']
        },
        variables: {
          '--background': {
            type: 'color',
            value: [
              { value: '#ffffff' },
              { value: '#000000', theme: { Mode: 'Dark' } }
            ]
          }
        },
        children: []
      });

      const result = parsePenFile(content);

      expect(result.success).toBe(true);
      expect(result.data?.themes).toBeDefined();
      expect(result.data?.variables).toBeDefined();
    });

    it('should parse layout properties', () => {
      const content = JSON.stringify({
        version: '2.6',
        children: [
          {
            type: 'frame',
            id: 'f1',
            layout: 'horizontal',
            padding: [10, 20],
            gap: 16,
            justifyContent: 'space-between',
            alignItems: 'center'
          }
        ]
      });

      const result = parsePenFile(content);

      expect(result.success).toBe(true);
      expect(result.elements.frames[0].layout).toBe('horizontal');
      expect(result.elements.frames[0].padding).toEqual([10, 20]);
      expect(result.elements.frames[0].gap).toBe(16);
      expect(result.elements.frames[0].justifyContent).toBe('space-between');
      expect(result.elements.frames[0].alignItems).toBe('center');
    });
  });

  describe('extractStyles', () => {
    it('should extract position and dimensions from Frame', () => {
      const frame = {
        type: 'frame' as const,
        x: 10,
        y: 20,
        width: 100,
        height: 200
      };

      const styles = extractStyles(frame);

      expect(styles.x).toBe(10);
      expect(styles.y).toBe(20);
      expect(styles.width).toBe(100);
      expect(styles.height).toBe(200);
    });

    it('should extract color and stroke from Rectangle', () => {
      const rect = {
        type: 'rectangle' as const,
        fill: '#FF0000',
        stroke: { fill: '#000000', thickness: 2 },
        cornerRadius: 5
      };

      const styles = extractStyles(rect);

      expect(styles.fill).toBe('#FF0000');
      expect(styles.stroke).toEqual({ fill: '#000000', thickness: 2 });
      expect(styles.cornerRadius).toBe(5);
    });

    it('should extract text-specific styles', () => {
      const text = {
        type: 'text' as const,
        content: 'Hello',
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
      };

      const styles = extractStyles(text);

      expect(styles.fontFamily).toBe('Inter');
      expect(styles.fontSize).toBe(16);
      expect(styles.fontWeight).toBe('bold');
      expect(styles.textAlign).toBe('center');
    });

    it('should extract layout styles from Frame', () => {
      const frame = {
        type: 'frame' as const,
        layout: 'vertical',
        padding: 20,
        gap: 10
      };

      const styles = extractStyles(frame);

      expect(styles.layout).toBe('vertical');
      expect(styles.padding).toBe(20);
      expect(styles.gap).toBe(10);
    });
  });

  describe('parseFrame', () => {
    it('should parse frame with all properties', () => {
      const raw = {
        id: 'f1',
        name: 'Test Frame',
        x: 0,
        y: 0,
        width: 500,
        height: 400,
        fill: '#FFFFFF',
        clip: true,
        layout: 'vertical',
        padding: 20,
        children: []
      };

      const frame = parseFrame(raw);

      expect(frame.type).toBe('frame');
      expect(frame.id).toBe('f1');
      expect(frame.name).toBe('Test Frame');
      expect(frame.width).toBe(500);
      expect(frame.clip).toBe(true);
    });
  });

  describe('parseText', () => {
    it('should parse text with all properties', () => {
      const raw = {
        id: 't1',
        name: 'Heading',
        content: 'Welcome',
        fontFamily: 'Arial',
        fontSize: 32,
        fontWeight: 'bold',
        fill: '#333333'
      };

      const text = parseText(raw);

      expect(text.type).toBe('text');
      expect(text.content).toBe('Welcome');
      expect(text.fontFamily).toBe('Arial');
      expect(text.fontSize).toBe(32);
    });
  });

  describe('parseRectangle', () => {
    it('should parse rectangle with all properties', () => {
      const raw = {
        id: 'r1',
        name: 'Card',
        x: 10,
        y: 10,
        width: 200,
        height: 100,
        fill: '#EEEEEE',
        cornerRadius: 8
      };

      const rect = parseRectangle(raw);

      expect(rect.type).toBe('rectangle');
      expect(rect.width).toBe(200);
      expect(rect.cornerRadius).toBe(8);
    });
  });

  describe('parseCircle', () => {
    it('should parse circle with all properties', () => {
      const raw = {
        id: 'c1',
        name: 'Avatar',
        x: 50,
        y: 50,
        radius: 30,
        fill: '#CCCCCC'
      };

      const circle = parseCircle(raw);

      expect(circle.type).toBe('circle');
      expect(circle.radius).toBe(30);
    });
  });

  describe('parseLine', () => {
    it('should parse line with all properties', () => {
      const raw = {
        id: 'l1',
        name: 'Separator',
        x1: 0,
        y1: 50,
        x2: 300,
        y2: 50,
        stroke: { fill: '#999999', thickness: 1 }
      };

      const line = parseLine(raw);

      expect(line.type).toBe('line');
      expect(line.x2).toBe(300);
      expect(line.stroke?.thickness).toBe(1);
    });
  });

  describe('parseColor', () => {
    it('should parse color element', () => {
      const raw = {
        id: 'c1',
        name: 'Primary Color',
        value: '#FF0000'
      };

      const color = parseColor(raw);

      expect(color.type).toBe('color');
      expect(color.value).toBe('#FF0000');
      expect(color.name).toBe('Primary Color');
    });
  });

  describe('toJSON', () => {
    it('should convert parsed data to JSON string', async () => {
      const { toJSON } = await import('./pen-parser');
      const data = {
        version: '2.6',
        children: [
          { type: 'frame', id: 'f1', name: 'Test' }
        ]
      };

      const json = toJSON(data);

      expect(json).toContain('"version": "2.6"');
      expect(json).toContain('"id": "f1"');
      expect(json).toContain('"name": "Test"');
    });

    it('should use custom indent', async () => {
      const { toJSON } = await import('./pen-parser');
      const data = { version: '2.6', children: [] };

      const json = toJSON(data, 4);

      expect(json).toContain('    "version"');
    });
  });

  describe('readPenFile', () => {
    it('should read and parse a .pen file from disk', async () => {
      const { readPenFile } = await import('./pen-parser');
      const fs = await import('fs');
      const path = await import('path');

      // Create a temporary test file
      const testFile = path.join(process.cwd(), 'codegen/parser/output/test-temp.pen');
      const testData = { version: '2.6', children: [{ type: 'frame', id: 'test' }] };
      fs.writeFileSync(testFile, JSON.stringify(testData), 'utf-8');

      try {
        const result = await readPenFile(testFile);

        expect(result.version).toBe('2.6');
        expect(result.children).toHaveLength(1);
        expect(result.children[0].id).toBe('test');
      } finally {
        // Clean up
        fs.unlinkSync(testFile);
      }
    });

    it('should throw error for invalid .pen file', async () => {
      const { readPenFile } = await import('./pen-parser');
      const fs = await import('fs');
      const path = await import('path');

      const testFile = path.join(process.cwd(), 'codegen/parser/output/test-invalid.pen');
      fs.writeFileSync(testFile, '{ invalid json }', 'utf-8');

      try {
        await expect(readPenFile(testFile)).rejects.toThrow('Parse error');
      } finally {
        fs.unlinkSync(testFile);
      }
    });
  });
});
