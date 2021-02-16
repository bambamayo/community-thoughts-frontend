import { useMutation } from "@apollo/client";
import * as React from "react";
import { useForm } from "../../util/hooks";
import { FETCH_THOUGHTS_QUERY } from "../../util/graphql/queries";
import { CREATE_THOUGHT_MUTATION } from "../../util/graphql/mutations";

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
