import React, { useState } from "react";
import Auth from '../utils/auth' 
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [ isActive, setIsActive ] = useState('');

  const handleNavBurger = () => {
    if (!isActive) {
      setIsActive('is-active');
    } else {
      setIsActive('');
    };
  };
    
  return (
    <>
      <section className="hero is-white block has-background-info mb-0">
        <div className="hero-head has-background-white">
          <nav className="navbar card">
            <div className="container is-fullwidth">
              <div className="navbar-brand">
                <Link className="navbar-item p-3" to="/">
                  <h1 className="title tangerine has-text-info animate__animated animate__rubberband p-3 is-size-4-mobile">
                    <span className="icon is-small mr-5">
                      <i className="fas fa-ticket-alt" />
                    </span>
                    Stock Track!
                    <span className="icon is-small ml-5">
                      <i className="fas fa-ticket-alt" />
                    </span>
                  </h1>
                </Link>
                <span
                  className={`navbar-burger is-align-self-center ${isActive}`}
                  aria-label="menu"
                  aria-expanded="false"
                  data-target="navbarMenuHeroB"
                  onClick={handleNavBurger}
                >
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                </span>
              </div>
              <div id="navbarMenuHeroB" className={`navbar-menu has-text-right has-text-centered-mobile ${isActive}`}>
                <div className="navbar-end">

                  {Auth.loggedIn() ? 
                  <>
                    <Link 
                      className="navbar-item" 
                      to="/"
                    >
                      Movie Search
                    </Link>
                    <Link 
                      className="navbar-item" 
                      to="/profile"
                    >
                      Profile
                    </Link>
                    <Link 
                      className="navbar-item" 
                      to="/my-reviews"
                    >
                      My Reviews
                    </Link>
                    <Link 
                      className="navbar-item" 
                      to="/friends"
                    >
                      Friends
                    </Link>
                    <Link 
                      className="navbar-item" 
                      to="/watch-parties"
                    >
                      Watch Parties
                    </Link>
                    {/* eslint-disable-next-line */}
                    <Link 
                      to="/"
                      id="logout" 
                      className="navbar-item"
                      onClick={Auth.logout}
                    >
                      Logout
                    </Link>
                  </>
                  :
                  <>
                    <Link className="navbar-item" to="/login">
                      Login
                    </Link>
                    <Link className="navbar-item" to="/sign-up">
                      Sign Up
                    </Link>
                  </>
                  }
                </div>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </>
  );
}

export default Navbar;
