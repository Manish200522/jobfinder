import React, { useState, useEffect } from "react";
import { User, Briefcase, CheckCircle, Camera, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CandidateDashboard() {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // Candidate profile
  const [candidate, setCandidate] = useState({
    name: "Rahul Sharma",
    email: "rahul@example.com",
    appliedCount: 5,
    shortlistedCount: 2,
    profilePic: null,
  });

  // Applications (mocked API data)
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const mockData = [
      { id: 1, company: "TechSoft Pvt Ltd", role: "Frontend Intern", status: "Shortlisted" },
      { id: 2, company: "InnoWeb Solutions", role: "React Developer Intern", status: "Applied" },
      { id: 3, company: "CloudX Labs", role: "Backend Intern", status: "Selected" },
      { id: 4, company: "Designify", role: "UI/UX Intern", status: "Applied" },
    ];
    setApplications(mockData);
    setFilteredApps(mockData);
  }, []);

  // Filter applications
  const filterApplications = (status) => {
    setActiveFilter(status);
    if (status === "All") {
      setFilteredApps(applications);
    } else {
      setFilteredApps(applications.filter((app) => app.status === status));
    }
  };

  // Profile picture upload
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCandidate({ ...candidate, profilePic: URL.createObjectURL(file) });
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""} transition-colors duration-500`}>
      <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Candidate Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back, {candidate.name}</p>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mt-3 md:mt-0 flex items-center space-x-2 px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </header>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 mb-6 flex items-center space-x-4"
        >
          <div className="relative">
            <img
              src={candidate.profilePic || "https://via.placeholder.com/80"}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border dark:border-gray-700"
            />
            <label
              htmlFor="profile-upload"
              className="absolute bottom-0 right-0 bg-blue-600 p-1 rounded-full cursor-pointer"
            >
              <Camera className="text-white w-4 h-4" />
            </label>
            <input
              type="file"
              id="profile-upload"
              className="hidden"
              onChange={handleProfilePicChange}
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{candidate.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{candidate.email}</p>
            <div className="flex space-x-4 mt-2">
              <span className="flex items-center space-x-1">
                <Briefcase className="w-4 h-4 text-green-500" />
                <span>Applied: {candidate.appliedCount}</span>
              </span>
              <span className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-yellow-500" />
                <span>Shortlisted: {candidate.shortlistedCount}</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-4">
          {["All", "Applied", "Shortlisted", "Selected"].map((status) => (
            <button
              key={status}
              onClick={() => filterApplications(status)}
              className={`px-4 py-2 rounded-full border ${
                activeFilter === status
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 dark:text-gray-200 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Applications List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 shadow rounded-lg p-4"
        >
          <h2 className="text-lg font-semibold mb-3">My Applications</h2>
          <AnimatePresence>
            {filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-between items-center p-3 border-b last:border-0 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                >
                  <div>
                    <p className="font-medium">{app.role}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{app.company}</p>
                  </div>
                  <span
                    className={`font-medium ${
                      app.status === "Shortlisted"
                        ? "text-yellow-500"
                        : app.status === "Applied"
                        ? "text-blue-500"
                        : "text-green-500"
                    }`}
                  >
                    {app.status}
                  </span>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No applications found.
              </p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
