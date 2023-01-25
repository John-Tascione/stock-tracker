import React, { useState }from 'react'
import Auth from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ME } from '../../utils/queries';
import './stockSearch.css';
import axios from 'axios';


const StockSearch = () => {
  // Get out of here if you aren't logged in!
  const navigate = useNavigate()
  console.log("Logged in? ", Auth.loggedIn())
    if (!Auth.loggedIn()) {
      navigate("/login");
    };

  // Pull username and ID from profile
  const { username: user, _id: userId } = Auth.getProfile().data;
  console.log(Auth.getProfile());
  console.log(user, userId);

  const [stockTicker, setStockTicker] = useState("")
  const [stockData, setStockData] = useState("")
  

  const handleFormUpdate = (event) => {
  setStockTicker(event.target.value.toUpperCase());
};

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    if (!stockTicker) {
      console.log("No ticker found")
      return false
    }

    try {
      console.log(`Searching for ${stockTicker}`)
      const response = await axios.get(stockSearch);
      console.log(response.data)
      setStockData(response.data)
    } catch (err) {
      console.error(err)
    }
  }
 
  const handleSaveStock = () => {
    console.log("save stock")
  }
  const stockSearch = `https://api.polygon.io/v1/open-close/${stockTicker}/2023-01-09?adjusted=true&apiKey=I7FExWuvhqmQRUzNi_GN8vCpecCFALIg`

  return (
    <>
      <section className="hero is-roundeds card is-dark is-small">
        <div className="hero-body">
          <div className="container is-flex is-flex-direction-row is-justify-content-space-between">
            <div className="container is-flex is-flex-direction-row">
              <h1 id="greeting" className="title">
                Search a stock by ticker symbol:
              </h1>
              <form id="search-form" onSubmit={handleFormSubmit}>
                <input
                  name="stockTicker"
                  value={stockTicker}
                  onChange={handleFormUpdate}
                  className="input is-dark"
                  id="srch-title"
                  type="text"
                  placeholder="Stock Ticker"
                  autoComplete="off"
                ></input>
                <button onClick={handleFormSubmit}> Search</button>
              </form>
            </div>
          </div>
        {stockData ? (
        <div>
          <h2 id='data-header'>Data as of {stockData.from}</h2>
            <ul>
              <li>Open: ${stockData.open}</li>
              <li>High: ${stockData.high}</li>
              <li>Low: ${stockData.low}</li>
              <li>Close: ${stockData.close}</li>
            </ul>
            <button
            onClick={handleSaveStock}> Save {stockData.Symbol} to my Stocks
            </button>
        </div>
        ) : ( <div></div>)
        }
        </div>
      </section>
      <br />
    </>
  );
}

export default StockSearch