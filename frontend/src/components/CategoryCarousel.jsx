import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Button } from './ui/button';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from './ui/carousel';

// Icons for each category (using lucide-react icons as example)
import { 
  Monitor, 
  Server, 
  Database, 
  Palette, 
  Code2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const categories = [
  { 
    id: 1, 
    name: "Frontend Developer", 
    icon: Monitor,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-100"
  },
  { 
    id: 2, 
    name: "Backend Developer", 
    icon: Server,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-100"
  },
  { 
    id: 3, 
    name: "Data Science", 
    icon: Database,
    color: "from-green-500 to-teal-500",
    bgColor: "bg-green-100"
  },
  { 
    id: 4, 
    name: "Graphic Designer", 
    icon: Palette,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-100"
  },
  { 
    id: 5, 
    name: "FullStack Developer", 
    icon: Code2,
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-100"
  }
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(null);
  
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Browse by <span className="text-blue-600">Category</span>
      </h2>
      
      <div className="relative group">
        <Carousel 
          opts={{ 
            align: "center",
            loop: true,
          }} 
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <CarouselItem 
                  key={category.id} 
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div 
                    className="p-1"
                    onMouseEnter={() => setIsHovered(category.id)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <Button
                      onClick={() => searchJobHandler(category.name)}
                      variant="outline"
                      className={`
                        h-32 w-full rounded-xl p-4 flex flex-col items-center justify-center 
                        transition-all duration-300 relative overflow-hidden
                        border-2 border-gray-200 hover:border-transparent
                        ${isHovered === category.id ? 'shadow-lg scale-105' : 'shadow-md'}
                      `}
                    >
                      {/* Gradient background on hover */}
                      <div className={`
                        absolute inset-0 opacity-0 transition-opacity duration-300 
                        bg-gradient-to-br ${category.color}
                        ${isHovered === category.id ? 'opacity-10' : ''}
                      `}></div>
                      
                      {/* Icon container */}
                      <div className={`
                        rounded-full p-3 mb-3 transition-colors duration-300
                        ${isHovered === category.id 
                          ? `bg-gradient-to-r ${category.color} text-white` 
                          : `${category.bgColor} text-gray-700`
                        }
                      `}>
                        <IconComponent size={24} />
                      </div>
                      
                      {/* Category name */}
                      <span className={`
                        font-semibold text-center transition-colors duration-300
                        ${isHovered === category.id ? 'text-gray-800' : 'text-gray-600'}
                      `}>
                        {category.name}
                      </span>
                      
                      {/* View jobs text that appears on hover */}
                      <span className={`
                        absolute bottom-3 text-xs font-medium transition-all duration-300
                        text-blue-600 opacity-0
                        ${isHovered === category.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                      `}>
                        View Jobs →
                      </span>
                    </Button>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          
          {/* Custom styled navigation buttons */}
          <CarouselPrevious className="left-0 md:-left-12 top-1/2 -translate-y-1/2 border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 shadow-md hover:shadow-lg transition-all duration-200">
            <ChevronLeft size={24} />
          </CarouselPrevious>
          <CarouselNext className="right-0 md:-right-12 top-1/2 -translate-y-1/2 border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 shadow-md hover:shadow-lg transition-all duration-200">
            <ChevronRight size={24} />
          </CarouselNext>
        </Carousel>
      </div>
      
      {/* Dots indicator for mobile */}
      <div className="flex justify-center mt-6 space-x-2 md:hidden">
        {categories.map((_, index) => (
          <div 
            key={index} 
            className="w-2 h-2 rounded-full bg-gray-300"
          ></div>
        ))}
      </div>
    </div>
  )
}

export default CategoryCarousel;