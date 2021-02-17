import { gql } from "@apollo/client";

export const DELETE_THOUGHT = gql`
  mutation($thoughtId: ID!) {
    deleteThought(thoughtId: $thoughtId)
  }
`;

export const CREATE_THOUGHT_MUTATION = gql`
  mutation createThought($body: String!) {
    createThought(body: $body) {
      id
      body
      createdAt
      username
      upvoteCount
      commentCount
      downvoteCount
      upvotes {
        username
      }
      downvotes {
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

export const CREATE_COMMENT = gql`
  mutation createComment($thoughtId: ID!, $body: String!) {
    createComment(thoughtId: $thoughtId, body: $body) {
      id
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($thoughtId: ID!, $commentId: ID!) {
    deleteComment(thoughtId: $thoughtId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
