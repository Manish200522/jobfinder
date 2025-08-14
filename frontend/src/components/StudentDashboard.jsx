import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from './shared/Navbar'
import { motion } from 'framer-motion'
import FeaturedJobsSection from './FeaturedJobsSection'



const StudentDashboard = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
  <Navbar />
  <div className="container mx-auto px-4 py-16 text-center">
    <div className="max-w-3xl mx-auto">
      <span className="badge bg-purple-100 text-purple-800">No. 1 Job Hunt Website</span>
      <h1 className="text-5xl font-bold mt-6 leading-tight">
        Find Your Perfect <span className="text-purple-600">Internship</span>
      </h1>
      <p className="text-lg text-gray-600 mt-4">
        
      </p>
      
      <div className="relative mt-8 flex shadow-lg">
        <input
          type="text"
          placeholder="Job title, keywords..."
          className="flex-1 p-4 rounded-l-full border-0 focus:ring-2 focus:ring-purple-300"
        />
        <select className="border-l px-3 bg-gray-50">
          <option>Location</option>
          <option>Remote</option>
        </select>
        <button 
          onClick={searchJobHandler}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-r-full flex items-center"
        >
          <Search className="mr-2" /> Search
        </button>
      </div>

      <div className="mt-10 grid grid-cols-4 gap-4">
        {['🚀 Tech', '🎨 Design', '📊 Business', '🔬 Research'].map((cat) => (
          <button key={cat} className="py-2 px-4 bg-white rounded-lg hover:shadow-md">
            {cat}
          </button>
        ))}
      </div>
    </div>
  </div>

  <FeaturedJobsSection />
</div>
    )
}

export default StudentDashboard

