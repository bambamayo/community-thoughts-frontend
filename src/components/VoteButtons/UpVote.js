import { gql, useMutation } from "@apollo/client";
import * as React from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth";

export default function UpVote({
  thought: { id, upvoteCount, upvotes, downvotes },
}) {
  const [liked, setLiked] = React.useState(false);
  const { user } = React.useContext(AuthContext);

  const history = useHistory();

  React.useEffect(() => {
    if (user && upvotes.find((upvote) => upvote.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, upvotes, downvotes]);

  const [upvoteThought] = useMutation(UPVOTE_THOUGHT_MUTATION, {
    variables: { thoughtId: id },
  });

  // function upvote() {
  //   setLiked((prevState) => !prevState);
  //   upvoteThought();
  // }

  let likeButton;
  if (user) {
    if (liked) {
      likeButton = <FaThumbsUp title="upvote" fill="#03516b" />;
    } else {
      likeButton = <FaThumbsUp title="upvote" />;
    }
  } else {
    likeButton = <FaThumbsUp title="upvote" />;
  }

  return (
    <button
      className="thought__iconbtn"
      onClick={!user ? () => history.push("/signup") : upvoteThought}
    >
      {likeButton}
      <span className="thought__metacount">{upvoteCount}</span>
    </button>
  );
}

const UPVOTE_THOUGHT_MUTATION = gql`
  mutation upvoteThought($thoughtId: ID!) {
    upvoteThought(thoughtId: $thoughtId) {
      id
      downvoteCount
      upvoteCount
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
    }
  }
`;
