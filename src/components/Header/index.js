import * as React from "react";
import { Link, NavLink } from "react-router-dom";

import { BiUserCircle } from "react-icons/bi";
import { AuthContext } from "../../context/auth";

export default function Header() {
  const { user, logout } = React.useContext(AuthContext);

  return (
    <header className="header">
      <nav className="header__nav">
        <div className="logo">
          <Link to="/" className="logo__text">
            CommunityThoughts
          </Link>
        </div>
        <ul className="header__linkslist">
          {!user && (
            <li className="header__listitem">
              <NavLink
                activeClassName="active"
                to="login"
                className="header__link"
              >
                Login
              </NavLink>
            </li>
          )}
          {!user && (
            <li className="header__listitem">
              <NavLink
                activeClassName="active"
                to="signup"
                className="header__link"
              >
                Create account
              </NavLink>
            </li>
          )}

          {user && (
            <li className="header__listitem">
              <NavLink
                activeClassName="active"
                to="user"
                className="header__link"
              >
                <BiUserCircle size={30} />
                <span>Welcome {user.username}</span>
              </NavLink>
            </li>
          )}
          {user && (
            <button onClick={logout} className="header__logoutbtn">
              log out
            </button>
          )}
        </ul>
      </nav>
    </header>
  );
}
