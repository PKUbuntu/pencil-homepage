/**
 * Example: Parse Homepage.pen and output structured JSON
 */

import { readFileSync, writeFileSync } from 'fs';
import { parsePenFile, toJSON } from './pen-parser';

const penFilePath = process.argv[2] || 'Homepage.pen';

console.log(`Parsing ${penFilePath}...`);

try {
  const content = readFileSync(penFilePath, 'utf-8');
  const result = parsePenFile(content);

  if (!result.success) {
    console.error('Parse failed:', result.error);
    process.exit(1);
  }

  console.log('\n✅ Parse successful!\n');
  console.log('📊 Statistics:');
  console.log(`   - Total elements: ${result.stats.totalElements}`);
  console.log(`   - Frames: ${result.stats.frameCount}`);
  console.log(`   - Text elements: ${result.stats.textCount}`);
  console.log(`   - Shapes (rect/circle/line): ${result.stats.shapeCount}`);
  console.log(`   - Color variables: ${result.elements.colors.length}`);
  console.log('\n📁 Structure:');
  console.log(`   - Version: ${result.data?.version}`);
  console.log(`   - Themes: ${result.data?.themes ? Object.keys(result.data.themes).join(', ') : 'none'}`);
  console.log(`   - Variables: ${result.data?.variables ? Object.keys(result.data.variables).length : 0} defined`);

  // Output structured JSON
  const output = {
    metadata: {
      source: penFilePath,
      parsedAt: new Date().toISOString(),
      version: result.data?.version
    },
    statistics: result.stats,
    themes: result.data?.themes,
    variables: result.data?.variables,
    elements: {
      frames: result.elements.frames,
      texts: result.elements.texts,
      rectangles: result.elements.rectangles,
      circles: result.elements.circles,
      lines: result.elements.lines
    }
  };

  const jsonOutput = toJSON(output, 2);
  
  // Write to output file
  const outputFile = 'codegen/parser/output/Homepage.parsed.json';
  writeFileSync(outputFile, jsonOutput, 'utf-8');
  console.log(`\n💾 Output written to: ${outputFile}`);

  // Show first few frames as preview
  console.log('\n📋 Preview (first 3 frames):');
  result.elements.frames.slice(0, 3).forEach((frame, i) => {
    console.log(`   ${i + 1}. [${frame.type}] "${frame.name || 'unnamed'}" (${frame.id})`);
    if (frame.width && frame.height) {
      console.log(`      Size: ${frame.width} x ${frame.height}`);
    }
    if (frame.children?.length) {
      console.log(`      Children: ${frame.children.length} elements`);
    }
  });

  // Show first few text elements
  console.log('\n📝 Preview (first 5 text elements):');
  result.elements.texts.slice(0, 5).forEach((text, i) => {
    const preview = text.content.length > 40 ? text.content.substring(0, 40) + '...' : text.content;
    console.log(`   ${i + 1}. "${preview}"`);
    if (text.fontSize) {
      console.log(`      Font: ${text.fontFamily || 'default'} ${text.fontSize}px ${text.fontWeight || ''}`);
    }
  });

} catch (error) {
  console.error('Error:', error instanceof Error ? error.message : error);
  process.exit(1);
}
