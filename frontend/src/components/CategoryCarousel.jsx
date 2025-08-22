import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
    {
        name: "Frontend Developer",
        icon: "💻",
        color: "from-blue-500 to-cyan-500"
    },
    {
        name: "Backend Developer",
        icon: "⚙️",
        color: "from-purple-500 to-indigo-500"
    },
    {
        name: "Data Science",
        icon: "📊",
        color: "from-green-500 to-teal-500"
    },
    {
        name: "Graphic Designer",
        icon: "🎨",
        color: "from-pink-500 to-rose-500"
    },
    {
        name: "FullStack Developer",
        icon: "🚀",
        color: "from-orange-500 to-amber-500"
    },
    {
        name: "UX/UI Designer",
        icon: "✨",
        color: "from-violet-500 to-purple-500"
    },
    {
        name: "DevOps Engineer",
        icon: "🔧",
        color: "from-gray-600 to-gray-800"
    },
    {
        name: "Mobile Developer",
        icon: "📱",
        color: "from-indigo-500 to-blue-500"
    }
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="w-full py-12 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Explore by Category</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover opportunities in popular job categories. Find your perfect role from thousands of listings.
                    </p>
                </div>
                
                <div className="relative max-w-6xl mx-auto">
                    <Carousel 
                        opts={{ 
                            align: "start", 
                            loop: true,
                            dragFree: true
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {categories.map((cat, index) => (
                                <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                                    <div 
                                        className="group relative h-full cursor-pointer"
                                        onClick={() => searchJobHandler(cat.name)}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-md group-hover:blur-lg" />
                                        <div className="relative h-full bg-white border border-gray-200 rounded-xl p-5 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 group-hover:border-transparent">
                                            <div className={`inline-flex p-3 rounded-lg mb-4 bg-gradient-to-r ${cat.color} text-white text-2xl`}>
                                                {cat.icon}
                                            </div>
                                            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-800">
                                                {cat.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 group-hover:text-gray-500">
                                                Explore opportunities
                                            </p>
                                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        
                        <div className="flex justify-center mt-8 gap-2">
                            <CarouselPrevious className="relative -left-0 static transform-none bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 shadow-sm" />
                            <CarouselNext className="relative -right-0 static transform-none bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 shadow-sm" />
                        </div>
                    </Carousel>
                </div>
                
                <div className="text-center mt-8">
                    <Button 
                        variant="outline" 
                        className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                        onClick={() => {
                            dispatch(setSearchedQuery(""));
                            navigate("/browse");
                        }}
                    >
                        View All Categories
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CategoryCarousel;