#!/usr/bin/env node

/**
 * Pencil Code Generator CLI
 * Converts .pen design files to React + Tailwind components
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname, basename } from 'path';
import { generate, generateAll } from './generator/index.js';

const args = process.argv.slice(2);

function printUsage() {
  console.log(`
Pencil Code Generator - Convert .pen files to React components

Usage:
  node codegen/cli.js <input.pen> [options]

Options:
  --output, -o <dir>    Output directory (default: ./src/components)
  --name, -n <name>     Component name (default: auto-generated from file)
  --all, -a             Generate all frames as separate components
  --help, -h            Show this help message

Examples:
  node codegen/cli.js Homepage.pen
  node codegen/cli.js Homepage.pen --output ./src/pages --name HomePage
  node codegen/cli.js Homepage.pen --all

`);
}

function parseArgs(args) {
  const options = {
    input: null,
    output: './src/components',
    name: null,
    all: false,
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--help' || arg === '-h') {
      printUsage();
      process.exit(0);
    } else if (arg === '--output' || arg === '-o') {
      options.output = args[++i];
    } else if (arg === '--name' || arg === '-n') {
      options.name = args[++i];
    } else if (arg === '--all' || arg === '-a') {
      options.all = true;
    } else if (arg.startsWith('-')) {
      console.error(`Unknown option: ${arg}`);
      printUsage();
      process.exit(1);
    } else {
      options.input = arg;
    }
  }
  
  return options;
}

function main() {
  const options = parseArgs(args);
  
  if (!options.input) {
    console.error('Error: No input file specified');
    printUsage();
    process.exit(1);
  }
  
  // Read input .pen file
  const inputPath = options.input;
  if (!existsSync(inputPath)) {
    console.error(`Error: Input file not found: ${inputPath}`);
    process.exit(1);
  }
  
  console.log(`Reading ${inputPath}...`);
  const penData = JSON.parse(readFileSync(inputPath, 'utf8'));
  
  // Determine component name
  let componentName = options.name;
  if (!componentName) {
    const baseName = basename(inputPath, '.pen');
    componentName = baseName
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('') + 'Page';
  }
  
  // Ensure output directory exists
  if (!existsSync(options.output)) {
    mkdirSync(options.output, { recursive: true });
    console.log(`Created output directory: ${options.output}`);
  }
  
  if (options.all) {
    // Generate all frames as separate components
    console.log('Generating all components...');
    const components = generateAll(penData);
    
    components.forEach(comp => {
      const outputPath = join(options.output, `${comp.componentName}.jsx`);
      writeFileSync(outputPath, comp.code);
      console.log(`  ✓ Generated ${comp.componentName}.jsx`);
    });
    
    console.log(`\nGenerated ${components.length} components to ${options.output}`);
  } else {
    // Generate single component
    console.log(`Generating ${componentName}...`);
    const result = generate(penData, {
      outputDir: options.output,
      componentName,
    });
    
    const outputPath = join(options.output, `${componentName}.jsx`);
    writeFileSync(outputPath, result.componentCode);
    
    console.log(`✓ Generated ${componentName}.jsx`);
    console.log(`  Output: ${outputPath}`);
    console.log(`  Styles: ${Object.keys(result.styles).length} style definitions`);
    console.log(`  Layout: ${result.layout.type} layout`);
  }
  
  console.log('\nDone! ✨');
}

main();
