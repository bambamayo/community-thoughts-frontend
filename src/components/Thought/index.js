import PropTypes from "prop-types";
import { BiUserCircle } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaThumbsDown, FaThumbsUp, FaRegComment } from "react-icons/fa";

export default function Thought({
  avatarPresent,
  author,
  userPost,
  timePosted,
  body,
  commentCount,
  upvoteCount,
  downvoteCount,
}) {
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
        {userPost && (
          <button className="thought__delete">
            <AiTwotoneDelete title="delete icon" />
          </button>
        )}
      </div>

      <div className="thought__bottom">
        <button className="thought__iconbtn">
          <FaThumbsUp title="upvote icon" />
          <span className="thought__metacount">{upvoteCount}</span>
        </button>
        <button className="thought__iconbtn">
          <FaThumbsDown title="downvote icon" />
          <span className="thought__metacount">{downvoteCount}</span>
        </button>
        <button className="thought__iconbtn">
          <FaRegComment title="comment icon" />
          <span className="thought__metacount">{commentCount}</span>
        </button>
      </div>
    </div>
  );
}

Thought.propTypes = {
  avatarPresent: PropTypes.bool.isRequired,
  author: PropTypes.string.isRequired,
  userPost: PropTypes.bool.isRequired,
  timePosted: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
  upvoteCount: PropTypes.number.isRequired,
  downvoteCount: PropTypes.number.isRequired,
};
