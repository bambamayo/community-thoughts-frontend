import React from "react";
import PropTypes from "prop-types";
import { BiUserCircle } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth";
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
  const { user } = React.useContext(AuthContext);
  const history = useHistory();

  return (
    <div className="thought">
      <div className="thought__top">
        <div className="thought__postedby">
          {avatarPresent ? (
            <button className="thought__postedby-btn">
              <img className="thought__postedby-img" alt={`${author} avatar`} />
            </button>
          ) : (
            <button className="thought__postedby-btn">
              <BiUserCircle title="image placeholder for users without avatar" />
            </button>
          )}
        </div>
        <div className="thought__top--d">
          <h3 className="thought__author">{author}</h3>
          <span className="thought__time">{timePosted}</span>
          <p className="thought__body">{body}</p>
        </div>
        {user && user.username === author && (
          <button className="thought__delete">
            <AiTwotoneDelete title="delete icon" />
          </button>
        )}
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
    </div>
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
