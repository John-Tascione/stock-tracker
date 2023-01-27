import React, { useEffect, useState }from 'react'
import Auth from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery, useMutation, useQuery} from '@apollo/client';
import { ME } from '../../utils/queries';
import './myStocks.css';
import axios from 'axios';
import { DELETE_STOCK } from '../../utils/mutations';



const SavedStocks = () => {
  // Get out of here if you aren't logged in!
  const navigate = useNavigate()
  console.log("Logged in? ", Auth.loggedIn())
    if (!Auth.loggedIn()) {
      navigate("/login");
    };

  var myStocks
  const [myStocksState, setMyStocksState] = useState([])
  const [deleteStock, {err}] = useMutation(DELETE_STOCK)
  

  useEffect(() => {
      if (myStocks) {
        setMyStocksState(myStocks)
      }
    }, [myStocks])
  
    
  const {loading, error, data} = useQuery(ME);
  if(loading) return 'Loading...'
  if (error) return `Error ${error}`
  myStocks = data.me.stocks

  
  const handleDeleteStock = async (num) => {
       let copyState = myStocksState
    try {
        console.log(`delte stock ${copyState[num]._id}`)
        const newStock = await deleteStock({
          variables: {
            id: copyState[num]._id
          },
        });

        copyState = copyState.filter((item, index) => num !==index)
        setMyStocksState(copyState)
        
      } catch (err) {
        console.log(`failed delete`)
        console.error(err)
      }
    }
  
  return (
    <>
      <section className="hero is-roundeds card is-dark is-small">
        <div className="hero-body">
          <div className="container is-flex is-flex-direction-row">
              <h1 id="greeting" className="title">
                Your Saved Stocks Can be Updated Below
              </h1>
          </div>
        
        </div>
      </section>
      <section className='myStocks'>
      {myStocksState ? (
        myStocksState.map((stock, index) => {
          return (
          <section key= {stock._id} className="stock-card">
            <div>
              <div className='stock-header'>
              <h2 >{stock.ticker} data saved on {stock.date}</h2>
              <button onClick={() => handleDeleteStock(index)}>X</button>
              </div>
              <ul className='stock-data'>
                  <li>High: ${stock.high}</li>
                  <li>Low: ${stock.low}</li>
                  <li>Open: ${stock.open}</li>
                  <li>Close: ${stock.close}</li>
              </ul>
            </div>
          </section>
        )})
        ) : (
          <div>No Stocks Saved</div>)}
        </section>
      <br />
    </>
  );
}

export default SavedStocks