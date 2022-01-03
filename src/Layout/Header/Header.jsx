import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import css from "./Header.module.scss";
import Nav from "./Nav/Nav";
import Burger from "./Burger/Burger";
import AuthContext from "../../store/auth-context";
import Pizza from "../../store/img/Circles.png"

const Header = (props) => {
  const authCtx = useContext(AuthContext);
  const [burgerIsOpen, setBurgerIsOpen] = useState(false);
  const navigate = useNavigate();

  const burgerMenuHandler = () => {
    setBurgerIsOpen((prevState) => !prevState);
  };

//   return (
//     <Box className={css.Header}>
//       <Link to="/"><img src={Logo} className={css.logoImage} alt="Logo" /></Link>
//       <Nav />
//       {!authCtx.isLoggedIn && (
//         <button className={css.button} onClick={authCtx.switchLogInNow}>
//           Log in
//         </button>
//       )}
//       {authCtx.isLoggedIn && (
//         <div className={css.RightBox}>
//           <img src={authCtx.avatarUrl} className={css.Avatar} alt='User avatar'/>
//           <Link to="/profile" className={css.UserLogin}>{authCtx.userLogin}</Link>{" "}
//           <button className={css.button} onClick={authCtx.logout}>
//             Log out
//           </button>
//         </div>
//       )}
//     </Box>
//   );
// };
  return (
    <header className={css.Header}>
      <img src={Pizza} className={css.PizzaImg}/>
            <div className={css.LeftBox}>
        <Link to="/" className={css.Logo} /*onClick={burgerIsOpen ? burgerMenuHandler : null}*/>
          <span className={css.LogoText}>USOF</span>
        </Link>

        <Nav IsLoggedIn={authCtx.isLoggedIn}/>
        <Burger
        onBurgerMenuOpen={burgerMenuHandler}
        burgerIsOpen={burgerIsOpen}
        />
      </div>
      {!authCtx.isLoggedIn && (
        <div className={css.RightBox}>
          <button
            className={`${css.Button} ${css.SignIn}`}
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
          <button
            className={`${css.Button} ${css.SignUp}`}
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </div>
      )}
      {authCtx.isLoggedIn && (
        <div className={css.RightBox}>
          <button
            className={`${css.Button} ${css.Profile}`}
            onClick={() => navigate("/profile")}
          >
            {authCtx.email}
          </button>
          <button
            className={`${css.Button} ${css.Logout}`}
            onClick={() => {
              authCtx.logout();
              navigate("/");
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
