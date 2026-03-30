/**
 * Style Generator
 * Converts design styles to Tailwind CSS classes
 */

/**
 * Generate Tailwind classes from style data
 * @param {Object} styleData - Style JSON data
 * @returns {Object} Generated style mappings
 */
export function generateStyles(styleData) {
  const styles = {
    colors: {},
    spacing: {},
    typography: {},
    layout: {},
  };
  
  // Extract variables from .pen data
  if (styleData.variables) {
    Object.entries(styleData.variables).forEach(([name, value]) => {
      const tailwindName = convertVariableName(name);
      
      if (value.type === 'color') {
        const colorValue = extractColorValue(value);
        styles.colors[tailwindName] = colorValue;
      } else if (value.type === 'spacing' || value.type === 'size') {
        styles.spacing[tailwindName] = value.value;
      }
    });
  }
  
  // Extract theme colors
  if (styleData.themes) {
    styles.themes = styleData.themes;
  }
  
  return styles;
}

/**
 * Convert design variable name to Tailwind-compatible name
 * @param {string} name - Variable name
 * @returns {string} Converted name
 */
function convertVariableName(name) {
  return name
    .replace(/^--/, '')
    .replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
}

/**
 * Extract color value from variable
 * @param {Object} value - Variable value object
 * @returns {string} Color value
 */
function extractColorValue(value) {
  if (!value.value) return '#000000';
  
  // Handle theme-specific values
  if (Array.isArray(value.value)) {
    // Return light mode value by default
    const lightValue = value.value.find(v => !v.theme) || value.value[0];
    return lightValue.value || '#000000';
  }
  
  return value.value || '#000000';
}

/**
 * Generate CSS custom properties from design variables
 * @param {Object} variables - Variables object
 * @returns {string} CSS custom properties string
 */
export function generateCSSVariables(variables) {
  if (!variables) return '';
  
  const cssLines = [];
  
  Object.entries(variables).forEach(([name, value]) => {
    if (value.type === 'color') {
      const colorValue = extractColorValue(value);
      cssLines.push(`  ${name}: ${colorValue};`);
    }
  });
  
  return cssLines.join('\n');
}

/**
 * Generate Tailwind config extension for custom colors
 * @param {Object} colors - Colors object
 * @returns {string} Tailwind config extension
 */
export function generateTailwindConfig(colors) {
  const colorEntries = Object.entries(colors)
    .map(([name, value]) => `      '${name}': '${value}'`)
    .join(',\n');
  
  return `
// Add to tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
${colorEntries}
      },
    },
  },
};
`;
}

/**
 * Convert a hex color to Tailwind class
 * @param {string} color - Hex color
 * @returns {string} Tailwind class
 */
export function colorToTailwind(color) {
  if (!color) return '';
  
  const colorMap = {
    '#ffffff': 'bg-white',
    '#000000': 'bg-black',
    '#f4f4f5': 'bg-gray-100',
    '#e4e4e7': 'bg-gray-200',
    '#d4d4d8': 'bg-gray-300',
    '#a1a1aa': 'bg-gray-400',
    '#71717a': 'bg-gray-500',
    '#52525b': 'bg-gray-600',
    '#3f3f46': 'bg-gray-700',
    '#27272a': 'bg-gray-800',
    '#18181b': 'bg-gray-900',
    '#09090b': 'bg-gray-950',
    '#fafafa': 'text-gray-50',
  };
  
  return colorMap[color.toLowerCase()] || `bg-[${color}]`;
}

/**
 * Generate spacing classes from frame data
 * @param {Object} frame - Frame data
 * @returns {Object} Spacing classes
 */
export function generateSpacingClasses(frame) {
  const spacing = {};
  
  if (frame.padding) {
    const padding = Array.isArray(frame.padding) ? frame.padding : [frame.padding];
    spacing.padding = padding.map(p => `p-${p / 4 || 0}`).join(' ');
  }
  
  if (frame.margin) {
    const margin = Array.isArray(frame.margin) ? frame.margin : [frame.margin];
    spacing.margin = margin.map(m => `m-${m / 4 || 0}`).join(' ');
  }
  
  if (frame.gap) {
    spacing.gap = `gap-${frame.gap / 4 || 0}`;
  }
  
  return spacing;
}
