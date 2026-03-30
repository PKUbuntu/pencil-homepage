/**
 * Component Generator
 * Converts Frame data to React Component code
 */

import { generateLayout } from './layout-generator.js';
import { generateStyles } from './style-generator.js';

/**
 * Generate a React component from Frame data
 * @param {Object} frameData - Frame JSON data
 * @param {string} componentName - Component name
 * @returns {string} Generated React component code
 */
export function generateComponent(frameData, componentName = 'GeneratedComponent') {
  const mainFrame = frameData.children?.[0] || frameData;
  const children = mainFrame.children || [];
  
  // Generate component children
  const childrenCode = children.map(child => generateChild(child)).join('\n        ');
  
  // Generate component props if needed
  const hasProps = needsProps(frameData);
  const propsSignature = hasProps ? '(props)' : '';
  
  return `import React from 'react';

/**
 * ${componentName}
 * Auto-generated from Pencil design file
 */
export function ${componentName}${propsSignature} {
  return (
    <div className="${generateContainerClasses(mainFrame)}">
      ${childrenCode || '{/* Add content here */}'}
    </div>
  );
}

export default ${componentName};
`;
}

/**
 * Generate JSX for a child element
 * @param {Object} child - Child element data
 * @returns {string} Generated JSX code
 */
function generateChild(child) {
  if (!child || !child.type) {
    return '';
  }
  
  switch (child.type) {
    case 'frame':
      return generateFrameElement(child);
    case 'text':
      return generateTextElement(child);
    case 'rect':
      return generateRectElement(child);
    case 'image':
      return generateImageElement(child);
    case 'ref':
      return generateRefElement(child);
    default:
      return generateFrameElement(child);
  }
}

/**
 * Generate a frame/div element
 * @param {Object} frame - Frame data
 * @returns {string} Generated JSX
 */
function generateFrameElement(frame) {
  const name = frame.name?.replace(/\s+/g, '') || 'Container';
  const classes = generateContainerClasses(frame);
  const children = frame.children?.map(child => generateChild(child)).join('\n          ') || '';
  
  return `<div className="${classes}"${frame.id ? ` /* ${name} */` : ''}>
          ${children}
        </div>`;
}

/**
 * Generate a text/span element
 * @param {Object} text - Text data
 * @returns {string} Generated JSX
 */
function generateTextElement(text) {
  const classes = generateTextClasses(text);
  const content = text.content || '';
  const name = text.name?.replace(/\s+/g, '') || 'Text';
  
  return `<span className="${classes}"${text.id ? ` /* ${name} */` : ''}>${content}</span>`;
}

/**
 * Generate a rect/div element
 * @param {Object} rect - Rect data
 * @returns {string} Generated JSX
 */
function generateRectElement(rect) {
  const classes = generateContainerClasses(rect);
  
  return `<div className="${classes}" />`;
}

/**
 * Generate an image element
 * @param {Object} image - Image data
 * @returns {string} Generated JSX
 */
function generateImageElement(image) {
  const classes = generateContainerClasses(image);
  const src = image.src || image.fill || '/placeholder.png';
  const alt = image.name || image.alt || 'Image';
  
  return `<img src="${src}" alt="${alt}" className="${classes}" />`;
}

/**
 * Generate a reference component
 * @param {Object} ref - Reference data
 * @returns {string} Generated JSX
 */
function generateRefElement(ref) {
  const refName = ref.ref || 'Component';
  const componentName = refName.charAt(0).toUpperCase() + refName.slice(1);
  
  return `<${componentName} />`;
}

/**
 * Generate container classes from frame data
 * @param {Object} frame - Frame data
 * @returns {string} Tailwind classes
 */
export function generateContainerClasses(frame) {
  const classes = [];
  
  // Layout
  if (frame.layout === 'horizontal') {
    classes.push('flex');
    classes.push('flex-row');
  } else if (frame.layout === 'vertical') {
    classes.push('flex');
    classes.push('flex-col');
  }
  
  // Spacing
  if (frame.padding) {
    const padding = Array.isArray(frame.padding) ? frame.padding : [frame.padding];
    if (padding.length >= 2) {
      classes.push(`py-${padding[0] / 4 || 0}`);
      classes.push(`px-${padding[1] / 4 || 0}`);
    }
  }
  
  if (frame.gap) {
    classes.push(`gap-${frame.gap / 4 || 0}`);
  }
  
  // Alignment
  if (frame.alignItems === 'center') {
    classes.push('items-center');
  } else if (frame.alignItems === 'start') {
    classes.push('items-start');
  } else if (frame.alignItems === 'end') {
    classes.push('items-end');
  }
  
  if (frame.justifyContent === 'center') {
    classes.push('justify-center');
  } else if (frame.justifyContent === 'space_between') {
    classes.push('justify-between');
  } else if (frame.justifyContent === 'space_around') {
    classes.push('justify-around');
  }
  
  // Size
  if (frame.width === 'fill_container') {
    classes.push('w-full');
  } else if (frame.width && typeof frame.width === 'number') {
    classes.push(`w-[${frame.width}px]`);
  }
  
  if (frame.height === 'fill_container' || frame.height === 'fit_content') {
    classes.push('h-full');
  } else if (frame.height && typeof frame.height === 'number') {
    classes.push(`h-[${frame.height}px]`);
  }
  
  // Background
  if (frame.fill && !frame.fill.startsWith('$')) {
    const bgClass = generateBgClass(frame.fill);
    if (bgClass) classes.push(bgClass);
  }
  
  // Border
  if (frame.stroke) {
    classes.push('border');
    if (frame.stroke.thickness) {
      classes.push(`border-${frame.stroke.thickness}`);
    }
  }
  
  // Corner radius
  if (frame.cornerRadius) {
    if (frame.cornerRadius >= 20) {
      classes.push('rounded-full');
    } else if (frame.cornerRadius >= 8) {
      classes.push('rounded-lg');
    } else if (frame.cornerRadius >= 4) {
      classes.push('rounded-md');
    } else {
      classes.push('rounded');
    }
  }
  
  return classes.join(' ') || 'relative';
}

/**
 * Generate text classes from text data
 * @param {Object} text - Text data
 * @returns {string} Tailwind classes
 */
export function generateTextClasses(text) {
  const classes = [];
  
  // Font size
  if (text.fontSize) {
    if (text.fontSize >= 48) {
      classes.push('text-5xl');
    } else if (text.fontSize >= 36) {
      classes.push('text-4xl');
    } else if (text.fontSize >= 30) {
      classes.push('text-3xl');
    } else if (text.fontSize >= 24) {
      classes.push('text-2xl');
    } else if (text.fontSize >= 20) {
      classes.push('text-xl');
    } else if (text.fontSize >= 16) {
      classes.push('text-lg');
    } else if (text.fontSize >= 14) {
      classes.push('text-base');
    } else {
      classes.push('text-sm');
    }
  }
  
  // Font weight
  if (text.fontWeight === 'bold') {
    classes.push('font-bold');
  } else if (text.fontWeight === 'semibold') {
    classes.push('font-semibold');
  } else if (text.fontWeight === 'medium') {
    classes.push('font-medium');
  } else {
    classes.push('font-normal');
  }
  
  // Text color
  if (text.fill && !text.fill.startsWith('$')) {
    classes.push('text-gray-900');
  } else if (text.fill?.includes('--foreground')) {
    classes.push('text-foreground');
  }
  
  return classes.join(' ') || 'text-base';
}

/**
 * Generate background class from color value
 * @param {string} color - Color value
 * @returns {string} Tailwind bg class
 */
function generateBgClass(color) {
  if (!color) return '';
  
  // Common color mappings
  const colorMap = {
    '#ffffff': 'bg-white',
    '#000000': 'bg-black',
    '#f4f4f5': 'bg-gray-100',
    '#e4e4e7': 'bg-gray-200',
    '#71717a': 'bg-gray-500',
    '#18181b': 'bg-gray-900',
    '#09090b': 'bg-gray-950',
  };
  
  return colorMap[color.toLowerCase()] || `bg-[${color}]`;
}

/**
 * Check if component needs props
 * @param {Object} frameData - Frame data
 * @returns {boolean} Whether props are needed
 */
function needsProps(frameData) {
  // Check for dynamic content indicators
  return frameData.children?.some(child => 
    child.type === 'text' && (child.content?.includes('{{') || child.content?.includes('{'))
  ) || false;
}
