# Pencil Code Generator

Convert `.pen` design files to React + Tailwind CSS components automatically.

## Features

- ✅ Frame → React Component conversion
- ✅ Style → Tailwind class conversion
- ✅ Flexbox and Grid layout generation
- ✅ Responsive breakpoint generation
- ✅ Theme variable extraction
- ✅ **Template System** - Reusable page layouts and components
- ✅ **Frame References** - Reference and reuse frames across templates
- ✅ **Component References** - Import and compose components
- ✅ **Nested Templates** - Templates within templates
- ✅ **Component Registry** - Map .pen components to React components with parameter extraction

## Usage

### CLI

```bash
# Generate a single component
node codegen/cli.js Homepage.pen

# Generate with custom output directory
node codegen/cli.js Homepage.pen --output ./src/pages --name HomePage

# Generate all frames as separate components
node codegen/cli.js Homepage.pen --all
```

### Programmatic

```javascript
import { generate, generateAll } from './codegen/generator/index.js';

// Read .pen file
const penData = JSON.parse(fs.readFileSync('Homepage.pen', 'utf8'));

// Generate single component
const result = generate(penData, {
  outputDir: './src/components',
  componentName: 'HomePage',
});

console.log(result.componentCode);

// Generate all frames
const components = generateAll(penData);
components.forEach(comp => {
  console.log(`${comp.name} → ${comp.componentName}`);
});
```

### Template System

```javascript
import { renderTemplate, renderPage } from './codegen/template-engine/index.js';

// Render a frame template
const frame = renderTemplate('frame-template', {
  name: 'HeroSection',
  width: 'fill_container',
  height: 600,
  layout: 'vertical',
});

// Render a page with Header + Main + Footer
const page = renderPage({
  main: {
    type: 'frame',
    name: 'MainContent',
    children: [/* ... */],
  },
  // header and footer use defaults (components/header, components/footer)
});

// Use custom header
const customPage = renderPage({
  main: mainContent,
  header: { type: 'frame', name: 'CustomHeader', /* ... */ },
  footer: { type: 'frame', name: 'CustomFooter', /* ... */ },
});

// Use component references
const withRefs = renderTemplate('frame-template', {
  name: 'PageWithRefs',
  children: [
    {
      type: 'reference',
      ref: 'components/header',
      props: { logoText: 'MyBrand' },
    },
  ],
});
```

### Component Registry

```javascript
import { registry, createRegistry } from './codegen/components/registry.js';

// Resolve component paths
const headerPath = registry.resolve('Header');
console.log(headerPath); // '../components/Header'

// Generate imports
const importStmt = registry.generateImport('Header');
console.log(importStmt); // "import { Header } from './components/Header';"

// Generate JSX
const jsx = registry.generateJSX('Header', { logoText: 'MyBrand' });
console.log(jsx); // '<Header logoText="MyBrand" />'

// Extract parameters from .pen frame data
const params = registry.extractParams({
  type: 'frame',
  name: 'Hero',
  width: 1440,
  children: [{ type: 'text', content: 'Welcome', fontSize: 48 }]
});

// Register custom components
registry.register('CustomButton', '../components/CustomButton');
registry.saveConfig();

// Generate complete component with references
const code = registry.generateComponentWithRefs('HomePage', [
  { penName: 'Header', props: { logoText: 'Brand' } },
  { penName: 'Footer' }
]);
```

See [Component Registry Usage Guide](components/README.md) for full documentation.

## Project Structure

```
codegen/
├── cli.js                          # Command-line interface
├── generator/
│   ├── index.js                    # Main generator entry
│   ├── component-generator.js      # React component generation
│   ├── style-generator.js          # Tailwind style generation
│   ├── layout-generator.js         # Flexbox/Grid layout generation
│   └── responsive-generator.js     # Responsive breakpoint generation
├── template-engine/
│   ├── index.js                    # Template rendering engine
│   └── template-engine.test.js     # Template engine tests
├── templates/
│   ├── page-template.json          # Page layout (Header+Main+Footer)
│   ├── frame-template.json         # Reusable frame template
│   ├── reference-template.json     # Component reference template
│   └── components/
│       ├── header.json             # Header component template
│       └── footer.json             # Footer component template
├── components/
│   ├── registry.js                 # Component registry (maps .pen to React)
│   ├── registry.test.js            # Registry test suite
│   ├── components.config.json      # Component mapping configuration
│   └── README.md                   # Component registry usage guide
├── examples/
│   └── template-usage.js           # Template usage examples
├── generator.test.js               # Generator test suite
└── README.md                       # This file
```

## Template System

### Template Format

Templates are JSON files with the following structure:

```json
{
  "name": "TemplateName",
  "description": "What this template does",
  "version": "1.0.0",
  "parameters": {
    "paramName": {
      "type": "string|number|object|array",
      "description": "Parameter description",
      "default": "defaultValue"
    }
  },
  "structure": {
    "type": "frame",
    "name": "${paramName}",
    "children": []
  }
}
```

### Parameter Substitution

Use `${paramName}` in template structures to substitute values:

```json
{
  "type": "frame",
  "name": "${name}",
  "width": "${width}",
  "height": "${height}"
}
```

### Component References

Reference other templates/components using the `reference` type:

```json
{
  "type": "reference",
  "ref": "components/header",
  "props": {
    "logoText": "MyBrand",
    "navItems": ["Home", "About"]
  }
}
```

### Page Template

The page template provides a standard layout with three slots:

- **header** (optional) - Defaults to `components/header`
- **main** (required) - Page-specific content
- **footer** (optional) - Defaults to `components/footer`

```javascript
import { renderPage } from './codegen/template-engine/index.js';

const page = renderPage({
  main: {
    type: 'frame',
    name: 'HomePage',
    children: [/* page content */],
  },
});
```

## Generator Modules

### Component Generator (`component-generator.js`)

Converts Frame data to React components:

- `generateComponent(frameData, componentName)` - Main generation function
- `generateContainerClasses(frame)` - Generate container div classes
- `generateTextClasses(text)` - Generate text element classes

### Style Generator (`style-generator.js`)

Extracts and converts design styles:

- `generateStyles(penData)` - Extract all styles
- `generateCSSVariables(variables)` - Generate CSS custom properties
- `generateTailwindConfig(colors)` - Generate Tailwind config extension

### Layout Generator (`layout-generator.js`)

Generates layout structures:

- `generateLayout(frameData)` - Main layout generation
- `generateFlexLayout(frame)` - Flexbox classes
- `generateGridLayout(frame, columns)` - Grid classes

### Responsive Generator (`responsive-generator.js`)

Generates responsive breakpoints:

- `generateResponsive(frameData)` - All breakpoint classes
- `generateResponsiveFontSize(fontSize)` - Responsive typography
- `generateResponsiveWidth(width)` - Responsive widths

### Template Engine (`template-engine/index.js`)

Renders templates with parameter substitution and reference resolution:

- `loadTemplate(templateName)` - Load a template from disk
- `renderTemplate(templateName, params)` - Render a template with parameters
- `renderPage(slots)` - Render a page with Header/Main/Footer slots
- `resolveReferences(structure)` - Resolve component references
- `substituteParams(structure, params)` - Substitute parameters in structure
- `listTemplates()` - List all available templates

### Component Registry (`components/registry.js`)

Maps .pen component names to React component paths:

- `createRegistry(options)` - Create a new registry instance
- `registry.resolve(penName)` - Get React component path for a .pen name
- `registry.register(penName, reactPath)` - Register a new component mapping
- `registry.has(penName)` - Check if a component is registered
- `registry.extractParams(frameData)` - Extract parameters from .pen frame data
- `registry.generateImport(penName)` - Generate import statement
- `registry.generateJSX(penName, props)` - Generate JSX reference
- `registry.generateImports(penNames)` - Generate multiple imports
- `registry.generateJSXMultiple(components)` - Generate JSX for multiple components
- `registry.generateComponentWithRefs(name, children)` - Generate complete component
- `registry.saveConfig()` - Save component mappings to config file

## Examples

See `codegen/examples/template-usage.js` for comprehensive usage examples.

## Testing

```bash
# Run all tests
npm test

# Run generator tests only
npm test -- codegen/generator.test.js

# Run template engine tests only
npm test -- codegen/template-engine/template-engine.test.js
```

## Acceptance Criteria

### Template System (Issue #8)
- ✅ Reusable Header/Footer components via templates
- ✅ Page structure correctly generated with Header + Main + Footer
- ✅ Component references properly parsed and resolved
- ✅ Nested templates supported (templates within templates)
- ✅ Parameter substitution working
- ✅ Template caching for performance

### Component Registry (Issue #9)
- ✅ Header/Footer correctly mapped to React components
- ✅ Component parameters properly extracted from .pen frame data
- ✅ Import statements correctly generated
- ✅ JSX references properly formatted with props
- ✅ Custom component registration supported
- ✅ Configuration file for persistent mappings
- ✅ Complete component generation with references

## Examples

### Input (.pen file)

```json
{
  "type": "frame",
  "name": "Hero",
  "width": 1440,
  "layout": "vertical",
  "padding": [40, 80],
  "children": [
    {
      "type": "text",
      "content": "Welcome",
      "fontSize": 48,
      "fontWeight": "bold"
    }
  ]
}
```

### Output (React Component)

```jsx
import React from 'react';

/**
 * HeroComponent
 * Auto-generated from Pencil design file
 */
export function HeroComponent() {
  return (
    <div className="flex flex-col py-10 px-20">
      <span className="text-5xl font-bold">Welcome</span>
    </div>
  );
}

export default HeroComponent;
```

## Configuration

The generator uses sensible defaults but can be configured:

| Option | Default | Description |
|--------|---------|-------------|
| `outputDir` | `./src/components` | Output directory for generated files |
| `componentName` | Auto-generated | Name for the React component |
| `all` | `false` | Generate all frames as separate components |

## Limitations

- Some complex `.pen` features may not have direct Tailwind equivalents
- Custom fonts need to be configured separately
- Image assets are referenced but not processed
- Theme variables use CSS custom properties (requires Tailwind config)

## Future Enhancements

- [ ] Support for more `.pen` element types
- [ ] Automatic prop extraction for dynamic content
- [ ] Storybook story generation
- [ ] TypeScript type generation
- [ ] Component composition from references

## License

ISC
