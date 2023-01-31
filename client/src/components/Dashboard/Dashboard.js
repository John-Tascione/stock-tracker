import React, { useState } from 'react'
import Auth from '../../utils/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { ME } from '../../utils/queries';
import './Dashboard.css'
import { UPDATE_EMAIL } from '../../utils/mutations';


const Dashboard = () => {
  // Get out of here if you aren't logged in!
  // const navigate = useNavigate()
  // // console.log("Logged in? ", Auth.loggedIn())
  //   if (!Auth.loggedIn()) {
  //     navigate("/login");
  //   };


  const {loading, error, data} = useQuery(ME);
  const [newEmail, setNewEmail] = useState("")
  const [updateEmail, {err}] = useMutation(UPDATE_EMAIL)

  const handleNewEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleUpdateEmail = async () => {
    if (newEmail === "") {
      alert("Please provide a new email to update")
      return  false
    }

    try {
      // console.log(`Updating email to ${newEmail}`)
      await updateEmail({variables: {email: newEmail}})
      alert(`Email has been updated to ${newEmail}`)
    } catch (err) {
      console.error(err)
    }

  }
  // console.log(data)
  if(loading) return 'Loading...'
  if (error) return `Error ${error}`
  const me = data.me
  console.log(me)

  // ----- Run queries for fun user metrics ----- //


  return (
    <>
      <section className="hero is-roundeds card is-dark is-small">
        <div className="hero-body">
          <h1 id="greeting" className="title is-flex is-justify-content-center ">
            Hello, {me.username}!
          </h1>
          <div className="container is-flex is-flex-direction-row is-justify-content-space-around">
            <div>
              <h2 className="is-size-4">Welcome to your profile!</h2>
              <p>Updates to your email and password can be made on the right</p>
            </div>
            <div>
              <ul className="attributes">
                <li>
                  <div>Username: {me.username}</div>
                </li>
                <form onSubmit={() => handleUpdateEmail()}>
                  <div>email: {me.email} </div>
                  <input
                    name="newEmail"
                    value={newEmail}
                    onChange={handleNewEmailChange}
                    className="input search-item"
                    id="srch-input"
                    type="text"
                    placeholder="Type New Email Here"
                    autoComplete="off"
                  ></input>
                  <button onClick={() => handleUpdateEmail()}>update</button>
                </form>
                {/* <form onSubmit={() => handleUpdateEmail()}>
                  <div>email: {me.email} </div>
                  <input
                    name="newEmail"
                    value={newEmail}
                    onChange={handleNewEmailChange}
                    className="input search-item"
                    id="srch-input"
                    type="text"
                    placeholder="Type New Email Here"
                    autoComplete="off"
                  ></input>
                  <button onClick={() => handleUpdateEmail()}>update</button>
                </form> */}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <br />
    </>
  );
}

export default Dashboard