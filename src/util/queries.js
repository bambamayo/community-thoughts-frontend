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
      }
      downvotes {
        id
        username
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
