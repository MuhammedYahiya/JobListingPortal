// MainSearchPage.jsx
import React from 'react';
import './Search.css';

function Search() {
  const handleSearch = (e) => {
    e.preventDefault();
    
    console.log('Search button clicked');
  };

  return (
    <div className="main-search-page">
    
      <div className="search-bar-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for jobs, companies..."
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

    
      <div className="filters-container">
        <button className="filter-button">Full Time</button>
        <button className="filter-button">Part Time</button>
        <button className="filter-button">Remote</button>
        <button className="filter-button">Internship</button>
      </div>


      <div className="job-listings">
        <div className="job-card">
          <h3 className="job-title">Software Developer</h3>
          <p className="company-name">Tech Company</p>
          <p className="job-location">New York, NY</p>
          <button className="apply-button">Apply Now</button>
        </div>

        
        <div className="job-card">
          <h3 className="job-title">Data Scientist</h3>
          <p className="company-name">Data Analytics Firm</p>
          <p className="job-location">San Francisco, CA</p>
          <button className="apply-button">Apply Now</button>
        </div>
      </div>
    </div>
  );
}

export default Search;
