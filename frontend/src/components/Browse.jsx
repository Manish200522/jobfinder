import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const dispatch = useDispatch();
    
    // State for filters
    const [filters, setFilters] = useState({
        jobType: '',
        experience: '',
        remote: '',
        sort: 'newest'
    });
    
    // State for filtered jobs
    const [filteredJobs, setFilteredJobs] = useState(allJobs);
    
    // State for mobile filters visibility
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    
    // State for current page (if implementing pagination)
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 9;
    
    // Filter jobs based on filters and search query
    useEffect(() => {
        let result = allJobs;
        
        // Apply search query filter
        if (searchedQuery) {
            const query = searchedQuery.toLowerCase();
            result = result.filter(job => 
                job.jobTitle?.toLowerCase().includes(query) ||
                job.companyName?.toLowerCase().includes(query) ||
                job.jobLocation?.toLowerCase().includes(query) ||
                job.employmentType?.toLowerCase().includes(query)
            );
        }
        
        // Apply job type filter
        if (filters.jobType) {
            result = result.filter(job => job.employmentType === filters.jobType);
        }
        
        // Apply experience filter
        if (filters.experience) {
            result = result.filter(job => {
                if (filters.experience === 'entry' && job.minExp <= 2) return true;
                if (filters.experience === 'mid' && job.minExp > 2 && job.minExp <= 5) return true;
                if (filters.experience === 'senior' && job.minExp > 5) return true;
                return false;
            });
        }
        
        // Apply remote filter
        if (filters.remote) {
            const isRemote = filters.remote === 'yes';
            result = result.filter(job => job.remote === isRemote);
        }
        
        // Apply sorting
        if (filters.sort === 'newest') {
            result = [...result].sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
        } else if (filters.sort === 'salary-high') {
            result = [...result].sort((a, b) => (b.maxSalary || 0) - (a.maxSalary || 0));
        } else if (filters.sort === 'salary-low') {
            result = [...result].sort((a, b) => (a.minSalary || 0) - (b.minSalary || 0));
        }
        
        setFilteredJobs(result);
        setCurrentPage(1); // Reset to first page when filters change
    }, [allJobs, searchedQuery, filters]);
    
    // Calculate pagination
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    
    // Handle filter changes
    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };
    
    // Clear all filters
    const clearFilters = () => {
        setFilters({
            jobType: '',
            experience: '',
            remote: '',
            sort: 'newest'
        });
    };
    
    // Reset component when unmounting
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Browse Jobs</h1>
                    <p className="text-gray-600 mt-2">
                        Find your next career opportunity from {allJobs.length} available positions
                    </p>
                    
                    {/* Search Stats */}
                    {searchedQuery && (
                        <div className="mt-4 bg-indigo-50 p-3 rounded-lg inline-block">
                            <p className="text-indigo-800">
                                Showing results for: <span className="font-semibold">"{searchedQuery}"</span>
                                <button 
                                    onClick={() => dispatch(setSearchedQuery(""))}
                                    className="ml-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                >
                                    Clear search
                                </button>
                            </p>
                        </div>
                    )}
                </div>
                
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="w-full md:w-1/4">
                        {/* Mobile Filters Toggle */}
                        <button 
                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                            className="md:hidden w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4"
                        >
                            <span className="font-medium">Filters</span>
                            <svg 
                                className={`w-5 h-5 transform ${showMobileFilters ? 'rotate-180' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        
                        {/* Filters Panel */}
                        <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                                <button 
                                    onClick={clearFilters}
                                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                                >
                                    Clear all
                                </button>
                            </div>
                            
                            {/* Job Type Filter */}
                            <div className="mb-6">
                                <h3 className="font-medium text-gray-900 mb-3">Job Type</h3>
                                <div className="space-y-2">
                                    {['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => (
                                        <label key={type} className="flex items-center">
                                            <input
                                                type="radio"
                                                name="jobType"
                                                checked={filters.jobType === type}
                                                onChange={() => handleFilterChange('jobType', filters.jobType === type ? '' : type)}
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                            <span className="ml-2 text-gray-700">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Experience Level Filter */}
                            <div className="mb-6">
                                <h3 className="font-medium text-gray-900 mb-3">Experience Level</h3>
                                <div className="space-y-2">
                                    {[
                                        { value: 'entry', label: 'Entry Level (0-2 years)' },
                                        { value: 'mid', label: 'Mid Level (2-5 years)' },
                                        { value: 'senior', label: 'Senior Level (5+ years)' }
                                    ].map(exp => (
                                        <label key={exp.value} className="flex items-center">
                                            <input
                                                type="radio"
                                                name="experience"
                                                checked={filters.experience === exp.value}
                                                onChange={() => handleFilterChange('experience', filters.experience === exp.value ? '' : exp.value)}
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                            <span className="ml-2 text-gray-700">{exp.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Remote Filter */}
                            <div className="mb-6">
                                <h3 className="font-medium text-gray-900 mb-3">Remote</h3>
                                <div className="space-y-2">
                                    {[
                                        { value: 'yes', label: 'Remote Jobs' },
                                        { value: 'no', label: 'On-site Jobs' }
                                    ].map(option => (
                                        <label key={option.value} className="flex items-center">
                                            <input
                                                type="radio"
                                                name="remote"
                                                checked={filters.remote === option.value}
                                                onChange={() => handleFilterChange('remote', filters.remote === option.value ? '' : option.value)}
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                            <span className="ml-2 text-gray-700">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Jobs Listing */}
                    <div className="w-full md:w-3/4">
                        {/* Results Header */}
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <p className="text-gray-700 mb-2 sm:mb-0">
                                Showing <span className="font-semibold">{currentJobs.length}</span> of{' '}
                                <span className="font-semibold">{filteredJobs.length}</span> jobs
                            </p>
                            
                            {/* Sort Dropdown */}
                            <div className="flex items-center">
                                <label className="mr-2 text-gray-700 text-sm">Sort by:</label>
                                <select
                                    value={filters.sort}
                                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                                    className="border border-gray-300 rounded-md py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="salary-high">Salary: High to Low</option>
                                    <option value="salary-low">Salary: Low to High</option>
                                </select>
                            </div>
                        </div>
                        
                        {/* Jobs Grid */}
                        {currentJobs.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {currentJobs.map((job) => (
                                        <Job key={job._id} job={job} />
                                    ))}
                                </div>
                                
                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-8 flex justify-center">
                                        <nav className="flex items-center space-x-2">
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                                className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                            >
                                                Previous
                                            </button>
                                            
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`px-3 py-1.5 rounded border ${
                                                        currentPage === page 
                                                            ? 'bg-indigo-600 text-white border-indigo-600' 
                                                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                            
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                                className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                            >
                                                Next
                                            </button>
                                        </nav>
                                    </div>
                                )}
                            </>
                        ) : (
                            /* No Results State */
                            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">No jobs found</h3>
                                <p className="mt-2 text-gray-500">
                                    Try adjusting your search or filter criteria to find more jobs.
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Browse;