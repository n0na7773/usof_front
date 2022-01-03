import React, { useRef} from "react";
import css from "./SignUp.module.css";
import {useNavigate } from "react-router-dom";


const SignUp = (props) => {
  const navigate = useNavigate();
  const loginRef = useRef("");
  const full_nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const password_confirmationRef = useRef("");

  const user = {
    login: loginRef.current.value,
    full_name: full_nameRef.current.value,
    email: emailRef.current.value,
    password: passwordRef.current.value,
    password_confirmation: password_confirmationRef.current.value,
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/register', {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
      });
      const data = await response.json();

      if(!response.ok) {
          throw new Error(data.message);
      } else {
          alert("Sign Up succeed! Now log in");
          console.log(data);
          navigate('/profile');
      }
    } catch (error) {
        alert(error.message);
    }

    //props.onCreateUser(user);
  };

  return (
    <div className={css.SignUp}>
      <form onSubmit={submitHandler}>
        <span className={css.Title}>Welcome to USOF</span>
        <div className={css.filedDiv}>
          <input type="text" placeholder="Login" ref={loginRef} />
        </div>
        <div className={css.filedDiv}>
          <input type="text" placeholder="Name" ref={full_nameRef} />
        </div>
        <div className={css.filedDiv}>
          <input type="email" placeholder="Email" ref={emailRef} />
        </div>
        <div className={css.filedDiv}>
          <input type="password" placeholder="Password" ref={passwordRef} />
        </div>
        <div className={css.filedDiv}>
          <input
            type="password"
            placeholder="Password repeat"
            ref={password_confirmationRef}
          />
        </div>
        <button type="submit" className={css.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
