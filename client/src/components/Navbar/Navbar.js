import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./NavBtn";
import "./Navbarstyle.css";
import Auth from "../../utils/auth";

function Navbar() {
  // updates useState to what is assigned
  const [isActive, setIsActive] = useState("");

  // basically it reverses the above funtion (whenever its false its true vise versa)
  const handleNavBurger = () => {
    if (!isActive) {
      console.log("active");
      setIsActive("is-active");
    } else {
      console.log("inactive");
      setIsActive("");
    }
  };

  // Call this if you need to explicitly close the menu
  const closeMobileMenu = () => setIsActive("");

  // updates useState
  const [button, setButton] = useState(true);
  // // makes button responsive and only shows up after a certain screen size (less than or equal to 960px)
  // const showButton = () => {
  //     if(window.innerWidth <= 960) {
  //         setButton(false)
  //     } else {
  //         setButton(true)
  //     }
  // };

  // // renders logout button once and doesnt show it again
  // useEffect(() => {
  //     showButton()
  // }, []);

  // window.addEventListener('resize', showButton);

  return (
    <>
      <nav className="navbar m-0 p-0">
        <div className="navbar-container">
          {/* link to search bar homepage */}
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Stock Track
            <i className="fas fa-chart-line" />
          </Link>

          <div className="menu-icon" onClick={handleNavBurger}>
            {/* when you click on the burger menu it shows the 'x' and when you click out of it, the 3 lines show up again */}
            <i className={isActive ? "fas fa-times" : "fas fa-bars"} />
          </div>
          {/* when you click on the navbar it disappears */}
          {Auth.loggedIn() ? (
            <ul className={isActive ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                              {/* When any link is clicked it removes the navbar*/}
              </li>
              <li className="nav-item">
                {/* link to profile page */}
                <Link
                  to="/profile"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/" className="nav-links" onClick={Auth.logout}>
                  Logout
                </Link>
              </li>
              {/* log out button...unsure if we still need sign up and login button on navbar? */}
            </ul>
          ) : (
            <ul className={isActive ? "nav-menu active" : "nav-menu"}>
              <li>
                <Link
                  to="/Login"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/sign-up"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
