// src/components/FeaturedJobsSection.jsx
import React from 'react';

const FeaturedJobsSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Internships</h2>
              {/* Add your featured jobs list here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example job card */}
          <div className="bg-white shadow-md rounded-lg p-6">          
          </div>
          {/* Add more job cards */}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobsSection;