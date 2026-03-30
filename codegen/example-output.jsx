import React from 'react';

/**
 * HeroComponent
 * Auto-generated from Pencil design file
 * 
 * This is an example of generated output from the code generator.
 */
export function HeroComponent() {
  return (
    <div className="flex flex-col py-10 px-20 w-full">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center gap-8 py-16">
        {/* Badge */}
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-900">
          New Launch
        </span>
        
        {/* Title */}
        <h1 className="text-5xl font-bold text-gray-900 text-center">
          Build Beautiful Websites Faster
        </h1>
        
        {/* Description */}
        <p className="text-lg text-gray-600 text-center max-w-2xl">
          A modern platform for creating stunning, responsive websites with 
          intuitive design tools and powerful development features.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-row gap-4 mt-4">
          <button className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition">
            Get Started Free
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">
            Watch Demo
          </button>
        </div>
      </div>
      
      {/* Hero Image */}
      <div className="mt-16 w-full">
        <img 
          src="/hero-image.png" 
          alt="Platform Preview" 
          className="w-full h-auto rounded-lg shadow-xl"
        />
      </div>
    </div>
  );
}

export default HeroComponent;
