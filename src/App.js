import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider } from "./context/auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthRoute from "./util/authRoute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Route exact path="/">
          <Home />
        </Route>
        <AuthRoute exact path="/login">
          <Login />
        </AuthRoute>
        <AuthRoute exact path="/signup">
          <Signup />
        </AuthRoute>
      </Router>
    </AuthProvider>
  );
}
