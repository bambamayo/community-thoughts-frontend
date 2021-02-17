import * as React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import ThoughtLoader from "../components/Loaders/ThoughtLoader";
import { FaRegComment } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import { formatDate } from "../helpers";
import { AuthContext } from "../context/auth";
import Spinner from "../components/Spinner";

import { AiTwotoneDelete } from "react-icons/ai";
import UpVote from "../components/VoteButtons/UpVote";
import DownVote from "../components/VoteButtons/DownVote";
import Modal from "../components/Modal";
import {
  FETCH_THOUGHTS_QUERY,
  FETCH_THOUGHT_QUERY,
} from "../util/graphql/queries";
import {
  DELETE_THOUGHT,
  CREATE_COMMENT,
  DELETE_COMMENT,
} from "../util/graphql/mutations";
import { useForm } from "../util/hooks";

export default function SingleThought() {
  const [showModal, setShowModal] = React.useState(false);
  const [showCommentModal, setShowCommentModal] = React.useState(false);
  const [commentToDelete, setCommentToDelete] = React.useState(null);
  const [showDeleteCommentModal, setShowDeleteCommmentModal] = React.useState(
    false
  );
  const { values, onChange, onSubmit } = useForm(createComment, {
    comment: "",
  });
  let { id } = useParams();
  let history = useHistory();
  let authorPresent = false;

  const { user } = React.useContext(AuthContext);

  const { loading, data, error } = useQuery(FETCH_THOUGHT_QUERY, {
    variables: {
      thoughtId: id,
    },
  });

  const [
    deleteThought,
    { loading: deleting, error: deleteError },
  ] = useMutation(DELETE_THOUGHT, {
    variables: {
      thoughtId: id,
    },
    update(cache, { data }) {
      const existingThoughts = cache.readQuery({ query: FETCH_THOUGHTS_QUERY });
      const newThoughts = existingThoughts.getThoughts.filter(
        (thought) => thought.id !== id
      );
      cache.writeQuery({
        query: FETCH_THOUGHTS_QUERY,
        data: { thoughts: newThoughts },
      });
    },
  });

  const [addComment, { loading: adding, error: commentError }] = useMutation(
    CREATE_COMMENT,
    {
      variables: {
        thoughtId: id,
        body: values.comment,
      },
    }
  );

  const [removeComment, { loading: deletingC, error: errorC }] = useMutation(
    DELETE_COMMENT,
    {
      variables: {
        thoughtId: id,
        commentId: commentToDelete,
      },
    }
  );

  async function deleteComment() {
    await removeComment();

    if (errorC) return;
    if (!deletingC && !errorC) {
      handleShowDeleteCommentModal();
    }
  }

  const handleShowDeleteCommentModal = (id) => {
    if (commentToDelete) setCommentToDelete(null);
    else {
      setCommentToDelete(id);
    }
    setShowModal((prevState) => !prevState);
    setShowDeleteCommmentModal((prevState) => !prevState);
  };

  async function createComment() {
    values.comment = "";
    await addComment();

    if (commentError) return;
    if (!commentError && !adding) {
      handleCommentModal();
    }
  }

  const deleteSingleThought = async () => {
    await deleteThought();
    if (deleteError) return;
    if (!deleting && !deleteError) {
      history.push("/");
    }
  };

  const handleCommentModal = () => {
    setShowModal((prevState) => !prevState);
    setShowCommentModal((prevState) => !prevState);
  };

  let show;
  if (loading) {
    show = (
      <div className="thought-s__other">
        <ThoughtLoader />
      </div>
    );
  }
  if (error) {
    show = (
      <div className="thought-s__error">
        Could not fetch thought, please try again
      </div>
    );
  } else if (data) {
    const {
      username,
      id,
      comments,
      body,
      upvotes,
      downvotes,
      downvoteCount,
      upvoteCount,
      commentCount,
      createdAt,
    } = data.getThought;
    show = (
      <div className="thought-s__thought">
        <div className="thought-s__top">
          <div className="thought-s__l">
            <div className="thought-s__postedby">
              {authorPresent ? (
                <button className="thought-s__postedby-btn">
                  <img
                    className="thought-s__postedby-img"
                    alt={`${username} avatar`}
                  />
                </button>
              ) : (
                <button className="thought-s__postedby-btn">
                  <BiUserCircle title="image placeholder for users without avatar" />
                </button>
              )}
            </div>
          </div>
          <div className="thought-s__r">
            <div className="thought-s__r-l">
              <span className="thought-s__author">{username}</span>
              <p className="thought-s__body">{body}</p>
              <span className="thought-s__time">{`${formatDate(
                createdAt
              )} ago`}</span>
            </div>
            {user && user.username === username && (
              <button
                onClick={() => setShowModal(true)}
                className="thought-s__delete"
                title="delete thought"
              >
                <AiTwotoneDelete title="delete thought" />
              </button>
            )}
          </div>
        </div>
        <div className="thought-s__bottom">
          <UpVote thought={{ id, upvoteCount, downvotes, upvotes }} />
          <DownVote thought={{ id, downvoteCount, upvotes, downvotes }} />
          <button
            className="thought-s__iconbtn"
            onClick={!user ? () => history.push("/login") : handleCommentModal}
          >
            <FaRegComment title="comment" />
            <span className="thought__metacount">{commentCount}</span>
          </button>
        </div>
        <div className="thought-s__comments">
          {comments.map((comment) => (
            <div className="thought-s__comment" key={comment.id}>
              <div className="thought-s-c__l">
                <button className="thought-s__comment-abtn">
                  <BiUserCircle title="image placeholder for user without avatar" />
                </button>
              </div>
              <div className="thought-s-c__r">
                <div className="thought-s-c__div">
                  <span className="thought-s__commentauthor">
                    {comment.username}
                  </span>
                  <p className="thought-s__commentbody">{comment.body}</p>
                  <span className="thought-s__commenttime">{`${formatDate(
                    comment.createdAt
                  )} ago`}</span>
                </div>
                {user && user.username === comment.username && (
                  <button
                    disabled={deletingC}
                    onClick={() => handleShowDeleteCommentModal(comment.id)}
                    className="thought-s__delete"
                    title="delete thought"
                  >
                    <AiTwotoneDelete title="delete thought" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <>
      {showModal && (
        <Modal
          modalCloseBtnClick={
            showDeleteCommentModal
              ? handleShowDeleteCommentModal
              : showCommentModal
              ? handleCommentModal
              : () => setShowModal(false)
          }
          handleModalClick={
            showDeleteCommentModal
              ? handleShowDeleteCommentModal
              : showCommentModal
              ? handleCommentModal
              : () => setShowModal(false)
          }
          cancelButton={showCommentModal ? true : false}
          show={showModal}
          className="thought-s__modal"
          headerText={
            showDeleteCommentModal
              ? "Are you sure you want to delete comment"
              : showCommentModal
              ? "Add comment"
              : "Are you sure you want to delete thought?"
          }
          headerClass="thought-s__modal__header"
          contentClass={
            showCommentModal
              ? "thought-s__modal__content-c"
              : "thought-s__modal__content"
          }
        >
          {showDeleteCommentModal ? (
            <>
              <button
                onClick={handleShowDeleteCommentModal}
                className="thought-s__modal__cancelbtn"
                disabled={deletingC}
              >
                Cancel
              </button>
              <button
                disabled={deletingC}
                onClick={deleteComment}
                className="thought-s__modal__deletebtn"
              >
                {deletingC ? <Spinner small={true} /> : "Delete"}
              </button>
              {errorC && (
                <p className="thought-s__modal__error">
                  Could not perform operation, please try again
                </p>
              )}
            </>
          ) : showCommentModal ? (
            <form onSubmit={onSubmit} className="commentform">
              <textarea
                placeholder="your comment"
                onChange={onChange}
                rows="3"
                name="comment"
                id="comment"
                value={values.comment}
                className="commentform__input"
              ></textarea>
              <button disabled={adding} className="commentform__submit">
                {adding ? <Spinner small={true} /> : "Send"}
              </button>
            </form>
          ) : (
            <>
              <button
                onClick={() => setShowModal(false)}
                className="thought-s__modal__cancelbtn"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                disabled={deleting}
                onClick={deleteSingleThought}
                className="thought-s__modal__deletebtn"
              >
                {deleting ? <Spinner small={true} /> : "Delete"}
              </button>
              {deleteError && (
                <p className="thought-s__modal__error">
                  Could not perform operation, please try again
                </p>
              )}
            </>
          )}
        </Modal>
      )}

      <section className="thought-s">
        <h2 className="page__header">Thought</h2>
        {show}
      </section>
    </>
  );
}
