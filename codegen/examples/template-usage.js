/**
 * Template System Usage Examples
 * 
 * This file demonstrates how to use the Pencil template system
 * for creating reusable page layouts and components.
 */

import { renderTemplate, renderPage, loadTemplate } from './template-engine/index.js';

// ============================================================================
// Example 1: Using Frame Template
// ============================================================================

console.log('=== Example 1: Frame Template ===');

const frameResult = renderTemplate('frame-template', {
  name: 'HeroSection',
  width: 'fill_container',
  height: 600,
  layout: 'vertical',
  padding: 48,
  gap: 24,
});

console.log('Generated Frame Structure:');
console.log(JSON.stringify(frameResult.structure, null, 2));

// ============================================================================
// Example 2: Using Component Templates (Header/Footer)
// ============================================================================

console.log('\n=== Example 2: Header Component ===');

const headerResult = renderTemplate('components/header', {
  logoText: 'MyBrand',
  navItems: ['Home', 'Products', 'About', 'Contact'],
  ctaText: 'Sign Up Free',
  ctaLink: '/register',
});

console.log('Generated Header Structure:');
console.log(JSON.stringify(headerResult.structure, null, 2));

console.log('\n=== Example 3: Footer Component ===');

const footerResult = renderTemplate('components/footer', {
  columns: [
    { title: 'Product', links: ['Features', 'Pricing', 'API'] },
    { title: 'Company', links: ['About Us', 'Careers', 'Press'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Cookie Policy'] },
  ],
  copyright: '© 2024 MyBrand Inc.',
});

console.log('Generated Footer Structure:');
console.log(JSON.stringify(footerResult.structure, null, 2));

// ============================================================================
// Example 4: Page Template with Default Components
// ============================================================================

console.log('\n=== Example 4: Page with Default Header/Footer ===');

const mainContent = {
  type: 'frame',
  name: 'HomePageContent',
  layout: 'vertical',
  padding: 48,
  gap: 32,
  children: [
    {
      type: 'text',
      name: 'HeroTitle',
      content: 'Welcome to MyBrand',
      fontSize: 48,
      fontWeight: 'bold',
    },
    {
      type: 'text',
      name: 'HeroSubtitle',
      content: 'Build beautiful websites with Pencil',
      fontSize: 20,
      fill: '$--muted-foreground',
    },
  ],
};

const pageResult = renderPage({
  main: mainContent,
  // header and footer will use defaults (components/header and components/footer)
});

console.log('Generated Page Structure:');
console.log(JSON.stringify(pageResult.structure, null, 2));

// ============================================================================
// Example 5: Page Template with Custom Components
// ============================================================================

console.log('\n=== Example 5: Page with Custom Header ===');

const customHeader = {
  type: 'frame',
  name: 'MinimalHeader',
  height: 48,
  layout: 'horizontal',
  justifyContent: 'center',
  children: [
    {
      type: 'text',
      name: 'Logo',
      content: 'Minimal',
      fontSize: 18,
    },
  ],
};

const customPageResult = renderPage({
  main: mainContent,
  header: customHeader,
  // footer will use default
});

console.log('Generated Custom Page Structure:');
console.log(JSON.stringify(customPageResult.structure, null, 2));

// ============================================================================
// Example 6: Nested Templates (Template within Template)
// ============================================================================

console.log('\n=== Example 6: Nested Templates ===');

// Create a card template reference within main content
const cardContent = {
  type: 'frame',
  name: 'CardGrid',
  layout: 'grid',
  columns: 3,
  gap: 24,
  children: [
    {
      type: 'reference',
      ref: 'frame-template',
      props: {
        name: 'Card1',
        layout: 'vertical',
        padding: 24,
      },
    },
    {
      type: 'reference',
      ref: 'frame-template',
      props: {
        name: 'Card2',
        layout: 'vertical',
        padding: 24,
      },
    },
  ],
};

const nestedPageResult = renderPage({
  main: cardContent,
});

console.log('Generated Nested Page Structure:');
console.log(JSON.stringify(nestedPageResult.structure, null, 2));

// ============================================================================
// Example 7: Loading Template Metadata
// ============================================================================

console.log('\n=== Example 7: Template Metadata ===');

const pageTemplate = loadTemplate('page-template');
console.log('Page Template Info:');
console.log(`  Name: ${pageTemplate.name}`);
console.log(`  Version: ${pageTemplate.version}`);
console.log(`  Description: ${pageTemplate.description}`);
console.log(`  Slots: ${Object.keys(pageTemplate.slots).join(', ')}`);

const headerTemplate = loadTemplate('components/header');
console.log('\nHeader Template Parameters:');
for (const [key, param] of Object.entries(headerTemplate.parameters)) {
  console.log(`  ${key}: ${param.description} (default: ${param.default})`);
}

console.log('\n=== Examples Complete ===');
