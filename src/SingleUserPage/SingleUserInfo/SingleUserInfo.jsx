import React from "react";
import Box from "../../UI/Box";

import css from "./SingleUserInfo.module.css";

const SingleUserInfo = (props) => {

  return (
    <Box className={css.UserInfoDiv}>
      <div className={css.AvatarDiv}>
          <img
            src={props.avatar_url}
            className={css.Avatar}
            alt="User avatar"
          />
      </div>
      <div className={css.InfoDiv}>
        <span className={css.Login}>
          {props.login}
          {props.role === "admin" && <span className={css.AdminSpan}>(admin)</span>}
        </span>
        <span className={css.Rating}>Rating: {props.rating}</span>
        <span className={css.FullName}>{props.full_name}</span>
      </div>
    </Box>
  );
};

export default SingleUserInfo;
