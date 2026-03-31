#!/usr/bin/env node

/**
 * Tests for WunderGraph Configuration Generator
 * 
 * Run: node wundergraph/generate-wundergraph-config.test.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const WUNDERGRAPH_DIR = path.resolve(ROOT_DIR, 'wundergraph');
const OPERATIONS_DIR = path.resolve(WUNDERGRAPH_DIR, 'operations');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
    passed++;
  } catch (error) {
    console.error(`✗ ${name}`);
    console.error(`  Error: ${error.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertFileExists(filePath) {
  assert(fs.existsSync(filePath), `File not found: ${filePath}`);
}

console.log('🧪 Running WunderGraph Config Generator Tests\n');

// Test 1: Check that wundergraph.config.ts exists
test('wundergraph.config.ts should exist', () => {
  assertFileExists(path.resolve(WUNDERGRAPH_DIR, 'wundergraph.config.ts'));
});

// Test 2: Check that types.ts exists
test('types.ts should exist', () => {
  assertFileExists(path.resolve(WUNDERGRAPH_DIR, 'types.ts'));
});

// Test 3: Check that types.ts exports interfaces
test('types.ts should export interfaces', () => {
  const typesContent = fs.readFileSync(path.resolve(WUNDERGRAPH_DIR, 'types.ts'), 'utf8');
  assert(typesContent.includes('export interface'), 'types.ts should export interfaces');
});

// Test 4: Check that operations directory exists
test('operations directory should exist', () => {
  assert(fs.existsSync(OPERATIONS_DIR), 'operations directory not found');
});

// Test 5: Check that operation files exist
test('operation files should exist', () => {
  const operationFiles = fs.readdirSync(OPERATIONS_DIR).filter(f => f.endsWith('.graphql'));
  assert(operationFiles.length > 0, 'No operation files found');
});

// Test 6: Check that openapi.yaml exists
test('openapi.yaml should exist', () => {
  assertFileExists(path.resolve(WUNDERGRAPH_DIR, 'openapi.yaml'));
});

// Test 7: Validate OpenAPI spec structure
test('openapi.yaml should be valid OpenAPI spec', () => {
  const openapiContent = fs.readFileSync(path.resolve(WUNDERGRAPH_DIR, 'openapi.yaml'), 'utf8');
  const openapi = yaml.load(openapiContent);
  assert(openapi.openapi?.startsWith('3.0'), 'Invalid OpenAPI version');
  assert(openapi.info, 'Missing info section');
  assert(openapi.paths, 'Missing paths section');
});

// Test 8: Check that wundergraph.config.ts imports SDK
test('wundergraph.config.ts should import WunderGraph SDK', () => {
  const configContent = fs.readFileSync(path.resolve(WUNDERGRAPH_DIR, 'wundergraph.config.ts'), 'utf8');
  assert(configContent.includes('@wundergraph/sdk'), 'Missing SDK import');
});

// Test 9: Check that configureWunderGraphApplication is called
test('wundergraph.config.ts should call configureWunderGraphApplication', () => {
  const configContent = fs.readFileSync(path.resolve(WUNDERGRAPH_DIR, 'wundergraph.config.ts'), 'utf8');
  assert(configContent.includes('configureWunderGraphApplication'), 'Missing configureWunderGraphApplication call');
});

// Test 10: Check operation file format
test('operation files should have valid GraphQL format', () => {
  const operationFiles = fs.readdirSync(OPERATIONS_DIR).filter(f => f.endsWith('.graphql'));
  for (const file of operationFiles) {
    const content = fs.readFileSync(path.resolve(OPERATIONS_DIR, file), 'utf8');
    assert(content.includes('query') || content.includes('mutation'), `${file} should contain query or mutation`);
  }
});

console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  process.exit(1);
}
