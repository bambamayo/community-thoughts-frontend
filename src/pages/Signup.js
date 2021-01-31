import { gql, useMutation } from "@apollo/client";
import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

export default function Signup() {
  const [errors, setErrors] = React.useState({});

  const context = React.useContext(AuthContext);

  const history = useHistory();

  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { onChange, onSubmit, values } = useForm(registerUser, initialState);

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <section className="page-container">
      <h2 className="page__header">Create your free account</h2>
      <form onSubmit={onSubmit} noValidate className="auth__form">
        <div className="auth__group">
          <label htmlFor="username" className="auth__label">
            Username
          </label>
          <input
            type="text"
            value={values.username}
            className={`auth__input ${
              errors.username ? "auth__input--error" : ""
            }`}
            onChange={onChange}
            id="username"
            name="username"
            placeholder="username.."
          />
          {errors.username && (
            <span className="auth__error">{errors.username}</span>
          )}
        </div>
        <div className="auth__group">
          <label htmlFor="email" className="auth__label">
            Email
          </label>
          <input
            type="email"
            value={values.email}
            onChange={onChange}
            className={`auth__input ${
              errors.email ? "auth__input--error" : ""
            }`}
            id="email"
            name="email"
            placeholder="email.."
          />
          {errors.email && <span className="auth__error">{errors.email}</span>}
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
            placeholder="password of at least six characters..."
          />
          {errors.password && (
            <span className="auth__error">{errors.password}</span>
          )}
        </div>
        <div className="auth__group">
          <label htmlFor="confirmPassword" className="auth__label">
            Confirm Password
          </label>
          <input
            type="password"
            value={values.confirmPassword}
            className={`auth__input ${
              errors.confirmPassword ? "auth__input--error" : ""
            }`}
            onChange={onChange}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="confirm password..."
          />
          {errors.confirmPassword && (
            <span className="auth__error">{errors.confirmPassword}</span>
          )}
        </div>
        <div className="auth__group">
          <button className="auth__submitbtn">
            {loading ? <Spinner /> : "Create your free account"}
          </button>
        </div>
      </form>
      <div className="auth__change">
        <Link className="auth__change-link" to="/login">
          or log into your account
        </Link>
      </div>
    </section>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
