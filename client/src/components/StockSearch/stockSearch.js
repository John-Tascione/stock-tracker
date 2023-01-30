import React, { useState }from 'react'
import Auth from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useMutation} from '@apollo/client';
import { ME } from '../../utils/queries';
import './stockSearch.css';
import axios from 'axios';
import { formatDate } from '../../utils/helpers';
import { SAVE_STOCK } from '../../utils/mutations';


const StockSearch = () => {
  // Get out of here if you aren't logged in!
  const navigate = useNavigate()
  console.log("Logged in? ", Auth.loggedIn())
    if (!Auth.loggedIn()) {
      navigate("/login");
    };

  // Pull username and ID from profile
  const { username: user, _id: userId } = Auth.getProfile().data;
  // console.log(Auth.getProfile());
  // console.log(user, userId);

  const [stockTicker, setStockTicker] = useState("")
  const [stockData, setStockData] = useState("")
  const [newDate, setNewDate] = useState("")
  const date = new Date();
  date.setDate(date.getDate()-1)
  let yesterday =  date.toISOString().split("T")[0]
  // console.log(`Yesterday: ${yesterday}`)

  const handleFormUpdate = (event) => {
  setStockTicker(event.target.value.toUpperCase());
};

const handleDateUpdate = (event) => {
  setNewDate(event.target.value);
};
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    if (!stockTicker) {
      console.log("No ticker found")
      return false
    }

    if(newDate && yesterday !== newDate) {
      yesterday = newDate;
      console.log(`yesterday: ${yesterday}`)
    }

    let stockSearch = `https://api.polygon.io/v1/open-close/${stockTicker}/${yesterday}?adjusted=true&apiKey=I7FExWuvhqmQRUzNi_GN8vCpecCFALIg`
    
    try {
      console.log(`Getting ${stockSearch}`)
      const response = await axios.get(stockSearch);
      // console.log(response.data)
      setStockData(response.data)
    } catch (err) {
      alert(`No data found for ${stockTicker} on ${yesterday}. Please try another date.`)
      console.error(err)
    }
  }
 
  const [saveStock, {err}] = useMutation(SAVE_STOCK);
  
  
  const handleSaveStock = async (event) => {
    event.preventDefault()
    const {symbol, from, open, high, low, close} = stockData
    console.log(symbol, from, open.toString(), high.toString(), low.toString(), close.toString())

    try {
      const newStock = await saveStock({
      variables: {
        ticker: symbol,
        date: from,
        open: open.toString(),
        high: high.toString(),
        low: low.toString(),
        close: close.toString(),
      },
    });
    console.log(`Saved: ${newStock}`)
  } catch (err) {
        console.error(err)
      }
    };

  

  return (
    <>
      <section className="hero is-roundeds card is-dark is-small">
        <div className="hero-body">
          <div className="container is-flex is-flex-direction-row">
            <div>
              <h1 id="greeting" className="title">
                Search a stock by ticker symbol:
              </h1>
            </div>
            <div>
              <form id="search-form" onSubmit={handleFormSubmit}>
                <input
                  name="stockTicker"
                  value={stockTicker}
                  onChange={handleFormUpdate}
                  className="input search-item"
                  id="srch-input"
                  type="text"
                  placeholder="Stock Ticker"
                  autoComplete="off"
                ></input>
                 <input
                  name="date"
                  value={newDate}
                  onChange={handleDateUpdate}
                  className="input search-item"
                  id="srch-input"
                  type="text"
                  placeholder={yesterday}
                  defaultValue={yesterday}
                  autoComplete="off"
                ></input>
                <button
                  onClick={handleFormSubmit}
                  className="search-item"
                  id="searchBtn"
                >
                  
                  Search
                </button>
              </form>
            </div>
          </div>
          {stockData ? (
            <div id="data">
              <h2 id="data-header">Data as of {formatDate(stockData.from)}</h2>
              <ul>
                <li>Open: ${stockData.open}</li>
                <li>High: ${stockData.high}</li>
                <li>Low: ${stockData.low}</li>
                <li>Close: ${stockData.close}</li>
              </ul>
              <button onClick={handleSaveStock} id="save">
                Save {stockData.symbol} to my Stocks
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </section>
      <br />
    </>
  );
}

export default StockSearch