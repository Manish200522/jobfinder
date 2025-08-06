import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchJobHandler();
        }
    }

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background Video */}
            <video 
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 z-0 h-full w-full object-cover"
            >
                <source src="/public/bg video mp4.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            
            {/* Dark overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/30 z-0"></div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <div className="flex flex-col gap-5 max-w-4xl mx-auto">
                    <span className="inline-block mx-auto px-4 py-2 rounded-full bg-gray-100/90 text-[#F83002] font-medium backdrop-blur-sm">
                        No. 1 Job Hunt Website
                    </span>
                    
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                        Search, Apply & <br /> 
                        Get Your <span className="text-[#6A38C2]">Dream Job</span>
                    </h1>
                    
                    <p className="text-lg text-gray-100 md:text-xl">
                        Find your perfect job match from thousands of listings across various industries.
                    </p>
                    
                    <div className="flex w-full max-w-2xl shadow-lg bg-white pl-3 pr-1 rounded-full items-center gap-2 mx-auto">
                        <input
                            type="text"
                            placeholder="Find your dream job"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="outline-none border-none w-full py-4 text-gray-800 placeholder-gray-400"
                        />
                        <Button 
                            onClick={searchJobHandler} 
                            className="rounded-full bg-[#6A38C2] hover:bg-[#5D30B0] h-12 w-12 p-0"
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;