import React, { useState, useEffect, useCallback } from "react";
import Loader from "react-loader-spinner";
import Post from "../Post/Post";

import css from "./SingleUser.module.css";
import SingleUserInfo from "./SingleUserInfo/SingleUserInfo";

const SingleUser = (props) => {
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserInfoHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/users/${props.id}`,
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
      setUserData(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [props.id]);

  const fetchPostsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/posts/user/${props.id}`,
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
      const transformedData = data.map((Post) => {
        return { key: Post.id, user_login:userData.login,  ...Post };
      });
      setUserPosts(Array.from(transformedData));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [props.id, userData.login]);

  useEffect(() => {
    fetchPostsHandler();
    fetchUserInfoHandler();
  }, [fetchPostsHandler, fetchUserInfoHandler]);

  return (
    <main className={css.Main}>
      {isLoading && (
          <Loader
            type="TailSpin"
            color="#1E81B0"
            height={100}
            width={100}
            timeout={3000}
          />
        )}
      {!isLoading && <SingleUserInfo {...userData}/> }
      <div className={css.LabelPostDiv}>
        <label>Posts</label>
      </div>
      <div className={css.UserPostList}>
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && userPosts.length === 0 && !error && (
          <p className={css.NoPosts}>There are no posts yet</p>
        )}
        {!isLoading &&
          JSON.stringify(userPosts).length !== 0 &&
          !error &&
          Array.from(userPosts).map((post) => (
            <Post {...post} onLike={fetchPostsHandler} />
          ))}
      </div>
    </main>
  );
};

export default SingleUser;
