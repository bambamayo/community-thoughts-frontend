import { gql, useMutation } from "@apollo/client";
import * as React from "react";
import { useForm } from "../../util/hooks";
import { FETCH_THOUGHTS_QUERY } from "../../util/queries";

export default function ThoughtForm({ username }) {
  const { values, onChange, onSubmit } = useForm(createNewPost, {
    body: "",
  });

  const [createPost, { error, loading }] = useMutation(
    CREATE_THOUGHT_MUTATION,
    {
      variables: values,
      update(proxy, result) {
        const data = proxy.readQuery({ query: FETCH_THOUGHTS_QUERY });
        proxy.writeQuery({
          query: FETCH_THOUGHTS_QUERY,
          data: {
            ...data,
            getThoughts: [result.data.createThought, ...data.getThoughts],
          },
        });
        values.body = "";
      },
    }
  );

  function createNewPost() {
    createPost();
  }

  return (
    <form onSubmit={onSubmit} className="thoughtform__form">
      <textarea
        placeholder={`what are you thinking about, ${username}`}
        className={`thoughtform__input ${
          error ? "thoughtform__input--error" : ""
        }`}
        onChange={onChange}
        rows="3"
        name="body"
        id="body"
        value={values.body}
      ></textarea>
      {error && <span className="thoughtform__error">{error}</span>}
      <button
        disabled={loading || values.body === ""}
        className="thoughtform__submit"
      >
        Post
      </button>
    </form>
  );
}

const CREATE_THOUGHT_MUTATION = gql`
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
