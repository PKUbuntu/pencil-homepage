# Component Registry Usage Guide

## Overview

The Component Registry maps `.pen` design component names to React component paths, enabling automatic code generation with proper imports and JSX references.

## Quick Start

```javascript
import { registry, createRegistry } from '../codegen/components/registry.js';

// Use the default registry
const reactPath = registry.resolve('Header');
console.log(reactPath); // '../components/Header'

// Or create a custom registry
const customRegistry = createRegistry({
  configPath: './my-components.config.json',
});
```

## API Reference

### ComponentRegistry Class

#### Constructor

```javascript
const registry = new ComponentRegistry(options);
```

Options:
- `configPath` - Path to component configuration file (default: `codegen/components/components.config.json`)
- `outputDir` - Output directory for generated components (default: `src/components`)

#### Methods

##### `register(penName, reactPath)`

Register a new component mapping.

```javascript
registry.register('CustomButton', '../components/CustomButton');
```

##### `unregister(penName)`

Remove a component mapping.

```javascript
registry.unregister('Header');
```

##### `has(penName)`

Check if a component is registered.

```javascript
if (registry.has('Header')) {
  console.log('Header component available');
}
```

##### `resolve(penName)`

Get the React component path for a .pen component name.

```javascript
const path = registry.resolve('Footer');
console.log(path); // '../components/Footer'
```

##### `getAll()`

Get all registered component mappings.

```javascript
const mappings = registry.getAll();
console.log(mappings);
// { Header: '../components/Header', Footer: '../components/Footer', ... }
```

##### `extractParams(frameData)`

Extract parameters from a .pen frame definition.

```javascript
const frameData = {
  type: 'frame',
  name: 'Hero',
  width: 1440,
  height: 600,
  children: [
    { type: 'text', content: 'Welcome', fontSize: 48 }
  ]
};

const params = registry.extractParams(frameData);
console.log(params);
// { name: 'Hero', width: 1440, height: 600, children: [...] }
```

##### `generateImport(penName)`

Generate an import statement for a component.

```javascript
const importStmt = registry.generateImport('Header');
console.log(importStmt);
// "import { Header } from './components/Header';"
```

##### `generateJSX(penName, props)`

Generate JSX reference for a component.

```javascript
const jsx = registry.generateJSX('Header', { logoText: 'MyBrand' });
console.log(jsx);
// '<Header logoText="MyBrand" />'
```

##### `generateImports(penNames)`

Generate import statements for multiple components.

```javascript
const imports = registry.generateImports(['Header', 'Footer', 'Hero']);
console.log(imports);
// import { Header } from './components/Header';
// import { Footer } from './components/Footer';
// import { Hero } from './components/Hero';
```

##### `generateJSXMultiple(components)`

Generate JSX for multiple components.

```javascript
const jsx = registry.generateJSXMultiple([
  { penName: 'Header', props: { logoText: 'Brand' } },
  { penName: 'Footer' },
  { penName: 'Hero', props: { title: 'Welcome' } }
]);
```

##### `generateComponentWithRefs(componentName, children)`

Generate a complete React component with imported references.

```javascript
const code = registry.generateComponentWithRefs('HomePage', [
  { penName: 'Header', props: { logoText: 'MySite' } },
  { penName: 'Hero', props: { title: 'Welcome' } },
  { penName: 'Footer' }
]);

console.log(code);
// import React from 'react';
// import { Header } from './components/Header';
// import { Hero } from './components/Hero';
// import { Footer } from './components/Footer';
//
// export function HomePage() {
//   return (
//     <>
//       <Header logoText="MySite" />
//       <Hero title="Welcome" />
//       <Footer />
//     </>
//   );
// }
```

##### `getComponentName(penName)`

Convert a .pen name to PascalCase component name.

```javascript
const name = registry.getComponentName('my-component');
console.log(name); // 'MyComponent'
```

##### `getRelativePath(sourceFile, penName)`

Get the relative import path from a source file to a component.

```javascript
const relPath = registry.getRelativePath('/src/pages/Home.jsx', 'Header');
console.log(relPath); // '../components/Header'
```

##### `saveConfig()`

Save current component mappings to the config file.

```javascript
registry.register('CustomButton', '../components/CustomButton');
registry.saveConfig();
```

## Configuration File

The component registry uses a JSON configuration file:

```json
{
  "version": "1.0.0",
  "description": "Component mappings for Pencil Code Generator",
  "components": {
    "Header": "../components/Header",
    "Footer": "../components/Footer",
    "Button": "../components/Button",
    "CustomComponent": "../components/CustomComponent"
  }
}
```

### Location

Default: `codegen/components/components.config.json`

Custom:

```javascript
const registry = new ComponentRegistry({
  configPath: './custom-components.config.json'
});
```

## Integration with Code Generator

The registry integrates with the code generator to automatically import and reference components:

```javascript
import { generate } from '../codegen/generator/index.js';
import { registry } from '../codegen/components/registry.js';

const penData = JSON.parse(fs.readFileSync('Homepage.pen', 'utf8'));

// Extract component references from .pen data
const componentRefs = extractComponentRefs(penData);

// Generate imports
const imports = registry.generateImports(componentRefs.map(r => r.penName));

// Generate JSX
const jsx = registry.generateJSXMultiple(componentRefs);

// Combine with generated code
const finalCode = `${imports}

${generatedComponentCode}
`;
```

## Examples

### Example 1: Basic Usage

```javascript
import { registry } from '../codegen/components/registry.js';

// Check if component exists
if (registry.has('Header')) {
  // Generate import and JSX
  const importStmt = registry.generateImport('Header');
  const jsx = registry.generateJSX('Header', { logoText: 'MyBrand' });
  
  console.log(importStmt); // import { Header } from './components/Header';
  console.log(jsx);        // <Header logoText="MyBrand" />
}
```

### Example 2: Custom Component Registration

```javascript
import { createRegistry } from '../codegen/components/registry.js';

const registry = createRegistry();

// Register custom components
registry.register('MyButton', '../components/ui/MyButton');
registry.register('MyCard', '../components/ui/MyCard');

// Save configuration
registry.saveConfig();

// Use in code generation
const code = registry.generateComponentWithRefs('CustomPage', [
  { penName: 'MyButton', props: { label: 'Click Me' } },
  { penName: 'MyCard', props: { title: 'Card Title' } }
]);
```

### Example 3: Parameter Extraction

```javascript
import { registry } from '../codegen/components/registry.js';

const frameData = {
  type: 'frame',
  name: 'Hero',
  width: 1440,
  height: 600,
  padding: [40, 80],
  layout: 'vertical',
  children: [
    {
      type: 'text',
      content: 'Welcome to Our Site',
      fontSize: 48,
      fontWeight: 'bold'
    },
    {
      type: 'frame',
      name: 'CTA Button',
      children: [
        {
          type: 'text',
          content: 'Get Started',
          fontSize: 16
        }
      ]
    }
  ]
};

const params = registry.extractParams(frameData);
console.log(params);
// {
//   name: 'Hero',
//   width: 1440,
//   height: 600,
//   padding: [40, 80],
//   layout: 'vertical',
//   children: [
//     { content: 'Welcome to Our Site', fontSize: 48, fontWeight: 'bold' },
//     { name: 'CTA Button', children: [...] }
//   ]
// }
```

### Example 4: Integration with Template Engine

```javascript
import { renderPage } from '../codegen/template-engine/index.js';
import { registry } from '../codegen/components/registry.js';

// Render a page with component references
const page = renderPage({
  main: {
    type: 'frame',
    name: 'HomePage',
    children: [
      {
        type: 'reference',
        ref: 'Header',
        props: { logoText: 'MyBrand' }
      },
      {
        type: 'frame',
        name: 'Content',
        children: [/* page content */]
      },
      {
        type: 'reference',
        ref: 'Footer'
      }
    ]
  }
});

// Generate imports for all referenced components
const componentRefs = ['Header', 'Footer'];
const imports = registry.generateImports(componentRefs);

console.log(imports);
```

## Testing

Run the registry tests:

```bash
node --test codegen/components/registry.test.js
```

## Default Component Mappings

The registry comes with pre-configured mappings for common components:

| .pen Name | React Component Path |
|-----------|---------------------|
| Header | ../components/Header |
| Footer | ../components/Footer |
| Hero | ../components/Hero |
| Features | ../components/Features |
| Stats | ../components/Stats |
| Weather | ../components/Weather |
| ArrivalCard | ../components/ArrivalCard |
| HeatMapCard | ../components/HeatMapCard |
| LivestreamCard | ../components/LivestreamCard |
| TimeWeatherCard | ../components/TimeWeatherCard |
| TopZonesCard | ../components/TopZonesCard |
| TrafficCard | ../components/TrafficCard |
| VisitStatsCard | ../components/VisitStatsCard |
| Button | ../components/Button |

## Acceptance Criteria

- ✅ Header/Footer correctly mapped and referenced
- ✅ Component parameters properly extracted
- ✅ Import statements correctly generated
- ✅ JSX references properly formatted
- ✅ Custom component registration supported
- ✅ Configuration file for persistent mappings

## Related

- [Template System](../README.md#template-system) - Reusable page layouts and components
- [Code Generator](../README.md#generator-modules) - Convert .pen files to React components
