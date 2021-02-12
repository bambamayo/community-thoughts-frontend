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
