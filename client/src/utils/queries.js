import { gql } from '@apollo/client';

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
    stocks {
      close
      date
      _id
      high
      low
      open
      ticker
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