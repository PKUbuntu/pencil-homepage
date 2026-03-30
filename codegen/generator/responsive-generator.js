/**
 * Responsive Generator
 * Generates responsive breakpoint classes from design data
 */

/**
 * Generate responsive breakpoints from frame data
 * @param {Object} frameData - Frame JSON data
 * @returns {Object} Responsive breakpoint configuration
 */
export function generateResponsive(frameData) {
  const mainFrame = frameData.children?.[0] || frameData;
  
  return {
    mobile: generateBreakpointClasses(mainFrame, 'mobile'),
    tablet: generateBreakpointClasses(mainFrame, 'tablet'),
    desktop: generateBreakpointClasses(mainFrame, 'desktop'),
    breakpoints: getBreakpointValues(),
  };
}

/**
 * Generate classes for a specific breakpoint
 * @param {Object} frame - Frame data
 * @param {string} breakpoint - Breakpoint name (mobile, tablet, desktop)
 * @returns {string} Classes for the breakpoint
 */
function generateBreakpointClasses(frame, breakpoint) {
  const classes = [];
  
  // Mobile-first approach
  if (breakpoint === 'mobile') {
    // Base classes (mobile)
    if (frame.layout === 'horizontal' || frame.layout === 'vertical') {
      classes.push('flex');
      classes.push(frame.layout === 'horizontal' ? 'flex-col' : 'flex-col');
    }
    
    if (frame.gap) {
      classes.push(`gap-${Math.max(2, (frame.gap / 4 || 0) / 2)}`);
    }
  } else if (breakpoint === 'tablet') {
    // Tablet overrides (md:)
    if (frame.layout === 'horizontal') {
      classes.push('md:flex-row');
    }
    
    if (frame.gap) {
      classes.push(`md:gap-${frame.gap / 4 || 0}`);
    }
  } else if (breakpoint === 'desktop') {
    // Desktop overrides (lg:)
    if (frame.width === 'fill_container') {
      classes.push('lg:w-full');
    }
    
    if (frame.gap) {
      classes.push(`lg:gap-${frame.gap / 4 || 0}`);
    }
  }
  
  return classes.join(' ');
}

/**
 * Get standard breakpoint values
 * @returns {Object} Breakpoint values in pixels
 */
function getBreakpointValues() {
  return {
    mobile: { min: 0, max: 640 },
    tablet: { min: 641, max: 1024 },
    desktop: { min: 1025, max: null },
  };
}

/**
 * Generate responsive width classes
 * @param {number|string} width - Width value
 * @returns {string} Responsive width classes
 */
export function generateResponsiveWidth(width) {
  if (width === 'fill_container') {
    return 'w-full sm:w-full md:w-full lg:w-full';
  }
  
  if (typeof width === 'number') {
    // Scale width for different breakpoints
    const mobileWidth = width * 0.9; // 90% on mobile
    const tabletWidth = width * 0.95; // 95% on tablet
    
    return `w-[${mobileWidth}px] md:w-[${tabletWidth}px] lg:w-[${width}px]`;
  }
  
  return 'w-full';
}

/**
 * Generate responsive height classes
 * @param {number|string} height - Height value
 * @returns {string} Responsive height classes
 */
export function generateResponsiveHeight(height) {
  if (height === 'fit_content') {
    return 'h-auto min-h-fit';
  }
  
  if (height === 'fill_container') {
    return 'h-full';
  }
  
  if (typeof height === 'number') {
    return `h-[${height}px]`;
  }
  
  return 'h-auto';
}

/**
 * Generate responsive font size classes
 * @param {number} fontSize - Font size in pixels
 * @returns {string} Responsive font size classes
 */
export function generateResponsiveFontSize(fontSize) {
  if (!fontSize) return 'text-base';
  
  // Scale font sizes for different breakpoints
  if (fontSize >= 48) {
    return 'text-3xl sm:text-4xl lg:text-5xl';
  } else if (fontSize >= 36) {
    return 'text-2xl sm:text-3xl lg:text-4xl';
  } else if (fontSize >= 30) {
    return 'text-xl sm:text-2xl lg:text-3xl';
  } else if (fontSize >= 24) {
    return 'text-lg sm:text-xl lg:text-2xl';
  } else if (fontSize >= 20) {
    return 'text-base sm:text-lg lg:text-xl';
  } else if (fontSize >= 16) {
    return 'text-sm sm:text-base lg:text-lg';
  } else {
    return 'text-xs sm:text-sm lg:text-base';
  }
}

/**
 * Generate responsive padding classes
 * @param {number|Array} padding - Padding value(s)
 * @returns {string} Responsive padding classes
 */
export function generateResponsivePadding(padding) {
  if (!padding) return '';
  
  const paddings = Array.isArray(padding) ? padding : [padding];
  
  if (paddings.length >= 2) {
    const verticalMobile = Math.max(2, (paddings[0] / 4 || 0) / 2);
    const horizontalMobile = Math.max(2, (paddings[1] / 4 || 0) / 2);
    
    return `py-${verticalMobile} px-${horizontalMobile} md:py-${paddings[0] / 4 || 0} md:px-${paddings[1] / 4 || 0}`;
  }
  
  return `p-${padding / 4 || 0}`;
}

/**
 * Generate responsive gap classes
 * @param {number} gap - Gap value
 * @returns {string} Responsive gap classes
 */
export function generateResponsiveGap(gap) {
  if (!gap) return '';
  
  const mobileGap = Math.max(2, (gap / 4 || 0) / 2);
  
  return `gap-${mobileGap} md:gap-${gap / 4 || 0}`;
}

/**
 * Generate responsive container query classes
 * @param {Object} frame - Frame data
 * @returns {string} Container query classes
 */
export function generateContainerQueries(frame) {
  const classes = [];
  
  // Use container queries for complex responsive behavior
  if (frame.children && frame.children.length > 3) {
    classes.push('@container');
    classes.push('@lg:flex-row @md:flex-col');
  }
  
  return classes.join(' ');
}

/**
 * Check if frame needs responsive treatment
 * @param {Object} frame - Frame data
 * @returns {boolean} Whether responsive classes are needed
 */
export function needsResponsive(frame) {
  // Needs responsive if:
  // 1. Has multiple children
  // 2. Has explicit width/height
  // 3. Uses horizontal layout (often needs stacking on mobile)
  
  return (
    (frame.children && frame.children.length > 1) ||
    (frame.width && typeof frame.width === 'number' && frame.width > 640) ||
    frame.layout === 'horizontal'
  );
}
