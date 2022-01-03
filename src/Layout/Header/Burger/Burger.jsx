import React, { useContext } from "react";
import scss from "./Burger.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import { CSSTransition } from "react-transition-group";
import { Sling as Hamburger } from "hamburger-react";

const Burger = (props) => {
  const navigate = useNavigate();
  const loc = useLocation();
  const authCtx = useContext(AuthContext);

  return (
    <>
      <div className={scss.Burger}>
        <Hamburger
          toggled={props.burgerIsOpen}
          toggle={props.onBurgerMenuOpen}
          rounded={true}
          size={36}
          color="#000000"
        />
      </div>
      <CSSTransition
        in={props.burgerIsOpen}
        timeout={200}
        classNames={{
          enterActive: scss.BurgerMenuEnterActive,
          enterDone: scss.BurgerMenuEnterDone,
          exitActive: scss.BurgerMenuExit,
          exitDone: scss.BurgerMenuExitActive,
        }}
        mountOnEnter
        unmountOnExit
      >
        <div className={scss.BurgerMenu}>
          <ul className={scss.Nav}>
            <li className={loc.pathname === "/posts" ? scss.Active : null}>
              <Link to="/posts" onClick={() => props.onBurgerMenuOpen()}>
                Posts
              </Link>
            </li>
            <li className={loc.pathname === "/users" ? scss.Active : null}>
              <Link to="/users" onClick={() => props.onBurgerMenuOpen()}>
                Users
              </Link>
            </li>
            <li className={loc.pathname === "/categories" ? scss.Active : null}>
              <Link to="/categories" onClick={() => props.onBurgerMenuOpen()}>
                Categories
              </Link>
            </li>
          </ul>
          {/* {!authCtx.isLoggedIn && (
            <div className={scss.ButtonsDiv}>
              <button
                className={`${scss.Button} ${scss.SignIn}`}
                onClick={() => {
                  props.onBurgerMenuOpen();
                  navigate("/login");
                }}
              >
                Sign In
              </button>
              <button
                className={`${scss.Button} ${scss.SignUp}`}
                onClick={() => {
                  navigate("/register");
                  props.onBurgerMenuOpen();
                }}
              >
                Sign Up
              </button>
            </div>
          )}
          {authCtx.isLoggedIn && (
            <div className={scss.ButtonsDiv}>
              <button
                className={`${scss.Button} ${scss.Profile}`}
                onClick={() => {
                  navigate("/profile");
                  props.onBurgerMenuOpen();
                }}
              >
                {authCtx.email}
              </button>
              <button
                className={`${scss.Button} ${scss.Logout}`}
                onClick={() => {
                  authCtx.logout();
                  navigate("/");
                }}
              >
                Sign Out
              </button>
            </div>
          )} */}
        </div>
      </CSSTransition>
    </>
  );
};

export default Burger;
