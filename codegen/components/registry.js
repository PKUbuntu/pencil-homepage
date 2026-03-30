/**
 * Component Registry for Pencil Code Generator
 * Maps .pen component names to React component paths
 * Handles parameter extraction and JSX reference generation
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Default component mappings
 * Maps .pen component names to React component relative paths
 */
const DEFAULT_COMPONENT_MAP = {
  Header: '../components/Header',
  Footer: '../components/Footer',
  Hero: '../components/Hero',
  Features: '../components/Features',
  Stats: '../components/Stats',
  Weather: '../components/Weather',
  ArrivalCard: '../components/ArrivalCard',
  HeatMapCard: '../components/HeatMapCard',
  LivestreamCard: '../components/LivestreamCard',
  TimeWeatherCard: '../components/TimeWeatherCard',
  TopZonesCard: '../components/TopZonesCard',
  TrafficCard: '../components/TrafficCard',
  VisitStatsCard: '../components/VisitStatsCard',
};

/**
 * Registry configuration
 */
class ComponentRegistry {
  constructor(options = {}) {
    this.componentMap = { ...DEFAULT_COMPONENT_MAP };
    this.configPath = options.configPath || join(__dirname, 'components.config.json');
    this.outputDir = options.outputDir || join(__dirname, '../../src/components');
    
    // Load custom mappings from config file
    this.loadConfig();
  }

  /**
   * Load component mappings from config file
   */
  loadConfig() {
    if (existsSync(this.configPath)) {
      try {
        const config = JSON.parse(readFileSync(this.configPath, 'utf8'));
        if (config.components) {
          this.componentMap = { ...this.componentMap, ...config.components };
        }
      } catch (error) {
        console.warn(`Failed to load component config: ${error.message}`);
      }
    }
  }

  /**
   * Save component mappings to config file
   */
  saveConfig() {
    const config = {
      version: '1.0.0',
      description: 'Component mappings for Pencil Code Generator',
      components: this.componentMap,
    };
    
    writeFileSync(this.configPath, JSON.stringify(config, null, 2), 'utf8');
    console.log(`Component config saved to ${this.configPath}`);
  }

  /**
   * Register a new component mapping
   * @param {string} penName - .pen component name
   * @param {string} reactPath - React component relative path
   */
  register(penName, reactPath) {
    this.componentMap[penName] = reactPath;
    return this;
  }

  /**
   * Unregister a component mapping
   * @param {string} penName - .pen component name
   */
  unregister(penName) {
    delete this.componentMap[penName];
    return this;
  }

  /**
   * Check if a component is registered
   * @param {string} penName - .pen component name
   * @returns {boolean} True if registered
   */
  has(penName) {
    return penName in this.componentMap;
  }

  /**
   * Get the React component path for a .pen component name
   * @param {string} penName - .pen component name
   * @returns {string|null} React component path or null if not found
   */
  resolve(penName) {
    return this.componentMap[penName] || null;
  }

  /**
   * Get all registered components
   * @returns {Object} Component mappings
   */
  getAll() {
    return { ...this.componentMap };
  }

  /**
   * Extract component parameters from a .pen frame definition
   * @param {Object} frameData - .pen frame data
   * @returns {Object} Extracted parameters
   */
  extractParams(frameData) {
    if (!frameData || typeof frameData !== 'object') {
      return {};
    }

    const params = {};

    // Extract name
    if (frameData.name) {
      params.name = frameData.name;
    }

    // Extract dimensions
    if (frameData.width !== undefined) {
      params.width = frameData.width;
    }
    if (frameData.height !== undefined) {
      params.height = frameData.height;
    }

    // Extract style properties
    if (frameData.fill) {
      params.fill = frameData.fill;
    }
    if (frameData.stroke) {
      params.stroke = frameData.stroke;
    }
    if (frameData.cornerRadius) {
      params.cornerRadius = frameData.cornerRadius;
    }
    if (frameData.padding) {
      params.padding = frameData.padding;
    }
    if (frameData.gap) {
      params.gap = frameData.gap;
    }

    // Extract layout properties
    if (frameData.layout) {
      params.layout = frameData.layout;
    }
    if (frameData.justifyContent) {
      params.justifyContent = frameData.justifyContent;
    }
    if (frameData.alignItems) {
      params.alignItems = frameData.alignItems;
    }

    // Extract text content for text elements
    if (frameData.type === 'text' && frameData.content) {
      params.content = frameData.content;
    }
    if (frameData.fontSize) {
      params.fontSize = frameData.fontSize;
    }
    if (frameData.fontWeight) {
      params.fontWeight = frameData.fontWeight;
    }
    if (frameData.fontFamily) {
      params.fontFamily = frameData.fontFamily;
    }

    // Recursively extract params from children
    if (frameData.children && Array.isArray(frameData.children)) {
      params.children = frameData.children.map(child => this.extractParams(child));
    }

    return params;
  }

  /**
   * Generate import statement for a component
   * @param {string} penName - .pen component name
   * @returns {string|null} Import statement or null if not found
   */
  generateImport(penName) {
    const reactPath = this.resolve(penName);
    if (!reactPath) {
      return null;
    }

    // Convert path to import-friendly format
    // e.g., "../components/Header" -> Header
    const componentName = this.getComponentName(penName);
    const importPath = reactPath.replace(/^\.\.?\//, './');
    
    return `import { ${componentName} } from '${importPath}';`;
  }

  /**
   * Generate JSX reference for a component
   * @param {string} penName - .pen component name
   * @param {Object} props - Component props
   * @returns {string|null} JSX string or null if not found
   */
  generateJSX(penName, props = {}) {
    const reactPath = this.resolve(penName);
    if (!reactPath) {
      return null;
    }

    const componentName = this.getComponentName(penName);
    
    // Generate props string
    const propsString = Object.entries(props)
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        }
        if (typeof value === 'object') {
          return `${key}={${JSON.stringify(value)}}`;
        }
        return `${key}={${value}}`;
      })
      .join(' ');

    return propsString ? `<${componentName} ${propsString} />` : `<${componentName} />`;
  }

  /**
   * Generate all imports for a set of components
   * @param {Array<string>} penNames - List of .pen component names
   * @returns {string} Combined import statements
   */
  generateImports(penNames) {
    const imports = new Set();
    
    penNames.forEach(penName => {
      const importStmt = this.generateImport(penName);
      if (importStmt) {
        imports.add(importStmt);
      }
    });

    return Array.from(imports).join('\n');
  }

  /**
   * Generate JSX for multiple components
   * @param {Array<Object>} components - Array of { penName, props } objects
   * @returns {string} Combined JSX string
   */
  generateJSXMultiple(components) {
    return components
      .map(({ penName, props = {} }) => this.generateJSX(penName, props))
      .filter(Boolean)
      .join('\n          ');
  }

  /**
   * Get component name from pen name (PascalCase)
   * @param {string} penName - .pen component name
   * @returns {string} PascalCase component name
   */
  getComponentName(penName) {
    // Convert to PascalCase if needed
    return penName
      .split(/[-_\s]+/)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
  }

  /**
   * Get the relative path from a source file to a component
   * @param {string} sourceFile - Source file path
   * @param {string} penName - .pen component name
   * @returns {string|null} Relative import path or null
   */
  getRelativePath(sourceFile, penName) {
    const reactPath = this.resolve(penName);
    if (!reactPath) {
      return null;
    }

    const sourceDir = dirname(sourceFile);
    const componentPath = join(__dirname, reactPath);
    return relative(sourceDir, componentPath).replace(/\\/g, '/');
  }

  /**
   * Generate a complete React component with imported references
   * @param {string} componentName - Name for the generated component
   * @param {Array<Object>} children - Array of { penName, props } for child components
   * @returns {string} Complete React component code
   */
  generateComponentWithRefs(componentName, children = []) {
    const penNames = children.map(c => c.penName);
    const imports = this.generateImports(penNames);
    const jsx = this.generateJSXMultiple(children);

    return `import React from 'react';
${imports}

/**
 * ${componentName}
 * Auto-generated component with referenced components
 */
export function ${componentName}() {
  return (
    <>
      ${jsx}
    </>
  );
}

export default ${componentName};
`;
  }
}

/**
 * Create a new component registry instance
 * @param {Object} options - Registry options
 * @returns {ComponentRegistry} Registry instance
 */
export function createRegistry(options = {}) {
  return new ComponentRegistry(options);
}

/**
 * Get the default registry instance
 */
export const registry = new ComponentRegistry();

export default ComponentRegistry;
