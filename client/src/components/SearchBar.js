import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchOMDB, getHistory, removeHistory } from "../utils/API";

function SearchBar() {
  // Create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");
  // Set state object of pulled data
  const [searchedMovies, setSearchedMovies] = useState([]);
  // Set state for search history
  const [searchHistory, setSearchHistory] = useState([]);

  // When you load the page for the first time, grab the search history!
  useEffect(() => {
    // console.log(getHistory()) // Working
    setSearchHistory(getHistory());
  }, [])

  const handleFormUpdate = (event) => {
    setSearchInput(event.target.value);
    console.log(searchInput);
  };

  const handleFormSubmit = async (event) => {
      console.log(event)
      console.log(event.target.text)
      event.preventDefault();

    if (!searchInput) {
      console.log("No Search Input");
      return false;
    }

    console.log(searchInput); // Working

    try {
      console.log('Pulling Movie Data:')
      const movies = await searchOMDB(searchInput);
      console.log("Movies: ", movies);
      if (movies === undefined) {
        return;
      };
      setSearchedMovies(movies);
      setSearchHistory(getHistory());

    } catch (err) {
      console.log(err);
    }
  };

  const handleHistoryButton = async (event) => {
    console.log(event);
    const searchInput = event.target.text;
    console.log(searchInput);
    setSearchInput(searchInput);
    
    // await handleFormSubmit(event);

    // Calling FormSubmit doesn't work properly. Hard coding for now.
    try {
      console.log('Pulling Movie Data:')
      const movies = await searchOMDB(searchInput);
      console.log("Movies: ", movies);
      if (movies === undefined) {
        return;
      };
      setSearchedMovies(movies);
      setSearchHistory(getHistory());

    } catch (err) {
      console.log(err);
    }
  }

  const handleRemoveHistory = () => {
    removeHistory();
    setSearchHistory([]);
    setSearchInput('');
  };

  // Create local storage for movie history
  // Use context to set a state object of local storage items
  // Use local storage to generate search history buttons
  // When you click search history buttons, they search for the movie

  return (
    <div className="base-site">
      <header>
        <section className="background hero has-text-centered">
          <div className="hero-body py-5">
            <div className="container">
              <header className="columns">
                <section className="column is-one-fifth is-hidden-mobile" />
                <section className="column is-three-fifths is-12-mobile">
                  <br/>
                  <form id="srch-form" onSubmit={handleFormSubmit}>
                    <p className="control center">
                      <input
                        name="searchInput"
                        value={searchInput}
                        onChange={handleFormUpdate}
                        className="input is-dark"
                        id="srch-title"
                        type="text"
                        placeholder="Movie Title"
                        autoComplete="off"
                      />
                    </p>
                    <br />
                    <h2 className="subtitle has-text-centered has-text-dark">
                      Search for movies - Get the details!
                    </h2>
                    <br />
                    {/* Search Button */}
                    <section className="container is-flex is-justify-content-center">
                      <button className="button is-dark has-text-white">
                        Search Movies
                      </button>
                      {/* Dropdown Start */}
                      <div className="dropdown is-hoverable">
                        <div className="dropdown-trigger">
                          <div
                            className="has-background-dark has-text-white is-normal p-2 ml-1 is-size-6 is-roundeds"
                            aria-haspopup="true"
                            aria-controls="dropdown-menu3"
                          >
                            <span>Search History</span>
                            <span className="icon is-small">
                              <i
                                className="fas fa-angle-down"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                        </div>
                        <div
                          className="dropdown-menu"
                          id="dropdown-menu3"
                          role="menu"
                        >
                          <div className="dropdown-content">
                            {/* eslint-disable */}
                            { searchHistory.length 
                            ? (
                                searchHistory.map((search, index) => {
                                  return (
                                    <a 
                                      key={index}
                                      className="dropdown-item is-capitalized"
                                      onClick={handleHistoryButton}
                                    >{search}</a>
                                  )
                                  
                                })
                              )
                            : <></>}
                            
                            <hr className="dropdown-divider" />
                            {/* Make the clear history button here */}
                            {/* NOTE: You can't just clear local memory! It will delete the token! */}
                            <a
                              onClick={handleRemoveHistory}
                              className="dropdown-item"
                            >
                              Clear History
                            </a>
                            {/* eslint-enable */}
                          </div>
                        </div>
                      </div>
                    </section>
                  </form>
                </section>
                <section className="column is-one-fifth is-hidden-mobile" />
              </header>
            </div>
          </div>
        </section>
      </header>

      {/* Start table object and map out search results */}
      { searchedMovies.length 
      ? (
        <main className="is-fullheight has-background-white">
          <div id="search-results" className="is-6 p-4">
            <div className="card events-card">
              <header className="card-header ">
                <p className="card-header-title is-hidden">Search Results</p>
              </header>
              <div className="card-table">
                <table className="table is-fullwidth is-striped">
                  <tbody id="table-body">
                    { searchedMovies.map((movie) => {
                      console.log(movie.Title, movie.Year, movie.imdbID, )
                      return (
                        <tr key={movie.imdbID} className="">
                          <td style={{width: "5%"}} className="is-hidden">
                            <i className="fa fa-bell-o is-hidden-mobile"></i>
                          </td>
                          <td>
                            {movie.Title}
                          </td>
                          <td>
                            Year: {movie.Year}
                          </td>
                          <td className="level-right">
                            <Link 
                              className="button is-small is-dark has-text-white" 
                              imdb-id={movie.imdbID} 
                              to={`/movie-details/${ movie.imdbID }`}
                            >
                              Movie Details
                            </Link>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <br/> {/* Add a break at the end of the table to make it pretty */}
          </div>
        </main>
      )
      :<></>}
    </div>
  );
}

export default SearchBar;
