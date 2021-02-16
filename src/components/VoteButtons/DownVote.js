import { gql, useMutation } from "@apollo/client";
import * as React from "react";
import { FaThumbsDown } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth";

export default function DownVote({
  thought: { id, downvoteCount, downvotes, upvotes },
}) {
  const [disliked, setDisliked] = React.useState(false);
  const { user } = React.useContext(AuthContext);

  const history = useHistory();

  React.useEffect(() => {
    if (
      user &&
      downvotes.find((downvote) => downvote.username === user.username)
    ) {
      setDisliked(true);
    } else {
      setDisliked(false);
    }
  }, [user, downvotes, upvotes]);

  const [downvoteThought] = useMutation(DOWNVOTE_THOUGHT_MUTATION, {
    variables: { thoughtId: id },
  });

  let dislikeButton;
  if (user) {
    if (disliked) {
      dislikeButton = <FaThumbsDown title="downvote" fill="#03516b" />;
    } else {
      dislikeButton = <FaThumbsDown title="downvote" />;
    }
  } else {
    dislikeButton = <FaThumbsDown title="downvote" />;
  }

  return (
    <button
      title="downvote"
      className="thought__iconbtn"
      onClick={!user ? () => history.push("/signup") : downvoteThought}
    >
      {dislikeButton}
      <span className="thought__metacount">{downvoteCount}</span>
    </button>
  );
}

const DOWNVOTE_THOUGHT_MUTATION = gql`
  mutation downvoteThought($thoughtId: ID!) {
    downvoteThought(thoughtId: $thoughtId) {
      id
      downvoteCount
      upvoteCount
      downvotes {
        id
        username
        createdAt
      }
      upvotes {
        id
        username
        createdAt
      }
    }
  }
`;
