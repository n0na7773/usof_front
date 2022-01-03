import React from "react";
import css from "./UserCard.module.css";
import Box from "../../UI/Box";
import { Link } from "react-router-dom";

const UserCard = (props) => {
  return (
    <Box className={css.UserCard}>
      <div className={css.UserAvatar}>
        <img src={props.avatar_url} className={css.Avatar} alt="User avatar" />
      </div>
      <div className={css.UserInfoDiv}>
        <Link to={`/user/${props.id}`} className={css.Login}>
            {props.login}
            {props.role === "admin" && (
              <span className={css.AdminSpan}>(admin)</span>
            )}
        </Link>
        <span className={css.Rating}>Rating: {props.rating}</span>
        <span className={css.FullName}>{props.full_name}</span>
      </div>
    </Box>
  );
};

export default UserCard;
