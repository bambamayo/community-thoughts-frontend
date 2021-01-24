import { Link, NavLink } from "react-router-dom";

import { BiUserCircle } from "react-icons/bi";

export default function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <div className="logo">
          <Link to="/" className="logo__text">
            CommunityThoughts
          </Link>
        </div>
        <ul className="header__linkslist">
          <li className="header__listitem">
            <NavLink
              activeClassName="active"
              to="login"
              className="header__link"
            >
              Login
            </NavLink>
          </li>
          <li className="header__listitem">
            <NavLink
              activeClassName="active"
              to="signup"
              className="header__link"
            >
              Create account
            </NavLink>
          </li>
          <li className="header__listitem">
            <NavLink
              activeClassName="active"
              to="user"
              className="header__link"
            >
              <BiUserCircle size={30} />
              <span>Welcome user</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
