import ThoughtLoader from "../components/Loaders/ThoughtLoader";
import { useQuery, gql } from "@apollo/client";
import Thought from "../components/Thought";
import { formatDate } from "../helpers";

const FETCH_THOUGHTS_QUERY = gql`
  query {
    getThoughts {
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

export default function Home() {
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
          avatarPresent={false}
          author={thought.username}
          userPost={true}
          body={thought.body}
          commentCount={thought.commentCount}
          upvoteCount={thought.upvoteCount}
          downvoteCount={thought.downvoteCount}
          timePosted={`${formatDate(thought.createdAt)} ago`}
        />
      ));
    }
  }
  return (
    <section className="page-container home">
      <div className="home__warning">
        ! Only logged in users can add thoughts, edit thoughts and vote on
        thoughts
      </div>
      <div className="thoughts__list">{show}</div>
    </section>
  );
}
