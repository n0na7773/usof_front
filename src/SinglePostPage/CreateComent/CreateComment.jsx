import React, { useState, useContext } from "react";
import Box from "../../UI/Box";
import * as Icon from "react-bootstrap-icons";
import css from "./CreateComment.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import TextareaAutosize from 'react-textarea-autosize';

const CreateComment = (props) => {
  const authCtx = useContext(AuthContext);
  const [commentContent, setCommentContent] = useState("");

  const changeCommentContentHandler = (event) => {
    setCommentContent(event.target.value);
  };

  const createCommentHandler = (event) => {
    event.preventDefault();

    if(commentContent.length === 0){
        alert("Comment can`t be empty");
        return;
    }
    props.onEndCreate();
    props.onCreateComment(commentContent);
  };

  return (
    <Box className={css.CreateComment}>
      <div className={css.CommentMark}>
        <Icon.ChevronUp className={css.MarkButton} />
        <span className={css.Rating}>0</span>
        <Icon.ChevronDown className={css.MarkButton} />
      </div>
      <div className={css.CommentMain}>
        <div>
          <div className={css.User}>
            <img src={authCtx.avatarUrl} className={css.PersonAvatar} alt="user avatar"/>
            <Link to={`/user/${props.user_id}`} className={css.Link}>
              {authCtx.userLogin}
            </Link>
          </div>
          <div className={css.CommentContent}>
            <TextareaAutosize
              value={commentContent}
              onChange={changeCommentContentHandler}
              className={css.ContentInput}
            />
          </div>
        </div>
        <div>
          <div className={css.ButtonsDiv}>
            <button className={`${css.Button}`} onClick={createCommentHandler}>Create</button>
            <button
              className={`${css.Button} ${css.ButtonCancel}`}
              onClick={props.onEndCreate}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default CreateComment;
