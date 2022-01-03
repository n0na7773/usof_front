import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Box from "../../UI/Box";

import css from "./UserInfo.module.css";

const UserInfo = (props) => {
  const authCtx = useContext(AuthContext);

  const saveImageHandler = async (event) => {
    event.preventDefault();
    try {
      var dataRequest = new FormData();
      dataRequest.append("image", event.target.files[0]);

      const response = await fetch(
        `http://127.0.0.1:8000/api/users/avatar`,
        {
          method: "POST",
          body: dataRequest,
          headers: {
            Authorization: "Bearer " + authCtx.token,
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      } else {
        authCtx.changeAvatar(data.url);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box className={css.UserInfoDiv}>
      <div className={css.AvatarDiv}>
        <label htmlFor="file-input">
          <img
            src={authCtx.avatarUrl}
            className={css.Avatar}
            alt="User avatar"
          />
        </label>
        <input id="file-input" type="file" onChange={saveImageHandler} />
      </div>
      <div className={css.InfoDiv}>
        <span className={css.Login}>
          {authCtx.userLogin}
          {authCtx.role === "admin" && <span className={css.AdminSpan}>(admin)</span>}
        </span>
        <span className={css.FullName}>{authCtx.fullName}</span>
        <span className={css.Email}>{authCtx.email}</span>
        <button
          className={css.button}
          onClick={props.onShowEdit}
          disabled={props.show}
        >
          Edit Profile
        </button>
      </div>
    </Box>
  );
};

export default UserInfo;
