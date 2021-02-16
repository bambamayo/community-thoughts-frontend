import { gql } from "@apollo/client";

export const FETCH_THOUGHTS_QUERY = gql`
  query {
    getThoughts {
      id
      body
      createdAt
      username
      upvoteCount
      commentCount
      downvoteCount
      upvotes {
        id
        username
        createdAt
      }
      downvotes {
        id
        username
        createdAt
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const FETCH_THOUGHT_QUERY = gql`
  query($thoughtId: ID!) {
    getThought(thoughtId: $thoughtId) {
      username
      id
      createdAt
      body
      comments {
        body
        username
        id
        createdAt
      }
      upvotes {
        username
        id
      }
      downvotes {
        username
        id
      }
      downvoteCount
      upvoteCount
      commentCount
    }
  }
`;
