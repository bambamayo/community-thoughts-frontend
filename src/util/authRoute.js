import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth";

export default function AuthRoute({ children, ...rest }) {
  const { user } = React.useContext(AuthContext);

  return (
    <Route {...rest} render={() => (user ? <Redirect to="/" /> : children)} />
  );
}
