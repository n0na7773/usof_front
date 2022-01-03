import React, { useState, useContext, useEffect } from "react";
import Box from "../../UI/Box";
import * as Icon from "react-bootstrap-icons";
import css from "./BigPost.module.css";
import AuthContext from "../../store/auth-context";
import { Link } from "react-router-dom";
import TextareaAutosize from 'react-textarea-autosize';


const BigPost = (props) => {
  const authCtx = useContext(AuthContext);
  const [isEditingNow, setIsEditingNow] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [postCategories, setPostCategories] = useState("");

  useEffect(() => {
    setPostContent(props.content)
  }, [props.content])

  const changePostContentHandler = (event) => {
    setPostContent(event.target.value);
  };

  const changePostCategoriesHandler = (event) => {
    setPostCategories(event.target.value);
  };

  const editPostHandler = (event) => {
    event.preventDefault();

    const newData = {};
    if(postContent.length === 0) {
      alert("Content can`t be empty");
      return;
    } else {
      newData.content = postContent;
    }

    if(postCategories.length !== 0) {
      newData.categories = postCategories.split(',').map(function (x) { 
        return parseInt(x, 10); 
      })
    }

    setIsEditingNow(false);
    props.onEditPost(newData);
  };

  const postLikeHandler = async (type) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/posts/${props.id}/like`,
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
        props.onPostLike();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const deletePostHandler = (event) => {
    event.preventDefault();

    let agree = window.confirm("Are you sure?");

    if (agree) {
      props.onDeletePost();
    }
  };

  return (
    <div className={css.Wrapper}>
      <Box className={css.BigPost}>
        <div className={css.PostMark}>
          <Icon.ChevronUp
            className={css.MarkButton}
            onClick={() => postLikeHandler("like")}
          />
          <span className={css.Rating}>{props.rating}</span>
          <Icon.ChevronDown
            className={css.MarkButton}
            onClick={() => postLikeHandler("dislike")}
          />
        </div>
        <div className={css.PostMain}>
          <div>
            <label className={css.PostTitle}>{props.title}</label>
            <div className={css.CategoriesAndUser}>
              {props.categories &&
                props.categories.map((Category) => {
                  return (
                    <Link
                      to={`/category/${Category.category_id}/${Category.category_name}`}
                      key={Category.category_id}
                      className={css.Link}
                    >
                      #{Category.category_name}
                    </Link>
                  );
                })}
              <img src={props.user_avatar_url} className={css.PersonAvatar} alt="user avatar"/>
              <Link to={`/user/${props.user_id}`} className={css.Link}>
                {props.user_login}
              </Link>
            </div>
            <div className={css.PostContent}>
              {!isEditingNow && (
                <span className={css.PostContentText}>{props.content}</span>
              )}
              {isEditingNow && (
                <TextareaAutosize
                  className={css.ContentInput}
                  value={postContent}
                  onChange={changePostContentHandler}
                />
              )}
              {isEditingNow && (
                <input
                  type="text"
                  className={css.CategoriesInput}
                  value={postCategories}
                  onChange={changePostCategoriesHandler}
                />
              )}
            </div>
          </div>
          <div>
            <div className={css.PostDate}>
              <span>{new Date(props.updated_at).toUTCString()}</span>
            </div>
          </div>
        </div>
      </Box>
      {(authCtx.role === "admin" || authCtx.userId === props.user_id) &&
        !isEditingNow && (
          <div className={css.ButtonsDiv}>
            <button
              className={css.Button}
              onClick={() => setIsEditingNow(true)}
            >
              Edit Post
            </button>
            <button
              className={`${css.Button} ${css.ButtonDeletePost}`}
              onClick={deletePostHandler}
            >
              Delete Post
            </button>
          </div>
        )}
      {(authCtx.role === "admin" || authCtx.userId === props.user_id) &&
        isEditingNow && (
          <div className={css.ButtonsDiv}>
            <button className={css.Button} onClick={editPostHandler}>Save post</button>
            <button
              className={`${css.Button} ${css.ButtonCancel}`}
              onClick={() => setIsEditingNow(false)}
            >
              Cancel
            </button>
          </div>
        )}
    </div>
  );
};

export default BigPost;
