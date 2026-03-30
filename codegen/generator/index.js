/**
 * React + Tailwind Code Generator
 * Converts parsed .pen JSON data into React components with Tailwind CSS
 */

import { generateComponent } from './component-generator.js';
import { generateStyles } from './style-generator.js';
import { generateLayout } from './layout-generator.js';
import { generateResponsive } from './responsive-generator.js';

/**
 * Main generator function
 * @param {Object} penData - Parsed .pen JSON data
 * @param {Object} options - Generation options
 * @returns {Object} Generated code and metadata
 */
export function generate(penData, options = {}) {
  const { outputDir = './src/components', componentName = 'GeneratedComponent' } = options;
  
  // Generate React component from Frame data
  const componentCode = generateComponent(penData, componentName);
  
  // Generate Tailwind styles
  const styles = generateStyles(penData);
  
  // Generate layout structure
  const layout = generateLayout(penData);
  
  // Generate responsive breakpoints
  const responsive = generateResponsive(penData);
  
  return {
    componentCode,
    styles,
    layout,
    responsive,
    metadata: {
      componentName,
      outputDir,
      generatedAt: new Date().toISOString(),
      sourceName: penData.children?.[0]?.name || 'Unknown',
    },
  };
}

/**
 * Generate multiple components from a .pen file
 * @param {Object} penData - Parsed .pen JSON data
 * @returns {Array} Array of generated component objects
 */
export function generateAll(penData) {
  const components = [];
  
  if (penData.children && Array.isArray(penData.children)) {
    penData.children.forEach((frame, index) => {
      if (frame.type === 'frame' && frame.name) {
        const componentName = frame.name.replace(/\s+/g, '') + 'Component';
        components.push({
          name: frame.name,
          componentName,
          code: generateComponent({ ...penData, children: [frame] }, componentName),
        });
      }
    });
  }
  
  return components;
}

export { generateComponent } from './component-generator.js';
export { generateStyles } from './style-generator.js';
export { generateLayout } from './layout-generator.js';
export { generateResponsive } from './responsive-generator.js';
