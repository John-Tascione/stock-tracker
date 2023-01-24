import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations' // Need LOGIN_USER mutation
import { validateEmail } from '../utils/helpers';
import Auth from '../utils/auth' 
import { Link } from 'react-router-dom';

const LoginForm = () => {
  console.log('login');
  // Set initial form state
  const [userFormData, setUserFormData] = useState({
    email: '',
    password: ''
  });
  // set state for alert
  const [ showAlert, setShowAlert ] = useState(false);
  // Import the loginUser query
  const [ loginUser, { error } ] = useMutation(LOGIN_USER); 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = userFormData;

    if ( !email || !validateEmail(email) || !password ) {
      setShowAlert(true);
      return;
    }
    setShowAlert(false);

    // Try/Catch loginUser
    try {
      console.log(email, password);
      const { data } = await loginUser({
        variables: {
          email, // shortform of email: email
          password
        },
      });

      // If there is data, make sure you log in!
      console.log(`data: ${data}`);
      Auth.login(data.loginUser.token) 

    } catch (err) {
      console.error('catch err: ', err);
      console.error('Mutation error: ', error);
      setShowAlert(true);
    }

    // Clear form on submit
    setUserFormData({
      email: '',
      password: ''
    })

  }

  return (
    <div>
      <div className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-6">
                <form className="box has-background-light" id="submit">
                { showAlert &&
                  <div className='container has-background-danger is-roundeds new-line'>
                    <p className='px-3 py-1 has-text-white has-text-centered is-size-7'>
                      Invalid email or password!
                    </p>
                  </div>
                  } 
                  <h1 className="py-2 has-text-dark has-text-weight-semibold">Login Here:</h1>
                  <div className="field">
                    <label className="label is-dark">
                      Email
                    </label>
                    <div className="control has-icons-left">
                      <input 
                        name='email'
                        value={userFormData.email}
                        onChange={handleInputChange}
                        type="email" 
                        id="email" 
                        className="input is-dark" 
                        placeholder="e.g movie@example.com" 
                      />
                      <span className="icon is-small is-left">
                        <i className="fa fa-envelope" />
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control has-icons-left">
                      <input 
                        name='password'
                        value={userFormData.password}
                        onChange={handleInputChange}
                        type="password" 
                        className="input is-dark" 
                        id="password" 
                        placeholder="Enter Password Here" 
                      />
                      <span className="icon is-small is-left">
                        <i className="fa fa-lock" />
                      </span>
                    </div>
                  </div>
                  <div className="field">
                  </div>
                  <div className="field">
                    <button 
                      typeof='submit'
                      className="button is-dark has-text-white is-fullwidth"
                      onClick={handleFormSubmit}
                    >
                      Login
                    </button>
                  </div>
                  <div className="has-text-centered">
                    <p className="is-size-7"> Don't have an account? 
                      <Link to="/sign-up" className="has-text-dark has-text-weight-semibold">
                        {` Sign Up!`}
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;