# Pencil Code Generator

Convert `.pen` design files to React + Tailwind CSS components automatically.

## Features

- ✅ Frame → React Component conversion
- ✅ Style → Tailwind class conversion
- ✅ Flexbox and Grid layout generation
- ✅ Responsive breakpoint generation
- ✅ Theme variable extraction

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

## Project Structure

```
codegen/
├── cli.js                 # Command-line interface
├── generator/
│   ├── index.js           # Main generator entry
│   ├── component-generator.js  # React component generation
│   ├── style-generator.js      # Tailwind style generation
│   ├── layout-generator.js     # Flexbox/Grid layout generation
│   └── responsive-generator.js # Responsive breakpoint generation
└── generator.test.js      # Test suite
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

## Testing

Run the test suite:

```bash
npm test -- codegen/generator.test.js
```

Or with vitest directly:

```bash
npx vitest run codegen/generator.test.js
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
