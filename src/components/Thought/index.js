import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { BiUserCircle } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { useHistory } from "react-router-dom";
// import { AuthContext } from "../../context/auth";
import UpVote from "../VoteButtons/UpVote";
import DownVote from "../VoteButtons/DownVote";

export default function Thought({
  avatarPresent,
  author,
  timePosted,
  body,
  commentCount,
  upvoteCount,
  downvoteCount,
  id,
  upvotes,
  downvotes,
}) {
  // const { user } = React.useContext(AuthContext);
  const history = useHistory();

  return (
    <Link to={`/${author}/thought/${id}`} className="thought">
      <div className="thought__top">
        <div className="thought__postedby">
          {avatarPresent ? (
            <button className="thought__postedby-btn">
              <img className="thought__postedby-img" alt={`${author} avatar`} />
            </button>
          ) : (
            <button className="thought__postedby-btn">
              <BiUserCircle title="image placeholder for user without avatar" />
            </button>
          )}
        </div>
        <div className="thought__top--d">
          <h3 className="thought__author">{author}</h3>
          <span className="thought__time">{timePosted}</span>
          <p className="thought__body">{body}</p>
        </div>
      </div>

      <div className="thought__bottom">
        <UpVote thought={{ id, upvoteCount, downvotes, upvotes }} />
        <DownVote thought={{ id, downvoteCount, upvotes, downvotes }} />
        <button
          className="thought__iconbtn"
          onClick={() => history.push(`/${author}/thought/${id}`)}
        >
          <FaRegComment title="comment" />
          <span className="thought__metacount">{commentCount}</span>
        </button>
      </div>
    </Link>
  );
}

Thought.propTypes = {
  avatarPresent: PropTypes.bool.isRequired,
  author: PropTypes.string.isRequired,
  timePosted: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
  upvoteCount: PropTypes.number.isRequired,
  downvoteCount: PropTypes.number.isRequired,
};
