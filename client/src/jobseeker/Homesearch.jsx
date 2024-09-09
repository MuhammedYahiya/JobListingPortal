import React from 'react'
import JobCarousel from '../ui/JobCarousel'
import "./Homesearch.css"

const Homesearch = () => {
    return (
        <div className='text-center'>
            <div>
                <h1>No. 1 Job Hunt Website</h1>
                <p style={{ textAlign: 'center', marginBottom: '20px' }}>
                    Search, Apply & Get Your Dream Jobs
                </p>

                <div className="search-bar-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Find your dream jobs"
                    />
                    <button className="search-button">
                        <i className="search-icon">🔍</i>
                    </button>
                </div>
                <JobCarousel/>
            </div>
        </div>
    )
}

export default Homesearch
