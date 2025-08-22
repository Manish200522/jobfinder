import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { MapPin, Building2, Clock, DollarSign } from 'lucide-react';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  
  // Function to truncate long descriptions
  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Function to format salary display
  const formatSalary = (salary) => {
    return `${salary} LPA`;
  };

  return (
    <div 
      onClick={() => navigate(`/description/${job._id}`)} 
      className="group p-6 rounded-xl bg-white border border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-100 hover:-translate-y-1"
    >
      {/* Header section with company info */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
            <Building2 className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
              {job?.company?.name}
            </h1>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              <span>India</span>
            </div>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span>2 days ago</span>
        </div>
      </div>

      {/* Job title and description */}
      <div className="mb-5">
        <h1 className="font-bold text-xl text-gray-900 mb-2">{job?.title}</h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          {truncateDescription(job?.description)}
        </p>
      </div>

      {/* Badges and metadata */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="bg-blue-100 text-blue-700 font-medium px-3 py-1">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-orange-100 text-orange-700 font-medium px-3 py-1">
          {job?.jobType}
        </Badge>
        <div className="flex items-center ml-auto bg-green-50 text-green-700 font-medium rounded-full px-3 py-1 text-sm">
          <DollarSign className="h-4 w-4 mr-1" />
          {formatSalary(job?.salary)}
        </div>
      </div>

      {/* Apply button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/description/${job._id}`);
        }}
        className="w-full mt-5 bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Apply Now
      </button>
    </div>
  );
};

export default LatestJobCards;