import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import Auth from '../utils/auth' 

// Call in e-mail helper
import { validateEmail } from '../utils/helpers';
import { Link } from 'react-router-dom';



const SignUpForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });
  // set state for alert
  const [ showAlert, setShowAlert ] = useState(false);
  // Import the createUser query
  const [ createUser, { error } ] = useMutation(CREATE_USER); 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { username, email, password, passwordConfirm } = userFormData;

    if (!email || !validateEmail(email) || !username || !password || password !== passwordConfirm) {
      setShowAlert(true);
      return;
    }
    setShowAlert(false);


    // May want to add some validation here

    // Try/Catch creating user
    try {
      console.log(username, email, password, passwordConfirm);
      const { data } = await createUser({
        variables: {
          username, // shortform of username: username
          email,
          password
        },
      });

      // If there is data, make sure you log in!
      console.log(`data: ${data}`);
      Auth.login(data.createUser.token) // We need the Auth middleware


    } catch (err) {
      console.error('catch err: ', err);
      console.error('Mutation error: ', error);
      setShowAlert(true);
    }

    // Clear form on submit
    setUserFormData({
      username: '',
      email: '',
      password: '',
      passwordConfirm: ''
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
                      Invalid user credentials or password mismatch!
                    </p>
                  </div>
                  } 
                  <h1 className="py-2 has-text-dark has-text-weight-semibold">Sign Up Here:</h1>
                  <div className="field">
                    <label className="label">
                      Email
                    </label>
                    <div className="control has-icons-left">
                      <input 
                        name='email'
                        value={userFormData.email}
                        onChange={handleInputChange}
                        type="email" 
                        className="input is-dark" 
                        id="email-signup" 
                        placeholder="e.g movie@example.com" 
                      />
                      <span className="icon is-small is-left">
                        <i className="fa fa-envelope" />
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">
                      Username
                    </label>
                    <div className="control has-icons-left">
                      <input 
                        name='username'
                        value={userFormData.username}
                        onChange={handleInputChange}
                        type="username" 
                        className="input is-dark" 
                        id="username-signup" 
                        placeholder="Must be 8-10 characters" 
                      />
                      <span className="icon is-small is-left">
                        <i className=" fa fa-regular fa-user" />
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">
                      Password
                    </label>
                    <div className="control has-icons-left">
                      <input 
                        name='password'
                        value={userFormData.password}
                        onChange={handleInputChange}
                        type="password" 
                        className="input is-dark" 
                        id="password-signup" 
                        placeholder="Enter Password Here" 
                      />
                      <span className="icon is-small is-left">
                        <i className="fa fa-regular fa-key" />
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Confirm Password</label>
                    <div className="control has-icons-left">
                      <input 
                        name='passwordConfirm'
                        value={userFormData.passwordConfirm}
                        onChange={handleInputChange}
                        type="password" 
                        className="input is-dark" 
                        id="passwordConfirm" 
                        placeholder="Re-type Password Here" />
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
                      Create Account
                    </button>
                  </div>
                  <div className="has-text-centered">
                    <p className="is-size-7"> Already have an account? 
                      <Link to="/login" className="has-text-dark has-text-weight-semibold">
                        {` Login!`}
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
  )
}

export default SignUpForm