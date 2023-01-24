import React, { useState } from 'react'
import Dashboard from '../components/Dashboard/Dashboard';
import FriendList from '../components/FriendList';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    // Get out of here if you aren't logged in!
    const navigate = useNavigate()
    console.log("Logged in? ", Auth.loggedIn())
      if (!Auth.loggedIn()) {
        navigate("/login");
      };

  // useState to set the correct dashboard component
  const [currentPage, setCurrentPage] = useState('MyActivity')
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  const renderComponent = () => {
    if (currentPage === 'MyActivity') {
      return <Dashboard />
    } else {
      return <Dashboard />
    }
  }


  return (
    <>
      <div className="columns p-4 has-background-white is-justify-content-space-around is-flex-direction-column-mobile">
        <div className="is-3 p-3 is-hidden-mobile">
          <aside className="menu">
            {/* <p className="menu-label">Profile</p> */}
            <ul className="menu-list">
              {/* eslint-disable */}
              <li>
                <a className='has-text-dark has-text-weight-bold' onClick={() => handlePageChange('MyActivity')}>My Activity</a>
              </li>
              <li>
                <a className='has-text-dark has-text-weight-bold' onClick={() => handlePageChange('MyReviews')}>My Reviews</a>
              </li>
              <li>
                <a className='has-text-dark has-text-weight-bold' onClick={() => handlePageChange("Friends")}>Friends</a>
              </li>
              <li>
                <a className='has-text-dark has-text-weight-bold' onClick={() => handlePageChange("WatchParties")}>Watch Parties</a>
              </li>
              {/* eslint-enable */}
            </ul>
          </aside>
        </div>
        {/* Use a navbar in mobile view */}
        <div className="is-3 p-3 is-hidden-tablet">
          <nav className="has-background-white" role="navigation" aria-label="main navigation">
          <div id="mobile-navbar" className="container menu-list is-flex is-justify-content-space-around">
            {/* eslint-disable */}
            <a className='has-text-dark has-text-weight-bold' onClick={() => handlePageChange("Friends")}>Friends</a>
            <a className='has-text-dark has-text-weight-bold' onClick={() => handlePageChange('MyActivity')}>Activity</a>
            <a className='has-text-dark has-text-weight-bold' onClick={() => handlePageChange('MyReviews')}>Reviews</a>
            <a className='has-text-dark has-text-weight-bold' onClick={() => handlePageChange("WatchParties")}>Parties</a>
            {/* eslint-enable */}
          </div>
          </nav>
        </div>
        <div className="column is-9">
          {renderComponent()}
        </div>
      </div>
    </>
  );
}

export default Profile