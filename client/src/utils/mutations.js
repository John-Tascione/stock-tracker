import { gql } from '@apollo/client';

// Movie Mutations - will be called on movie search after querying db for searhched movie and not finding a match - pass in movie name and imdb_id from state variables
export const CREATE_MOVIE = gql`
  mutation CreateMovie($movieName: String!, $imdbId: String!) {
  createMovie(movie_name: $movieName, imdb_id: $imdbId) {
    _id
    movie_name
    imdb_id
  }
}
`;

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

// Called from a list of users rendered on search on friend page - Pass in username from element which send friend request button is clicked on
export const CREATE_FRIEND_REQUEST = gql`
mutation CreateFriendRequest($username: String!) {
  createFriendRequest(username: $username) {
    _id
    sender
    recipient
  }
}
`;

// Called from a list of your friend requests on the friend page - Pass in friend request ID and username(sender of frined request) from friend request element which add friend button is clicked on
export const ADD_FRIEND = gql`
mutation AddFriend($username: String!, $requestId: String!) {
  addFriend(username: $username, requestId: $requestId) {
    username
  }
}
`;

export const DENY_FRIEND = gql`
mutation DenyFriend($requestId: String!) {
  denyFriend(requestId: $requestId) {
    _id
  }
}
`;

// REMOVE FRIEND

// Conversation Mutations
// Called from conversation pop up - Pass in username from friend you are sending conversation to in front end 
export const CREATE_CONVERSATION = gql`
mutation CreateConversation($username: String) {
  createConversation(username: $username) {
    _id
    participants {
      username
    }
    messages {
      message_text
      time_sent
      sender
    }
  }
}
`;

// Called from a rendered conversation - Pass in conversation ID from rendered conversation and message text from input field
export const SEND_MESSAGE = gql`
mutation SendMessage($conversationId: String!, $messageText: String!) {
  sendMessage(conversation_id: $conversationId, message_text: $messageText) {
    messages {
      message_text
      time_sent
      sender
    }
  }
}
`;

// Review Mutations
// Called from movie details page on review button - Pass in movie ID from movie details state variable(IMDB ID) and review text from input field
export const CREATE_REVIEW = gql`
mutation CreateReview($movieId: String!, $reviewScore: String!, $reviewText: String!, $movieName: String!) {
  createReview(movie_id: $movieId, review_score: $reviewScore, review_text: $reviewText, movie_name: $movieName) {
    _id
    user_id
    movie_id
    review_score
    review_text
  }
}
`;

// DELETE REVIEW

// Watch Party Mutations
export const CREATE_WATCHPARTY = gql`
mutation CreateWatchParty($date: String!, $time: String!) {
  createWatchParty(date: $date, time: $time) {
    _id
    date
    host
    time
  }
}
`

export const WATCHPARTY_INVITE = gql`
mutation InviteToWatchParty($username: String!, $partyId: String!) {
  inviteToWatchParty(username: $username, partyId: $partyId) {
    _id
    recipients {
      username
    }
  }
}`

export const ACCEPT_PARTY = gql`
mutation AcceptPartyInvite($partyId: String!, $inviteId: String!) {
  acceptPartyInvite(partyId: $partyId, inviteId: $inviteId) {
    _id
  }
}
`

export const DENY_PARTY = gql`
mutation denyPartyInvite($partyId: String!, $inviteId: String!) {
  denyPartyInvite(partyId: $partyId, inviteId: $inviteId) {
    _id
  }
}
`

export const SEND_INVITE = gql`
mutation CreatePartyInvite($date: String!, $time: String!, $username: String!, $partyId: String!) {
  createPartyInvite(date: $date, time: $time, username: $username, partyId: $partyId) {
    _id
  }
}
`