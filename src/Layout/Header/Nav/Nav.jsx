import scss from "./Nav.module.scss";
import { Link, useLocation } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "../../../store/auth-context";

const Nav = (props) => {
  const loc = useLocation();
  const authCtx = useContext(AuthContext);

  return (
    <ul
      className={`${scss.Nav} ${authCtx.isLoggedIn ? scss.Big : scss.Small}`}
    >
      <li className={loc.pathname === "/posts" ? scss.Active : null}>
        <Link to="/posts">Posts</Link>
      </li>
      <li className={loc.pathname === "/users" ? scss.Active : null}>
        <Link to="/users">Users</Link>
      </li>
      <li className={loc.pathname === "/categories" ? scss.Active : null}>
        <Link to="/categories">Categories</Link>
      </li>
    </ul>
  );
};

export default Nav;
