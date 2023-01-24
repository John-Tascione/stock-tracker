// Import React
import React, { useState } from 'react';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer'
import Profile from './pages/profile/Profile';
import SignUpForm from './pages/signup/SignUp';
import LoginForm from './pages/login/LoginForm';


// Import Pages
import Main from './pages/Main'; //needs mp4, and app.css data


import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const httpLink = createHttpLink({
  url: '/graphql',
});


const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

  
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  // Make the navbar hold onto the state

  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
            <Routes>
              <Route 
                path='/' 
                element={<Main />}
              />
              <Route 
                path='/sign-up' 
                element={<SignUpForm />}
              />
              <Route 
                path='/profile' 
                element={<Profile />}
              />
              <Route 
                path='/login' 
                element={<LoginForm />}
              />
              <Route 
                path='*' 
                element={<Navigate to="/" />}
              />
            </Routes>
          <Footer />
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
