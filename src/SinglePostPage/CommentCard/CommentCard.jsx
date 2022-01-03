import React, { useContext } from "react";
import Box from "../../UI/Box";
import * as Icon from "react-bootstrap-icons";
import css from "./CommentCard.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const CommentCard = (props) => {
  const authCtx = useContext(AuthContext);

  const commentLikeHandler = async (type) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/comments/${props.id}/like`,
        {
          method: "POST",
          body: JSON.stringify({
            type: type,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + authCtx.token,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      } else {
        props.onCommentLike();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box className={css.CommentCard}>
      <div className={css.CommentMark}>
        <Icon.ChevronUp
          className={css.MarkButton}
          onClick={() => commentLikeHandler("like")}
        />
        <span className={css.Rating}>{props.rating}</span>
        <Icon.ChevronDown
          className={css.MarkButton}
          onClick={() => commentLikeHandler("dislike")}
        />
      </div>
      <div className={css.CommentMain}>
        <div>
          <div className={css.User}>
            <img src={props.user_avatar_url} className={css.PersonAvatar} alt="user avatar"/>
            <Link to={`/user/${props.user_id}`} className={css.Link}>
              {props.user_login}
            </Link>
          </div>
          <div className={css.CommentContent}>
            <span className={css.CommentContentText}>
              {props.content}
            </span>
          </div>
        </div>
        <div>
          <div className={css.CommentDate}>
            <span>{new Date(props.updated_at).toUTCString()}</span>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default CommentCard;
