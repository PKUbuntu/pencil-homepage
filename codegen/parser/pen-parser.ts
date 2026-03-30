/**
 * .pen File Parser
 * 
 * Parses Pencil design files (.pen) into structured data.
 * Supports: Frame, Rectangle, Circle, Line, Text elements
 */

// Type definitions for .pen file structure
export interface PenFile {
  version: string;
  themes?: Record<string, string[]>;
  variables?: Record<string, VariableDefinition>;
  children: PenElement[];
}

export interface VariableDefinition {
  type: string;
  value: VariableValue[];
}

export interface VariableValue {
  value: string;
  theme?: Record<string, string>;
}

export type PenElementType = 'frame' | 'rectangle' | 'circle' | 'line' | 'text' | 'color';

export interface BaseElement {
  type: PenElementType;
  id?: string;
  name?: string;
}

export interface FrameElement extends BaseElement {
  type: 'frame';
  x?: number;
  y?: number;
  width?: number | string;
  height?: number | string;
  fill?: string;
  stroke?: StrokeDefinition;
  cornerRadius?: number;
  clip?: boolean;
  layout?: 'horizontal' | 'vertical' | 'none';
  padding?: number | number[];
  gap?: number;
  justifyContent?: string;
  alignItems?: string;
  theme?: Record<string, string>;
  children?: PenElement[];
}

export interface RectangleElement extends BaseElement {
  type: 'rectangle';
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: StrokeDefinition;
  cornerRadius?: number;
}

export interface CircleElement extends BaseElement {
  type: 'circle';
  x?: number;
  y?: number;
  radius?: number;
  fill?: string;
  stroke?: StrokeDefinition;
}

export interface LineElement extends BaseElement {
  type: 'line';
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  stroke?: StrokeDefinition;
}

export interface TextElement extends BaseElement {
  type: 'text';
  content: string;
  x?: number;
  y?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string | number;
  fill?: string;
  textAlign?: string;
}

export interface ColorElement extends BaseElement {
  type: 'color';
  value: string;
}

export interface StrokeDefinition {
  fill: string;
  thickness?: number;
}

export type PenElement = FrameElement | RectangleElement | CircleElement | LineElement | TextElement | ColorElement;

export interface ParseResult {
  success: boolean;
  data?: PenFile;
  error?: string;
  elements: {
    frames: FrameElement[];
    rectangles: RectangleElement[];
    circles: CircleElement[];
    lines: LineElement[];
    texts: TextElement[];
    colors: ColorElement[];
  };
  stats: {
    totalElements: number;
    frameCount: number;
    textCount: number;
    shapeCount: number;
  };
}

/**
 * Parse a .pen file content into structured data
 */
export function parsePenFile(content: string): ParseResult {
  const result: ParseResult = {
    success: false,
    elements: {
      frames: [],
      rectangles: [],
      circles: [],
      lines: [],
      texts: [],
      colors: []
    },
    stats: {
      totalElements: 0,
      frameCount: 0,
      textCount: 0,
      shapeCount: 0
    }
  };

  try {
    // Parse JSON
    const penData = JSON.parse(content) as PenFile;
    
    // Validate basic structure
    if (!penData.children || !Array.isArray(penData.children)) {
      result.error = 'Invalid .pen file: missing children array';
      return result;
    }

    result.data = penData;
    result.success = true;

    // Parse all elements recursively
    parseElements(penData.children, result);

    // Calculate stats
    result.stats.frameCount = result.elements.frames.length;
    result.stats.textCount = result.elements.texts.length;
    result.stats.shapeCount = 
      result.elements.rectangles.length + 
      result.elements.circles.length + 
      result.elements.lines.length;
    result.stats.totalElements = 
      result.stats.frameCount + 
      result.stats.textCount + 
      result.stats.shapeCount + 
      result.elements.colors.length;

  } catch (error) {
    result.error = `Parse error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }

  return result;
}

/**
 * Recursively parse elements and categorize them
 */
function parseElements(elements: any[], result: ParseResult): void {
  if (!elements || !Array.isArray(elements)) {
    return;
  }

  for (const element of elements) {
    if (!element || typeof element !== 'object') {
      continue;
    }

    const type = element.type;

    switch (type) {
      case 'frame':
        result.elements.frames.push(parseFrame(element));
        // Recursively parse children
        if (element.children) {
          parseElements(element.children, result);
        }
        break;
      
      case 'rectangle':
        result.elements.rectangles.push(parseRectangle(element));
        break;
      
      case 'circle':
        result.elements.circles.push(parseCircle(element));
        break;
      
      case 'line':
        result.elements.lines.push(parseLine(element));
        break;
      
      case 'text':
        result.elements.texts.push(parseText(element));
        break;
      
      case 'color':
        result.elements.colors.push(parseColor(element));
        break;
      
      default:
        // Unknown element type, skip
        break;
    }
  }
}

/**
 * Parse a Frame element
 */
export function parseFrame(element: any): FrameElement {
  const frame: FrameElement = {
    type: 'frame',
    id: element.id,
    name: element.name,
    x: element.x,
    y: element.y,
    width: element.width,
    height: element.height,
    fill: element.fill,
    stroke: element.stroke ? parseStroke(element.stroke) : undefined,
    cornerRadius: element.cornerRadius,
    clip: element.clip,
    layout: element.layout as FrameElement['layout'],
    padding: element.padding,
    gap: element.gap,
    justifyContent: element.justifyContent,
    alignItems: element.alignItems,
    theme: element.theme,
    children: element.children
  };
  
  return frame;
}

/**
 * Parse a Rectangle element
 */
export function parseRectangle(element: any): RectangleElement {
  return {
    type: 'rectangle',
    id: element.id,
    name: element.name,
    x: element.x,
    y: element.y,
    width: element.width,
    height: element.height,
    fill: element.fill,
    stroke: element.stroke ? parseStroke(element.stroke) : undefined,
    cornerRadius: element.cornerRadius
  };
}

/**
 * Parse a Circle element
 */
export function parseCircle(element: any): CircleElement {
  return {
    type: 'circle',
    id: element.id,
    name: element.name,
    x: element.x,
    y: element.y,
    radius: element.radius,
    fill: element.fill,
    stroke: element.stroke ? parseStroke(element.stroke) : undefined
  };
}

/**
 * Parse a Line element
 */
export function parseLine(element: any): LineElement {
  return {
    type: 'line',
    id: element.id,
    name: element.name,
    x1: element.x1,
    y1: element.y1,
    x2: element.x2,
    y2: element.y2,
    stroke: element.stroke ? parseStroke(element.stroke) : undefined
  };
}

/**
 * Parse a Text element
 */
export function parseText(element: any): TextElement {
  return {
    type: 'text',
    id: element.id,
    name: element.name,
    content: element.content,
    x: element.x,
    y: element.y,
    fontFamily: element.fontFamily,
    fontSize: element.fontSize,
    fontWeight: element.fontWeight,
    fill: element.fill,
    textAlign: element.textAlign
  };
}

/**
 * Parse a Color element
 */
export function parseColor(element: any): ColorElement {
  return {
    type: 'color',
    id: element.id,
    name: element.name,
    value: element.value
  };
}

/**
 * Parse stroke definition
 */
function parseStroke(stroke: any): StrokeDefinition {
  return {
    fill: stroke.fill,
    thickness: stroke.thickness
  };
}

/**
 * Extract style attributes from an element
 */
export function extractStyles(element: PenElement): Record<string, any> {
  const styles: Record<string, any> = {};

  // Position
  if ('x' in element && element.x !== undefined) styles.x = element.x;
  if ('y' in element && element.y !== undefined) styles.y = element.y;
  
  // Dimensions
  if ('width' in element && element.width !== undefined) styles.width = element.width;
  if ('height' in element && element.height !== undefined) styles.height = element.height;
  if ('radius' in element && element.radius !== undefined) styles.radius = element.radius;
  
  // Colors
  if ('fill' in element && element.fill !== undefined) styles.fill = element.fill;
  if ('stroke' in element && element.stroke !== undefined) styles.stroke = element.stroke;
  
  // Border
  if ('cornerRadius' in element && element.cornerRadius !== undefined) {
    styles.cornerRadius = element.cornerRadius;
  }
  
  // Text-specific
  if (element.type === 'text') {
    if ('fontFamily' in element && element.fontFamily) styles.fontFamily = element.fontFamily;
    if ('fontSize' in element && element.fontSize) styles.fontSize = element.fontSize;
    if ('fontWeight' in element && element.fontWeight) styles.fontWeight = element.fontWeight;
    if ('textAlign' in element && element.textAlign) styles.textAlign = element.textAlign;
  }
  
  // Layout (frames only)
  if (element.type === 'frame') {
    if ('layout' in element && element.layout) styles.layout = element.layout;
    if ('padding' in element && element.padding !== undefined) styles.padding = element.padding;
    if ('gap' in element && element.gap !== undefined) styles.gap = element.gap;
    if ('justifyContent' in element && element.justifyContent) styles.justifyContent = element.justifyContent;
    if ('alignItems' in element && element.alignItems) styles.alignItems = element.alignItems;
  }

  return styles;
}

/**
 * Read and parse a .pen file from disk (Node.js environment)
 */
export async function readPenFile(filePath: string): Promise<PenFile> {
  const fs = await import('fs');
  const content = fs.readFileSync(filePath, 'utf-8');
  const result = parsePenFile(content);
  
  if (!result.success || !result.data) {
    throw new Error(result.error || 'Failed to parse .pen file');
  }
  
  return result.data;
}

/**
 * Convert parsed data to JSON string
 */
export function toJSON(data: PenFile, indent?: number): string {
  return JSON.stringify(data, null, indent ?? 2);
}
