import React, { useState, useContext, useEffect, useCallback } from "react";
import Loader from "react-loader-spinner";
import AuthContext from "../store/auth-context";
import BigPost from "./BigPost/BigPost";
import CommentCard from "./CommentCard/CommentCard";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import scss from "./SinglePost.module.scss";
import CreateComment from "./CreateComent/CreateComment";

const SinglePost = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [postData, setPostData] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [error, setError] = useState(null);

  const fetchPostHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/posts/${props.id}`,
        {
          method: "GET",
          headers: authCtx.isLoggedIn
            ? {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + authCtx.token,
              }
            : {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setPostData(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [props.id, authCtx.isLoggedIn, authCtx.token]);

  const fetchPostCommentsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/posts/${props.id}/comments`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      const transformedData = data.map((Comment) => {
        return { key: Comment.id, ...Comment };
      });
      setPostComments(Array.from(transformedData));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [props.id]);

  const deletePostHandler = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/posts/${props.id}`,
        {
          method: "DELETE",
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
        alert("Post is deleted");
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const editPostHandler = async (newData) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/posts/${props.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(newData),
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
        fetchPostHandler();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const createCommentHandler = async (newData) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/posts/${props.id}/comments`,
        {
          method: "POST",
          body: JSON.stringify({
            content: newData,
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
        fetchPostCommentsHandler();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchPostHandler();
  }, [fetchPostHandler]);

  useEffect(() => {
    fetchPostCommentsHandler();
  }, [fetchPostCommentsHandler]);

  return (
    <main className={scss.Main}>
      <BigPost
        id={props.id}
        onPostLike={fetchPostHandler}
        onDeletePost={deletePostHandler}
        onEditPost={editPostHandler}
        {...postData}
      />
      <div className={scss.CommentsDiv}>
        {isLoading && (
          <Loader
            type="TailSpin"
            color="#1E81B0"
            height={100}
            width={100}
            timeout={3000}
          />
        )}
        <div className={scss.LabelPostDiv}>
          {!authCtx.token && !isCreatePost && <label>Comments:</label>}
          {authCtx.token && !isCreatePost && (
            <button
              className={scss.CreateButton}
              onClick={() => setIsCreatePost(true)}
            >
              Create new comment
            </button>
          )}

          <CSSTransition
            mountOnEnter
            unmountOnExit
            in={isCreatePost}
            timeout={{
              enter:400,
              exit:0
            }}
            classNames={{
              enter: scss.MyNodeEnter,
              enterActive: scss.MyNodeEnterActive,
              exit: scss.MyNoExit,
              exitActive: scss.MyNodeExitActive,
            }}
          >
            <CreateComment
              onEndCreate={() => setIsCreatePost(false)}
              onCreateComment={createCommentHandler}
            />
          </CSSTransition>
        </div>
        <div className={scss.CommentsList}>
          {!isLoading && error && <p>{error}</p>}
          {!isLoading && postComments.length === 0 && !error && (
            <p className={scss.NoComments}>There are no comments yet</p>
          )}
          {!isLoading &&
            JSON.stringify(postComments).length !== 0 &&
            !error &&
            Array.from(postComments).map((Comment) => (
              <CommentCard
                {...Comment}
                onCommentLike={fetchPostCommentsHandler}
              />
            ))}
        </div>
      </div>
    </main>
  );
};

export default SinglePost;
