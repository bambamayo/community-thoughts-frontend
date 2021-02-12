import { gql, useMutation } from "@apollo/client";
import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

export default function Login() {
  const [errors, setErrors] = React.useState({});

  const context = React.useContext(AuthContext);

  const history = useHistory();

  const initialState = {
    username: "",
    password: "",
  };

  const { onChange, onSubmit, values } = useForm(loginUser, initialState);

  const [login, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUser() {
    login();
  }

  return (
    <section className="page-container">
      <h2 className="page__header">Log into your account</h2>
      <form onSubmit={onSubmit} noValidate className="auth__form">
        <div className="auth__group">
          <label htmlFor="username" className="auth__label">
            Username
          </label>
          <input
            type="username"
            value={values.username}
            onChange={onChange}
            className={`auth__input ${
              errors.username ? "auth__input--error" : ""
            }`}
            id="username"
            name="username"
            placeholder="username.."
          />
          {errors.username && (
            <span className="auth__error">{errors.username}</span>
          )}
        </div>
        <div className="auth__group">
          <label htmlFor="password" className="auth__label">
            Password
          </label>
          <input
            type="password"
            value={values.password}
            onChange={onChange}
            className={`auth__input ${
              errors.password ? "auth__input--error" : ""
            }`}
            id="password"
            name="password"
            placeholder="password..."
          />
          {errors.password && (
            <span className="auth__error">{errors.password}</span>
          )}
        </div>

        <div className="auth__group">
          <button className="auth__submitbtn">
            {loading ? <Spinner /> : "Login"}
          </button>
        </div>
      </form>
      <div className="auth__change">
        <Link className="auth__change-link" to="/signup">
          or create your free account
        </Link>
      </div>
    </section>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
