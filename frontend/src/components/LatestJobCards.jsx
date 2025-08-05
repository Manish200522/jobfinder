import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = () => {
  const navigate = useNavigate();

  return (
    <div className="latest-job-cards">
      <h2>Latest Jobs</h2>
      <div className="job-cards">
        <div className="job-card">
          <h3>Job Title 1</h3>
          <p>Company Name 1</p>
          <Badge>Full-time</Badge>
          <Button onClick={() => navigate('/job-details')}>View Details</Button>
        </div>
        <div className="job-card">
          <h3>Job Title 2</h3>
          <p>Company Name 2</p>
          <Badge>Part-time</Badge>
          <Button onClick={() => navigate('/job-details')}>View Details</Button>
        </div>
        <div className="job-card">
          <h3>Job Title 3</h3>
          <p>Company Name 3</p>
          <Badge>Internship</Badge>
          <Button onClick={() => navigate('/job-details')}>View Details</Button>
        </div>
      </div>
    </div>
  );
};

export default LatestJobCards;