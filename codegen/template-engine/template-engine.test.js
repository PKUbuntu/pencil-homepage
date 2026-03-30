/**
 * Template Engine Tests
 */

import { describe, it, expect } from 'vitest';
import { loadTemplate, renderTemplate, renderPage, substituteParams } from './index.js';

describe('Template Engine', () => {
  describe('loadTemplate', () => {
    it('should load page-template', () => {
      const template = loadTemplate('page-template');
      expect(template.name).toBe('PageTemplate');
      expect(template.slots).toBeDefined();
      expect(template.slots.main).toBeDefined();
    });

    it('should load frame-template', () => {
      const template = loadTemplate('frame-template');
      expect(template.name).toBe('FrameTemplate');
      expect(template.parameters).toBeDefined();
    });

    it('should load component templates', () => {
      const header = loadTemplate('components/header');
      expect(header.name).toBe('Header');
      
      const footer = loadTemplate('components/footer');
      expect(footer.name).toBe('Footer');
    });
  });

  describe('substituteParams', () => {
    it('should substitute simple parameters', () => {
      const structure = {
        name: '${name}',
        width: '${width}',
      };
      const params = { name: 'TestFrame', width: 800 };
      const result = substituteParams(structure, params);
      
      expect(result.name).toBe('TestFrame');
      expect(result.width).toBe(800);
    });

    it('should handle nested structures', () => {
      const structure = {
        type: 'frame',
        name: '${name}',
        children: [
          { type: 'text', content: '${text}' },
        ],
      };
      const params = { name: 'Parent', text: 'Hello' };
      const result = substituteParams(structure, params);
      
      expect(result.name).toBe('Parent');
      expect(result.children[0].content).toBe('Hello');
    });

    it('should preserve non-parameter values', () => {
      const structure = {
        type: 'frame',
        layout: 'vertical',
        name: '${name}',
      };
      const params = { name: 'Test' };
      const result = substituteParams(structure, params);
      
      expect(result.type).toBe('frame');
      expect(result.layout).toBe('vertical');
      expect(result.name).toBe('Test');
    });
  });

  describe('renderTemplate', () => {
    it('should render frame template with parameters', () => {
      const result = renderTemplate('frame-template', {
        name: 'MyFrame',
        width: 1200,
        layout: 'horizontal',
      });

      expect(result.name).toBe('FrameTemplate');
      expect(result.structure.name).toBe('MyFrame');
      expect(result.structure.width).toBe(1200);
      expect(result.structure.layout).toBe('horizontal');
    });

    it('should use default parameters when not provided', () => {
      const result = renderTemplate('frame-template', {
        name: 'DefaultFrame',
      });

      expect(result.structure.width).toBe('fill_container');
      expect(result.structure.layout).toBe('vertical');
    });

    it('should include metadata', () => {
      const result = renderTemplate('frame-template', { name: 'Test' });
      
      expect(result.metadata).toBeDefined();
      expect(result.metadata.template).toBe('frame-template');
      expect(result.metadata.params.name).toBe('Test');
      expect(result.metadata.renderedAt).toBeDefined();
    });
  });

  describe('renderPage', () => {
    it('should render page with main slot', () => {
      const mainContent = {
        type: 'frame',
        name: 'MainContent',
        children: [],
      };

      const result = renderPage({ main: mainContent });

      expect(result.name).toBe('Page');
      expect(result.structure.children).toHaveLength(3);
      expect(result.structure.children[1].name).toBe('main');
    });

    it('should use default header/footer when not provided', () => {
      const mainContent = {
        type: 'frame',
        name: 'MainContent',
      };

      const result = renderPage({ main: mainContent });

      // Header and footer should be resolved from references to actual frames
      expect(result.structure.children[0].type).toBe('frame');
      expect(result.structure.children[0].name).toBe('header');
      expect(result.structure.children[0].children).toBeDefined();
      expect(result.structure.children[2].type).toBe('frame');
      expect(result.structure.children[2].name).toBe('footer');
    });

    it('should accept custom header/footer', () => {
      const mainContent = { type: 'frame', name: 'Main' };
      const customHeader = { type: 'frame', name: 'CustomHeader' };
      const customFooter = { type: 'frame', name: 'CustomFooter' };

      const result = renderPage({
        main: mainContent,
        header: customHeader,
        footer: customFooter,
      });

      // Slot names take precedence (header, main, footer)
      expect(result.structure.children[0].name).toBe('header');
      expect(result.structure.children[0].type).toBe('frame');
      expect(result.structure.children[1].name).toBe('main');
      expect(result.structure.children[2].name).toBe('footer');
    });

    it('should throw error when main slot is missing', () => {
      expect(() => renderPage({})).toThrow('requires "main" slot content');
    });
  });
});
