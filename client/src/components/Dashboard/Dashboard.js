import React, { useState } from 'react'
import Auth from '../../utils/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { ME } from '../../utils/queries';
import './Dashboard.css'
import { UPDATE_EMAIL } from '../../utils/mutations';


const Dashboard = () => {
  // Get out of here if you aren't logged in!
  const navigate = useNavigate()
    if (!Auth.loggedIn()) {
      navigate("/login");
    };


  const {loading, error, data} = useQuery(ME);
  const [newEmail, setNewEmail] = useState("")
  const [updateEmail, {err}] = useMutation(UPDATE_EMAIL)

 
  // console.log(data)
  if(loading) return 'Loading...'
  if (error) return `Error ${error}`
  const me = data.me
  console.log(me)

  return (
    <>
      <section className="hero is-roundeds card is-dark is-small">
        <div className="hero-body">
          <div className='columns is-multiline is-centered'>
          <h1 id="greeting" className="title column is-half is-offset-one-quarter">
            Hello, {me.username}!
          </h1>
          <div className="container column columns is-full">
            <div className='column columns is-multiline is-one'>
              <h2 className="is-size-5 column is-half is-offset-one-quarter">Welcome to your profile!</h2>
              <p className='column is-full'>Your information and basic metrics can be found on the right</p>
            </div>
            <div className='columns column is-half is-multiline'>
            <h2 className="is-size-5 column is-half is-offset-one-quarter">User Info and Metrics</h2>
              <ul className="attributes">
                <li>
                  <div>Username: {me.username}</div>
                </li>
                <li>
                  <div>Email: {me.email}</div>
                </li>
                <li>
                  <div>Saved Stocks: {me.stocks.length}</div>
                </li>
              </ul>
            </div>
          </div>
          </div>
        </div>
      </section>
      <br />
    </>
  );
}

export default Dashboard