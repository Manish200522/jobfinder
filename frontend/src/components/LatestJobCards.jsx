import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/job', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:5173',
      },
    })
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load jobs');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="latest-job-cards">
      <h2>Latest Jobs</h2>
      <div className="job-cards">
        {jobs.map(job => (
          <div className="job-card" key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.company?.name}</p>
            <Badge>{job.jobType}</Badge>
            <Button onClick={() => navigate(`/job-details/${job._id}`)}>View Details</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestJobCards;