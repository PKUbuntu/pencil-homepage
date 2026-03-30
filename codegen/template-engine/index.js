/**
 * Template Engine for Pencil Code Generator
 * Handles template loading, parameter substitution, and reference resolution
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = join(__dirname, '../templates');

/**
 * Template cache for loaded templates
 */
const templateCache = new Map();

/**
 * Load a template from the templates directory
 * @param {string} templateName - Template name (e.g., 'page-template', 'components/header')
 * @returns {Object} Loaded template object
 */
export function loadTemplate(templateName) {
  if (templateCache.has(templateName)) {
    return templateCache.get(templateName);
  }

  // Try exact path first
  let templatePath = join(TEMPLATES_DIR, `${templateName}.json`);
  
  if (!existsSync(templatePath)) {
    // Try without .json extension
    templatePath = join(TEMPLATES_DIR, templateName);
    if (!templatePath.endsWith('.json')) {
      templatePath += '.json';
    }
  }

  if (!existsSync(templatePath)) {
    // Try lowercase for component paths (case-insensitive fallback)
    const lowerName = templateName.toLowerCase();
    templatePath = join(TEMPLATES_DIR, `${lowerName}.json`);
  }

  if (!existsSync(templatePath)) {
    throw new Error(`Template not found: ${templateName} (searched: ${templatePath})`);
  }

  const template = JSON.parse(readFileSync(templatePath, 'utf8'));
  templateCache.set(templateName, template);
  return template;
}

/**
 * Try to convert a string value back to its original type
 * @param {string} value - String value to convert
 * @returns {*} Converted value
 */
function tryConvertType(value) {
  if (typeof value !== 'string') return value;
  
  // Try to convert to number
  if (/^-?\d+$/.test(value)) {
    return parseInt(value, 10);
  }
  if (/^-?\d*\.\d+$/.test(value)) {
    return parseFloat(value);
  }
  
  // Try to convert to boolean
  if (value === 'true') return true;
  if (value === 'false') return false;
  
  return value;
}

/**
 * Substitute parameters in a template structure
 * @param {Object} structure - Template structure with ${param} placeholders
 * @param {Object} params - Parameter values
 * @returns {Object} Structure with parameters substituted
 */
export function substituteParams(structure, params) {
  if (typeof structure === 'string') {
    // Handle ${param} substitution
    const result = structure.replace(/\$\{([^}]+)\}/g, (match, key) => {
      if (key.includes('|')) {
        // Handle transformations like ${items|map:item=>...}
        const [paramName, transform] = key.split('|');
        const value = params[paramName.trim()];
        return applyTransform(value, transform.trim(), params);
      }
      const value = params[key.trim()];
      return value !== undefined ? String(value) : match;
    });
    
    // If the entire string was a single parameter, try to preserve type
    if (/^\$\{([^}]+)\}$/.test(structure)) {
      const match = structure.match(/^\$\{([^}]+)\}$/);
      if (match) {
        const key = match[1].split('|')[0].trim();
        const value = params[key];
        if (value !== undefined) {
          return value;
        }
      }
    }
    
    return result;
  }

  if (Array.isArray(structure)) {
    return structure.map(item => substituteParams(item, params));
  }

  if (typeof structure === 'object' && structure !== null) {
    const result = {};
    for (const [key, value] of Object.entries(structure)) {
      result[key] = substituteParams(value, params);
    }
    return result;
  }

  return structure;
}

/**
 * Apply a transformation to a value
 * @param {*} value - Input value
 * @param {string} transform - Transform expression (e.g., 'map:item=>...')
 * @param {Object} params - All parameters (for context)
 * @returns {*} Transformed value
 */
function applyTransform(value, transform, params) {
  if (transform.startsWith('map:')) {
    const expr = transform.slice(4);
    // Parse map expression: item=>({...})
    const match = expr.match(/(\w+)=>(.+)/);
    if (match && Array.isArray(value)) {
      const [, itemName, body] = match;
      // Simple evaluation - in production, use a proper expression parser
      return value.map(item => {
        const context = { [itemName]: item };
        // For complex expressions, we'd need a proper evaluator
        // This is a simplified version
        try {
          return evalInContext(body, { ...context, ...params });
        } catch {
          return { [itemName]: item };
        }
      });
    }
  }
  return value;
}

/**
 * Safely evaluate an expression in a given context
 * @param {string} expr - Expression to evaluate
 * @param {Object} context - Context variables
 * @returns {*} Evaluation result
 */
function evalInContext(expr, context) {
  // Simple JSON-like object literal evaluation
  // This is a simplified implementation
  try {
    // For object literals like {type:'text',name:item,...}
    const sanitized = expr
      .replace(/(\w+):/g, '"$1":')
      .replace(/'([^']+)'/g, '"$1"');
    return JSON.parse(sanitized);
  } catch {
    return expr;
  }
}

/**
 * Resolve references in a template structure
 * @param {Object} structure - Template structure with reference elements
 * @param {Object} options - Resolution options
 * @returns {Object} Structure with references resolved
 */
export function resolveReferences(structure, options = {}) {
  const { resolvedRefs = new Set() } = options;

  if (Array.isArray(structure)) {
    return structure.map(item => resolveReferences(item, { ...options, resolvedRefs }));
  }

  if (typeof structure === 'object' && structure !== null) {
    if (structure.type === 'reference' && structure.ref) {
      // Check for circular references
      if (resolvedRefs.has(structure.ref)) {
        console.warn(`Circular reference detected: ${structure.ref}`);
        return structure;
      }

      // Load and resolve the referenced template
      try {
        const refTemplate = loadTemplate(structure.ref);
        const mergedParams = { ...refTemplate.parameters, ...structure.props };
        let resolvedStructure = substituteParams(refTemplate.structure, mergedParams);
        
        // Preserve the 'as' alias if provided
        if (structure.as) {
          resolvedStructure.name = structure.as;
        }
        
        // Recursively resolve references in the resolved structure
        return resolveReferences(resolvedStructure, {
          ...options,
          resolvedRefs: new Set(resolvedRefs).add(structure.ref),
        });
      } catch (error) {
        console.warn(`Failed to resolve reference ${structure.ref}: ${error.message}`);
        return structure;
      }
    }

    const result = {};
    for (const [key, value] of Object.entries(structure)) {
      result[key] = resolveReferences(value, { ...options, resolvedRefs });
    }
    return result;
  }

  return structure;
}

/**
 * Render a template with given parameters
 * @param {string} templateName - Template name
 * @param {Object} params - Template parameters
 * @param {Object} options - Render options
 * @returns {Object} Rendered template structure
 */
export function renderTemplate(templateName, params = {}, options = {}) {
  const template = loadTemplate(templateName);
  
  // Merge template defaults with provided params
  const mergedParams = {};
  if (template.parameters) {
    for (const [key, param] of Object.entries(template.parameters)) {
      mergedParams[key] = param.default !== undefined ? param.default : undefined;
    }
  }
  Object.assign(mergedParams, params);

  // Substitute parameters
  let structure = substituteParams(template.structure, mergedParams);

  // Resolve references if enabled
  if (options.resolveReferences !== false) {
    structure = resolveReferences(structure);
  }

  return {
    name: template.name,
    version: template.version,
    structure,
    metadata: {
      template: templateName,
      params: mergedParams,
      renderedAt: new Date().toISOString(),
    },
  };
}

/**
 * Render a page template with slot content
 * @param {Object} slots - Slot content { header, main, footer }
 * @param {Object} options - Render options
 * @returns {Object} Rendered page structure
 */
export function renderPage(slots = {}, options = {}) {
  const { main, header, footer } = slots;

  if (!main) {
    throw new Error('Page template requires "main" slot content');
  }

  // Load page template
  const pageTemplate = loadTemplate('page-template');
  
  // Build slot content map
  const slotContent = {
    header: header || pageTemplate.slots.header.defaultRef,
    main: main,
    footer: footer || pageTemplate.slots.footer.defaultRef,
  };

  // Process slots in the structure
  const structure = JSON.parse(JSON.stringify(pageTemplate.structure));
  structure.children = structure.children.map(slot => {
    const content = slotContent[slot.slot];
    const slotName = slot.name; // Preserve the slot name (header, main, footer)
    
    if (typeof content === 'string') {
      // It's a reference to another template
      return {
        type: 'reference',
        ref: content,
        as: slotName,
      };
    }
    
    // It's inline content - wrap it with the slot name
    return {
      ...content,
      name: slotName, // Use slot name, not content name
    };
  });

  // Resolve all references
  const resolved = resolveReferences(structure);

  return {
    name: 'Page',
    version: pageTemplate.version,
    structure: resolved,
    metadata: {
      template: 'page-template',
      slots: Object.keys(slots),
      renderedAt: new Date().toISOString(),
    },
  };
}

/**
 * Get all available templates
 * @returns {Array} List of available template names
 */
export function listTemplates() {
  const templates = [];
  
  function scanDir(dir, prefix = '') {
    try {
      const files = [];
      if (existsSync(join(dir, 'page-template.json'))) files.push('page-template');
      if (existsSync(join(dir, 'frame-template.json'))) files.push('frame-template');
      if (existsSync(join(dir, 'reference-template.json'))) files.push('reference-template');
      if (existsSync(join(dir, 'components/header.json'))) files.push('components/header');
      if (existsSync(join(dir, 'components/footer.json'))) files.push('components/footer');
      
      templates.push(...files.map(f => prefix ? `${prefix}/${f}` : f));
    } catch {
      // Directory doesn't exist or other error
    }
  }
  
  scanDir(TEMPLATES_DIR);
  return templates;
}
