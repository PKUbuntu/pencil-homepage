/**
 * Tests for Component Registry
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import ComponentRegistry, { createRegistry, registry } from './registry.js';

describe('ComponentRegistry', () => {
  it('should create a registry with default mappings', () => {
    const reg = new ComponentRegistry();
    assert.ok(reg.has('Header'));
    assert.ok(reg.has('Footer'));
    assert.strictEqual(reg.resolve('Header'), '../components/Header');
  });

  it('should register new components', () => {
    const reg = new ComponentRegistry();
    reg.register('CustomButton', '../components/CustomButton');
    assert.ok(reg.has('CustomButton'));
    assert.strictEqual(reg.resolve('CustomButton'), '../components/CustomButton');
  });

  it('should unregister components', () => {
    const reg = new ComponentRegistry();
    reg.unregister('Header');
    assert.strictEqual(reg.has('Header'), false);
  });

  it('should extract parameters from frame data', () => {
    const reg = new ComponentRegistry();
    const frameData = {
      type: 'frame',
      name: 'TestFrame',
      width: 1440,
      height: 600,
      fill: '#ffffff',
      padding: [20, 40],
      layout: 'vertical',
      children: [
        {
          type: 'text',
          content: 'Hello',
          fontSize: 24,
          fontWeight: 'bold',
        },
      ],
    };

    const params = reg.extractParams(frameData);
    assert.strictEqual(params.name, 'TestFrame');
    assert.strictEqual(params.width, 1440);
    assert.strictEqual(params.height, 600);
    assert.strictEqual(params.fill, '#ffffff');
    assert.deepStrictEqual(params.padding, [20, 40]);
    assert.strictEqual(params.layout, 'vertical');
    assert.ok(Array.isArray(params.children));
    assert.strictEqual(params.children[0].content, 'Hello');
    assert.strictEqual(params.children[0].fontSize, 24);
  });

  it('should generate import statements', () => {
    const reg = new ComponentRegistry();
    const importStmt = reg.generateImport('Header');
    assert.strictEqual(importStmt, "import { Header } from './components/Header';");
  });

  it('should generate JSX references', () => {
    const reg = new ComponentRegistry();
    const jsx = reg.generateJSX('Header', { logoText: 'MyBrand' });
    assert.strictEqual(jsx, '<Header logoText="MyBrand" />');
  });

  it('should generate JSX without props', () => {
    const reg = new ComponentRegistry();
    const jsx = reg.generateJSX('Header');
    assert.strictEqual(jsx, '<Header />');
  });

  it('should generate multiple imports', () => {
    const reg = new ComponentRegistry();
    const imports = reg.generateImports(['Header', 'Footer']);
    assert.ok(imports.includes("import { Header } from './components/Header';"));
    assert.ok(imports.includes("import { Footer } from './components/Footer';"));
  });

  it('should generate JSX for multiple components', () => {
    const reg = new ComponentRegistry();
    const jsx = reg.generateJSXMultiple([
      { penName: 'Header', props: { logoText: 'Brand' } },
      { penName: 'Footer' },
    ]);
    assert.ok(jsx.includes('<Header logoText="Brand" />'));
    assert.ok(jsx.includes('<Footer />'));
  });

  it('should convert names to PascalCase', () => {
    const reg = new ComponentRegistry();
    assert.strictEqual(reg.getComponentName('header'), 'Header');
    assert.strictEqual(reg.getComponentName('my-component'), 'MyComponent');
    assert.strictEqual(reg.getComponentName('test_frame'), 'TestFrame');
  });

  it('should generate component with references', () => {
    const reg = new ComponentRegistry();
    const code = reg.generateComponentWithRefs('TestPage', [
      { penName: 'Header', props: { logoText: 'Test' } },
      { penName: 'Footer' },
    ]);

    assert.ok(code.includes("import { Header } from './components/Header';"));
    assert.ok(code.includes("import { Footer } from './components/Footer';"));
    assert.ok(code.includes('<Header logoText="Test" />'));
    assert.ok(code.includes('<Footer />'));
    assert.ok(code.includes('export function TestPage()'));
  });

  it('should return null for unregistered components', () => {
    const reg = new ComponentRegistry();
    assert.strictEqual(reg.resolve('NonExistent'), null);
    assert.strictEqual(reg.generateImport('NonExistent'), null);
    assert.strictEqual(reg.generateJSX('NonExistent'), null);
  });

  it('should get all registered components', () => {
    const reg = new ComponentRegistry();
    const all = reg.getAll();
    assert.ok(all.Header);
    assert.ok(all.Footer);
    assert.strictEqual(all.Header, '../components/Header');
  });
});

describe('createRegistry', () => {
  it('should create a new registry instance', () => {
    const reg = createRegistry();
    assert.ok(reg instanceof ComponentRegistry);
  });

  it('should accept custom options', () => {
    const reg = createRegistry({ configPath: '/custom/path/config.json' });
    assert.ok(reg instanceof ComponentRegistry);
  });
});

describe('default registry', () => {
  it('should export a default registry instance', () => {
    assert.ok(registry);
    assert.ok(registry.has('Header'));
  });
});

console.log('All registry tests passed! ✅');
