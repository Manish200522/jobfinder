import React, { useState } from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin, Clock, Briefcase, DollarSign } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);
    
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
    const handleSaveJob = (e) => {
        e.stopPropagation();
        setIsSaved(!isSaved);
        // Here you would typically connect to your backend to save the job
    }
    
    const handleCardClick = () => {
        navigate(`/description/${job?._id}`);
    }
    
    return (
        <div 
            className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            onClick={handleCardClick}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-500">
                        {daysAgoFunction(job?.createdAt) === 0 
                            ? "Today" 
                            : `${daysAgoFunction(job?.createdAt)} days ago`
                        }
                    </p>
                </div>
                <Button 
                    variant="ghost" 
                    className={`rounded-full p-2 ${isSaved ? 'text-blue-500' : 'text-gray-400'}`}
                    size="icon"
                    onClick={handleSaveJob}
                >
                    <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                </Button>
            </div>

            <div className="flex items-start gap-4 mb-5">
                <div className="p-1 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                    </Avatar>
                </div>
                <div>
                    <h1 className="font-semibold text-lg text-gray-900">{job?.company?.name}</h1>
                    <div className="flex items-center gap-1 mt-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <p className="text-sm text-gray-500">India</p>
                    </div>
                </div>
            </div>

            <div className="mb-5">
                <h1 className="font-bold text-xl mb-2 text-gray-900">{job?.title}</h1>
                <p className="text-gray-600 line-clamp-2">{job?.description}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="flex items-center gap-1 bg-blue-50 text-blue-700 font-medium px-3 py-1">
                    <Briefcase className="h-3.5 w-3.5" />
                    {job?.position} Positions
                </Badge>
                <Badge className="bg-orange-50 text-orange-700 font-medium px-3 py-1">
                    {job?.jobType}
                </Badge>
                <Badge className="flex items-center gap-1 bg-purple-50 text-purple-700 font-medium px-3 py-1">
                    <DollarSign className="h-3.5 w-3.5" />
                    {job?.salary}LPA
                </Badge>
            </div>
            
            <div className="flex items-center gap-3">
                <Button 
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/description/${job?._id}`);
                    }} 
                    variant="outline" 
                    className="flex-1 border-gray-300 hover:bg-gray-50"
                >
                    View Details
                </Button>
                <Button 
                    onClick={handleSaveJob}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                    {isSaved ? 'Saved' : 'Save For Later'}
                </Button>
            </div>
        </div>
    )
}

export default Job