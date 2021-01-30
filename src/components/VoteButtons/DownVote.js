import { gql, useMutation } from "@apollo/client";
import * as React from "react";
import { FaThumbsDown } from "react-icons/fa";
import { AuthContext } from "../../context/auth";

export default function DownVote({
  thought: { id, downvoteCount, downvotes },
}) {
  const [disliked, setDisliked] = React.useState(false);

  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (
      user &&
      downvotes.find((downvote) => downvote.username === user.username)
    ) {
      setDisliked(true);
    } else {
      setDisliked(false);
    }
  }, [user, downvotes]);

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
    dislikeButton = <FaThumbsDown title="downupvote" />;
  }

  return (
    <button className="thought__iconbtn" onClick={downvoteThought}>
      {dislikeButton}
      <span className="thought__metacount">{downvoteCount}</span>
    </button>
  );
}

const DOWNVOTE_THOUGHT_MUTATION = gql`
  mutation downvoteThought($thoughtId: ID!) {
    downvoteThought(thoughtId: $thoughtId) {
      id
      downvotes {
        id
        username
      }
      downvoteCount
    }
  }
`;
