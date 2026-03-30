/**
 * Layout Generator
 * Generates Flexbox and Grid layouts from design data
 */

/**
 * Generate layout structure from frame data
 * @param {Object} frameData - Frame JSON data
 * @returns {Object} Layout configuration
 */
export function generateLayout(frameData) {
  const mainFrame = frameData.children?.[0] || frameData;
  
  return {
    type: detectLayoutType(mainFrame),
    direction: getFlexDirection(mainFrame),
    alignment: getAlignment(mainFrame),
    spacing: getSpacing(mainFrame),
    children: generateChildrenLayout(mainFrame.children || []),
  };
}

/**
 * Detect layout type (flex, grid, or none)
 * @param {Object} frame - Frame data
 * @returns {string} Layout type
 */
function detectLayoutType(frame) {
  if (frame.layout === 'horizontal' || frame.layout === 'vertical') {
    return 'flex';
  }
  
  // Check for grid-like structure
  if (frame.children && frame.children.length > 4) {
    const hasUniformWidths = frame.children.every(
      child => child.width && typeof child.width === 'number'
    );
    if (hasUniformWidths) {
      return 'grid';
    }
  }
  
  return 'flex';
}

/**
 * Get flex direction from frame layout
 * @param {Object} frame - Frame data
 * @returns {string} Flex direction class
 */
function getFlexDirection(frame) {
  if (frame.layout === 'horizontal') {
    return 'flex-row';
  } else if (frame.layout === 'vertical') {
    return 'flex-col';
  }
  return 'flex-row';
}

/**
 * Get alignment classes from frame
 * @param {Object} frame - Frame data
 * @returns {Object} Alignment classes
 */
function getAlignment(frame) {
  return {
    items: frame.alignItems ? `items-${frame.alignItems.replace('_', '-')}` : 'items-stretch',
    justify: frame.justifyContent ? `justify-${frame.justifyContent.replace('_', '-')}` : 'justify-start',
    content: frame.alignContent ? `content-${frame.alignContent.replace('_', '-')}` : 'content-normal',
  };
}

/**
 * Get spacing configuration from frame
 * @param {Object} frame - Frame data
 * @returns {Object} Spacing configuration
 */
function getSpacing(frame) {
  const spacing = {};
  
  if (frame.padding) {
    const padding = Array.isArray(frame.padding) ? frame.padding : [frame.padding];
    spacing.padding = {
      top: padding[0] || 0,
      right: padding[1] || padding[0] || 0,
      bottom: padding[2] || padding[0] || 0,
      left: padding[3] || padding[1] || 0,
    };
  }
  
  if (frame.gap) {
    spacing.gap = frame.gap;
  }
  
  return spacing;
}

/**
 * Generate layout for children
 * @param {Array} children - Children array
 * @returns {Array} Layout configurations for each child
 */
function generateChildrenLayout(children) {
  return children.map(child => {
    const layout = {
      name: child.name || 'Unnamed',
      type: child.type,
    };
    
    if (child.type === 'frame') {
      layout.layout = generateLayout(child);
    }
    
    // Size constraints
    if (child.width) {
      layout.width = child.width === 'fill_container' ? 'full' : child.width;
    }
    if (child.height) {
      layout.height = child.height === 'fill_container' ? 'full' : child.height;
    }
    
    return layout;
  });
}

/**
 * Generate grid layout classes
 * @param {Object} frame - Frame data
 * @param {number} columns - Number of columns
 * @returns {string} Grid classes
 */
export function generateGridLayout(frame, columns = 3) {
  const classes = [];
  
  classes.push('grid');
  classes.push(`grid-cols-${columns}`);
  
  if (frame.gap) {
    classes.push(`gap-${frame.gap / 4 || 0}`);
  }
  
  return classes.join(' ');
}

/**
 * Generate flex layout classes
 * @param {Object} frame - Frame data
 * @returns {string} Flex classes
 */
export function generateFlexLayout(frame) {
  const classes = ['flex'];
  
  // Direction
  if (frame.layout === 'horizontal') {
    classes.push('flex-row');
  } else if (frame.layout === 'vertical') {
    classes.push('flex-col');
  }
  
  // Wrap
  if (frame.layoutWrap === 'wrap') {
    classes.push('flex-wrap');
  }
  
  // Alignment
  if (frame.alignItems) {
    classes.push(`items-${frame.alignItems.replace('_', '-')}`);
  }
  
  if (frame.justifyContent) {
    classes.push(`justify-${frame.justifyContent.replace('_', '-')}`);
  }
  
  // Spacing
  if (frame.gap) {
    classes.push(`gap-${frame.gap / 4 || 0}`);
  }
  
  return classes.join(' ');
}

/**
 * Generate responsive layout classes
 * @param {Object} frame - Frame data
 * @returns {Object} Responsive layout configuration
 */
export function generateResponsiveLayout(frame) {
  const baseLayout = generateFlexLayout(frame);
  
  return {
    mobile: baseLayout,
    tablet: generateTabletLayout(frame),
    desktop: generateDesktopLayout(frame),
  };
}

/**
 * Generate tablet-specific layout
 * @param {Object} frame - Frame data
 * @returns {string} Tablet layout classes
 */
function generateTabletLayout(frame) {
  // Tablet typically switches to fewer columns or different direction
  if (frame.layout === 'horizontal' && frame.children?.length > 3) {
    return 'flex flex-col md:flex-row';
  }
  return 'flex';
}

/**
 * Generate desktop-specific layout
 * @param {Object} frame - Frame data
 * @returns {string} Desktop layout classes
 */
function generateDesktopLayout(frame) {
  // Desktop can use full horizontal layout
  if (frame.layout === 'horizontal') {
    return 'flex flex-row';
  } else if (frame.layout === 'vertical') {
    return 'flex flex-col';
  }
  return 'flex';
}
