import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = () => {
  const navigate = useNavigate();

  return (
    <div className="job-card">
      <div className="job-card-header">
        <h2>Job Title</h2>
        <p>Company Name</p>
      </div>
      <div className="job-card-body">
        <p>Job Description</p>
        <ul>
          <li>Requirement 1</li>
          <li>Requirement 2</li>
          <li>Requirement 3</li>
        </ul>
      </div>
      <div className="job-card-footer">
        <Button onClick={() => navigate('/job-details')}>View Details</Button>
        <Bookmark />
      </div>
    </div>
  );
};

export default Job;