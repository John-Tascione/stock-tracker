import React, { useState } from 'react'
import Dashboard from '../../components/Dashboard/Dashboard';
import StockSearch from '../../components/StockSearch/stockSearch';
import SavedStocks from '../../components/MyStocks/myStocks';
import Auth from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import './profile.css'

const Profile = () => {
    // Get out of here if you aren't logged in!
    const navigate = useNavigate()
    console.log("Logged in? ", Auth.loggedIn())
      if (!Auth.loggedIn()) {
        navigate("/login");
      };

  // useState to set the correct dashboard component
  const [currentPage, setCurrentPage] = useState('SearchStocks')
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  const renderComponent = () => {
    if (currentPage === 'MyProfile') {
      return <Dashboard />
    } else if (currentPage ==='SearchStocks') {
      return <StockSearch />
    } else if(currentPage ==='MyStocks') {
      return <SavedStocks />
    }
  }

  return (
    <>
      <div className="columns p-4 is-justify-content-space-around is-flex-direction-column-mobile">
        <div className="is-3 p-3 is-hidden-mobile">
            <ul className="menu-list">
              {/* eslint-disable */}
              <li>
                <a className='has-text-weight-bold' id="menu" onClick={() => handlePageChange('SearchStocks')}>Search Stocks</a>
              </li>
              <li>
                <a className='has-text-weight-bold' id="menu" onClick={() => handlePageChange("MyStocks")}>My Saved Stocks</a>
              </li>
              <li>
                <a className='has-text-weight-bold' id="menu" onClick={() => handlePageChange('MyProfile')}>My Profile</a>
              </li>
              {/* eslint-enable */}
            </ul>
        </div>
        {/* Use a navbar in mobile view */}
        <div className="is-3 p-3 is-hidden-tablet">
          <nav className="mobile-nav" role="navigation" aria-label="main navigation">
          <div id="mobile-navbar" className="container menu-list is-flex is-justify-content-space-around">
            <a className='has-text-weight-bold' id="menu" onClick={() => handlePageChange("SearchStocks")}>Search Stocks</a>
            <a className='has-text-weight-bold' id="menu" onClick={() => handlePageChange('MyStocks')}>My Stocks</a>
            <a className='has-text-weight-bold' id="menu" onClick={() => handlePageChange('MyProfile')}>Profile</a>
          </div>
          </nav>
        </div>
        <div className="column is-9 ">
          {renderComponent()}
        </div>
      </div>
    </>
  );
}

export default Profile