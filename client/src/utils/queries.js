import { gql } from '@apollo/client';

// Query all movies or a single movie by imdb id - Pass in imdb id to get single pass in nothing to get all movies
export const QUERY_MOVIES = gql`
  query Movies($imdbId: String) {
  movies(imdb_id: $imdbId) {
    _id
    movie_name
  }
}
`;

// Query all reviews or all reviews for a single movie by imdb id - Pass in imdb id to get for a single movie pass in nothing to get all reviews
export const QUERY_REVIEWS = gql`
  query Reviews($movieId: String) {
  reviews(movie_id: $movieId) {
    _id
    review_score
    review_text
    user_id
    movie_name
    user_name
  }
}
`;

export const MY_REVIEWS = gql`
query Query {
  myReviews {
    _id
    user_id
    movie_id
    review_score
    review_text
    movie_name
  }
}
`

// Query all users or a single user by passing in username
export const QUERY_USERS = gql`
query Users($username: String) {
  users(username: $username) {
    username
    email
  }
}
`;

// Query the logged in user based on context 
export const ME = gql`
  query Me {
  me {
    username
    email
    friends {
      _id
      username
    }
  }
}
`;

// Query all friend requests in which the recipient is the logged in user based on context
export const MY_FRIEND_REQUESTS = gql`
query MyFriendRequests {
  myFriendRequests {
    _id
    sender
  }
}
`
// Query all conversations in which the logged in user is a participant
export const MY_CONVERSATIONS = gql`
query MyConversations {
  myConversations {
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
`

export const ONE_CONVERSATION = gql`
query Conversations($id: String) {
  conversations(_id: $id) {
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
`

// Queries to enable Watch Parties
export const MY_WATCHPARTIES = gql`
query MyWatchParties {
  myWatchParties {
    _id
    date
    host
    time
    recipients {
      attending
      username
    }
  }
}
`
export const MY_PARTY_INVITES = gql`
query MyPartyInvites {
  myPartyInvites {
    _id
    date
    host
    time
    partyId
  }
}
`

export const INVITED_WATCH_PARTIES = gql`
query InvitedWatchParties {
  invitedWatchParties {
    _id
    date
    host
    time
    recipients {
      attending
      username
    }
  }
}
`