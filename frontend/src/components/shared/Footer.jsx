import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center">
              <span className="bg-blue-500 p-1 rounded mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </span>
              Job Hunt
            </h2>
            <p className="text-blue-200 text-sm leading-relaxed">
              Connecting talented professionals with top companies worldwide. Your next career move starts here.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://facebook.com" className="bg-blue-800 p-2 rounded-full hover:bg-blue-600 transition-colors duration-300" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" /></svg>
              </a>
              <a href="https://twitter.com" className="bg-blue-800 p-2 rounded-full hover:bg-blue-600 transition-colors duration-300" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z" /></svg>
              </a>
              <a href="https://linkedin.com" className="bg-blue-800 p-2 rounded-full hover:bg-blue-600 transition-colors duration-300" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-blue-700 pb-2">For Job Seekers</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-300 text-sm">Browse Jobs</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-300 text-sm">Career Advice</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-300 text-sm">Upload Resume</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-300 text-sm">Job Alerts</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-300 text-sm">Skill Tests</a></li>
            </ul>
          </div>

          {/* Employers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-blue-700 pb-2">For Employers</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-300 text-sm">Post a Job</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-300 text-sm">Browse Candidates</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-300 text-sm">Pricing Plans</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-300 text-sm">Employer Resources</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-300 text-sm">Recruitment Solutions</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-blue-700 pb-2">Stay Updated</h3>
            <p className="text-blue-200 text-sm">Subscribe to our newsletter for the latest jobs and updates</p>
            {subscribed ? (
              <div className="bg-green-500 text-white p-3 rounded text-sm">
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-blue-800 border border-blue-700 rounded p-2 text-white placeholder-blue-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-400 text-white font-medium py-2 px-4 rounded transition-colors duration-300 text-sm"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-blue-300 text-sm mb-4 md:mb-0">
              <p>© 2024 Job Hunt. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="text-blue-300 hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors duration-300">Cookie Policy</a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors duration-300">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;