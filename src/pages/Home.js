import * as React from "react";
import ThoughtLoader from "../components/Loaders/ThoughtLoader";
import { useQuery } from "@apollo/client";
import Thought from "../components/Thought";
import { formatDate } from "../helpers";
import { AuthContext } from "../context/auth";
import ThoughtForm from "../components/ThoughtForm/ThoughtForm";
import { FETCH_THOUGHTS_QUERY } from "../util/graphql/queries";

export default function Home() {
  const { user } = React.useContext(AuthContext);
  const { loading, data, error } = useQuery(FETCH_THOUGHTS_QUERY);

  let show;
  if (loading) {
    show = (
      <>
        <ThoughtLoader />
        <ThoughtLoader />
        <ThoughtLoader />
      </>
    );
  }

  if (error) {
    show = (
      <div className="home__error">
        Could not load thoughts, please try reloading the pages
      </div>
    );
  } else if (data) {
    if (data.length === 0) {
      show = (
        <div className="home__thoughtempty">
          No thought to show. Add a thought maybe?
        </div>
      );
    } else {
      show = data.getThoughts.map((thought) => (
        <Thought
          key={thought.id}
          id={thought.id}
          avatarPresent={false}
          author={thought.username}
          body={thought.body}
          commentCount={thought.commentCount}
          upvoteCount={thought.upvoteCount}
          downvoteCount={thought.downvoteCount}
          timePosted={`${formatDate(thought.createdAt)} ago`}
          upvotes={thought.upvotes}
          downvotes={thought.downvotes}
        />
      ));
    }
  }
  return (
    <section className="page-container home">
      {user ? (
        <ThoughtForm username={user.username} />
      ) : (
        <div className="home__warning">
          ! Only logged in users can add thoughts, edit thoughts and vote on
          thoughts
        </div>
      )}

      <div className="thoughts__list">{show}</div>
    </section>
  );
}
