import { gql } from '@apollo/client';

// User Mutations
// Called when a create user form is submitted and front end validation has passed - pass in username email and password from form
export const CREATE_USER = gql`
 mutation CreateUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      username
    }
  }
}
`;

// Called when a login form is submitted - pass in email and password from login form
export const LOGIN_USER = gql`
mutation LoginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    token
    user {
      username
    }
  }
}
`; 

export const SAVE_STOCK = gql`
mutation SaveStock($ticker: String!, $date: String!, $open: String!, $high: String!, $low: String!, $close: String!) {
  saveStock(ticker: $ticker, date: $date, open: $open, high: $high, low: $low, close: $close) {
    _id
  }
}
`; 
