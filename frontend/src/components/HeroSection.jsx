import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Building2, Users, Award, MapPin } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        setIsSearching(true);
        dispatch(setSearchedQuery(query));
        
        // Simulate a small delay for better UX
        setTimeout(() => {
            navigate("/browse");
            setIsSearching(false);
        }, 500);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchJobHandler();
        }
    }

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16 md:py-24">
            {/* Background image with gradient fade overlay */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{ 
                    backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80')", 
                }}
            >
                {/* Gradient overlay for fading effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent opacity-40"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-r from-[#6A38C2]/10 to-[#F83002]/10 transform -skew-y-3 -translate-y-16"></div>
            
            <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                    <div className="inline-flex items-center justify-center">
                        <span className="px-4 py-2 rounded-full bg-white text-[#6A38C2] font-medium border border-[#6A38C2]/20 shadow-sm flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            No. 1 Job Hunt Website in 2023
                        </span>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                        Find Your <span className="text-[#6A38C2]">Dream Job</span><br />Without the Struggle
                    </h1>
                    
                    <p className="text-lg md:text-xl text-black-1200 max-w-2xl mx-auto">
                        Discover opportunities from top companies around the world. Your next career move is just a search away.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto mt-2 bg-white p-2 rounded-2xl shadow-lg border border-gray-100">
                        <div className="flex flex-1 items-center gap-2 px-4 py-2">
                            <Search className="h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Job title, keywords, or company"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="outline-none border-none w-full text-lg py-2"
                            />
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 border-l border-gray-200">
                            <MapPin className="h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Location"
                                className="outline-none border-none w-full text-lg py-2"
                            />
                        </div>
                        <Button 
                            onClick={searchJobHandler} 
                            disabled={isSearching}
                            className="rounded-xl bg-[#6A38C2] hover:bg-[#5d2db0] px-6 py-3 h-auto text-base font-medium transition-all duration-200 transform hover:scale-105"
                        >
                            {isSearching ? (
                                <div className="flex items-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Searching...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Search className="h-5 w-5" />
                                    Search Jobs
                                </div>
                            )}
                        </Button>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-6 mt-8 text-black-600">
                        <div className="flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-[#6A38C2]-300" />
                            <span>10,000+ Companies</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-[#6A38C2]100" />
                            <span>50,000+ Job Seekers Hired</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection