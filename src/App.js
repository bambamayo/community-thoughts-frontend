import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider } from "./context/auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SingleThought from "./pages/SingleThought";
import AuthRoute from "./util/authRoute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/:author/thought/:id">
            <SingleThought />
          </Route>
          <AuthRoute path="/login">
            <Login />
          </AuthRoute>
          <AuthRoute path="/signup">
            <Signup />
          </AuthRoute>
        </Switch>
      </Router>
    </AuthProvider>
  );
}
