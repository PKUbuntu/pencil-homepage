/**
 * Generator Tests
 * Tests for the React + Tailwind code generator
 */

import { describe, it, expect } from 'vitest';
import { generate, generateComponent, generateAll } from '../generator/index.js';
import { generateContainerClasses, generateTextClasses } from '../generator/component-generator.js';
import { generateStyles, generateCSSVariables } from '../generator/style-generator.js';
import { generateLayout, generateFlexLayout } from '../generator/layout-generator.js';
import { generateResponsive, generateResponsiveFontSize } from '../generator/responsive-generator.js';

// Sample .pen data for testing
const samplePenData = {
  version: "2.6",
  variables: {
    "--background": { type: "color", value: [{ value: "#ffffff" }] },
    "--foreground": { type: "color", value: [{ value: "#09090b" }] },
  },
  children: [
    {
      type: "frame",
      id: "test123",
      name: "TestComponent",
      width: 1440,
      height: 800,
      fill: "$--background",
      layout: "vertical",
      padding: [20, 40],
      gap: 16,
      children: [
        {
          type: "frame",
          id: "header1",
          name: "Header",
          width: "fill_container",
          height: 64,
          layout: "horizontal",
          alignItems: "center",
          justifyContent: "space_between",
          children: [
            {
              type: "text",
              id: "logo1",
              name: "Logo",
              content: "Brand",
              fontFamily: "Inter",
              fontSize: 24,
              fontWeight: "bold",
              fill: "$--foreground",
            },
            {
              type: "frame",
              id: "nav1",
              name: "Navigation",
              layout: "horizontal",
              gap: 32,
              children: [
                { type: "text", content: "Features", fontSize: 14 },
                { type: "text", content: "Pricing", fontSize: 14 },
              ],
            },
          ],
        },
      ],
    },
  ],
};

describe('Code Generator', () => {
  describe('generate()', () => {
    it('should generate component code from pen data', () => {
      const result = generate(samplePenData, { componentName: 'TestComponent' });
      
      expect(result).toHaveProperty('componentCode');
      expect(result).toHaveProperty('styles');
      expect(result).toHaveProperty('layout');
      expect(result).toHaveProperty('responsive');
      expect(result).toHaveProperty('metadata');
      
      expect(result.componentCode).toContain('export function TestComponent');
      expect(result.componentCode).toContain('return (');
      expect(result.componentCode).toContain('</div>');
    });
    
    it('should include metadata', () => {
      const result = generate(samplePenData, { componentName: 'TestComponent' });
      
      expect(result.metadata.componentName).toBe('TestComponent');
      expect(result.metadata).toHaveProperty('generatedAt');
      expect(result.metadata).toHaveProperty('sourceName');
    });
  });
  
  describe('generateComponent()', () => {
    it('should generate valid React component', () => {
      const frameData = {
        type: "frame",
        name: "SimpleComponent",
        children: [],
      };
      
      const code = generateComponent(frameData, 'SimpleComponent');
      
      expect(code).toContain('import React from');
      expect(code).toContain('export function SimpleComponent');
      expect(code).toContain('return (');
      expect(code).toContain('<div className=');
    });
    
    it('should generate children elements', () => {
      const frameData = {
        type: "frame",
        name: "ParentComponent",
        children: [
          { type: "text", content: "Hello World", fontSize: 16 },
        ],
      };
      
      const code = generateComponent(frameData, 'ParentComponent');
      
      expect(code).toContain('Hello World');
      expect(code).toContain('<span');
    });
  });
  
  describe('generateAll()', () => {
    it('should generate multiple components from frames', () => {
      const multiFrameData = {
        children: [
          { type: "frame", name: "Frame One" },
          { type: "frame", name: "Frame Two" },
          { type: "frame", name: "Frame Three" },
        ],
      };
      
      const components = generateAll(multiFrameData);
      
      expect(components.length).toBe(3);
      expect(components[0].name).toBe('Frame One');
      expect(components[0].componentName).toBe('FrameOneComponent');
      expect(components[1].name).toBe('Frame Two');
      expect(components[2].name).toBe('Frame Three');
    });
  });
});

describe('Component Generator', () => {
  describe('generateContainerClasses()', () => {
    it('should generate flex classes for horizontal layout', () => {
      const frame = { layout: 'horizontal' };
      const classes = generateContainerClasses(frame);
      
      expect(classes).toContain('flex');
      expect(classes).toContain('flex-row');
    });
    
    it('should generate flex classes for vertical layout', () => {
      const frame = { layout: 'vertical' };
      const classes = generateContainerClasses(frame);
      
      expect(classes).toContain('flex');
      expect(classes).toContain('flex-col');
    });
    
    it('should generate padding classes', () => {
      const frame = { padding: [20, 40] };
      const classes = generateContainerClasses(frame);
      
      expect(classes).toMatch(/py-\d+/);
      expect(classes).toMatch(/px-\d+/);
    });
    
    it('should generate gap classes', () => {
      const frame = { gap: 16 };
      const classes = generateContainerClasses(frame);
      
      expect(classes).toContain('gap-4');
    });
    
    it('should generate alignment classes', () => {
      const frame = { alignItems: 'center', justifyContent: 'space_between' };
      const classes = generateContainerClasses(frame);
      
      expect(classes).toContain('items-center');
      expect(classes).toContain('justify-between');
    });
    
    it('should generate width classes', () => {
      const frame = { width: 'fill_container' };
      const classes = generateContainerClasses(frame);
      
      expect(classes).toContain('w-full');
    });
    
    it('should generate border-radius classes', () => {
      expect(generateContainerClasses({ cornerRadius: 4 })).toContain('rounded');
      expect(generateContainerClasses({ cornerRadius: 8 })).toContain('rounded-lg');
      expect(generateContainerClasses({ cornerRadius: 20 })).toContain('rounded-full');
    });
  });
  
  describe('generateTextClasses()', () => {
    it('should generate font-size classes', () => {
      expect(generateTextClasses({ fontSize: 14 })).toContain('text-base');
      expect(generateTextClasses({ fontSize: 24 })).toContain('text-2xl');
      expect(generateTextClasses({ fontSize: 48 })).toContain('text-5xl');
    });
    
    it('should generate font-weight classes', () => {
      expect(generateTextClasses({ fontWeight: 'bold' })).toContain('font-bold');
      expect(generateTextClasses({ fontWeight: 'medium' })).toContain('font-medium');
    });
  });
});

describe('Style Generator', () => {
  describe('generateStyles()', () => {
    it('should extract colors from variables', () => {
      const styles = generateStyles(samplePenData);
      
      expect(styles).toHaveProperty('colors');
      expect(styles.colors.background).toBe('#ffffff');
      expect(styles.colors.foreground).toBe('#09090b');
    });
    
    it('should include themes', () => {
      const styles = generateStyles(samplePenData);
      
      expect(styles).toHaveProperty('themes');
    });
  });
  
  describe('generateCSSVariables()', () => {
    it('should generate CSS custom properties', () => {
      const css = generateCSSVariables(samplePenData.variables);
      
      expect(css).toContain('--background:');
      expect(css).toContain('--foreground:');
      expect(css).toContain('#ffffff');
    });
  });
});

describe('Layout Generator', () => {
  describe('generateLayout()', () => {
    it('should detect flex layout', () => {
      const layout = generateLayout(samplePenData);
      
      expect(layout.type).toBe('flex');
      expect(layout.direction).toBe('flex-col');
    });
    
    it('should extract alignment', () => {
      const layout = generateLayout(samplePenData);
      
      expect(layout.alignment).toHaveProperty('items');
      expect(layout.alignment).toHaveProperty('justify');
    });
    
    it('should extract spacing', () => {
      const layout = generateLayout(samplePenData);
      
      expect(layout.spacing).toHaveProperty('padding');
      expect(layout.spacing).toHaveProperty('gap');
    });
  });
  
  describe('generateFlexLayout()', () => {
    it('should generate flex classes', () => {
      const frame = { layout: 'horizontal', gap: 16 };
      const classes = generateFlexLayout(frame);
      
      expect(classes).toContain('flex');
      expect(classes).toContain('flex-row');
      expect(classes).toContain('gap-4');
    });
  });
});

describe('Responsive Generator', () => {
  describe('generateResponsive()', () => {
    it('should generate breakpoint classes', () => {
      const responsive = generateResponsive(samplePenData);
      
      expect(responsive).toHaveProperty('mobile');
      expect(responsive).toHaveProperty('tablet');
      expect(responsive).toHaveProperty('desktop');
      expect(responsive).toHaveProperty('breakpoints');
    });
  });
  
  describe('generateResponsiveFontSize()', () => {
    it('should generate responsive font sizes', () => {
      expect(generateResponsiveFontSize(48)).toContain('text-3xl');
      expect(generateResponsiveFontSize(48)).toContain('lg:text-5xl');
      
      expect(generateResponsiveFontSize(16)).toContain('text-sm');
      expect(generateResponsiveFontSize(16)).toContain('lg:text-lg');
    });
  });
  
  describe('generateResponsiveWidth()', () => {
    it('should handle fill_container', () => {
      const classes = generateResponsiveWidth('fill_container');
      
      expect(classes).toContain('w-full');
    });
    
    it('should handle numeric width', () => {
      const classes = generateResponsiveWidth(1440);
      
      expect(classes).toContain('md:w-[');
      expect(classes).toContain('lg:w-[1440px]');
    });
  });
});

describe('Integration Tests', () => {
  it('should generate complete component from sample data', () => {
    const result = generate(samplePenData, { componentName: 'IntegrationTest' });
    
    // Verify component structure
    expect(result.componentCode).toContain('import React');
    expect(result.componentCode).toContain('export function IntegrationTest');
    expect(result.componentCode).toContain('Header');
    expect(result.componentCode).toContain('Logo');
    
    // Verify layout
    expect(result.layout.type).toBe('flex');
    
    // Verify responsive
    expect(result.responsive.mobile).toBeTruthy();
    expect(result.responsive.desktop).toBeTruthy();
  });
  
  it('should handle nested frames', () => {
    const nestedData = {
      children: [{
        type: "frame",
        name: "Outer",
        children: [{
          type: "frame",
          name: "Inner",
          children: [{
            type: "text",
            content: "Nested Text",
          }],
        }],
      }],
    };
    
    const result = generate(nestedData, { componentName: 'NestedTest' });
    
    expect(result.componentCode).toContain('Nested Text');
  });
});
