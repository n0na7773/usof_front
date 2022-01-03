import React, { useState, useEffect, useCallback } from "react";
import Loader from "react-loader-spinner";
import Post from "../Post/Post";

import css from "./CategoryPosts.module.css";

const CategoryPost = (props) => {
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategoryPostsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/categories/${props.category_id}/posts`,
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
        return { key: Post.id, ...Post };
      });
      setCategoryPosts(Array.from(transformedData));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [props.category_id]);

  useEffect(() => {
    fetchCategoryPostsHandler();
  }, [fetchCategoryPostsHandler]);

  return (
    <main className={css.Main}>
        <div className={css.LabelPostDiv}>
            <label>#{props.category_name}</label>
        </div>
      {isLoading && (
        <Loader
          type="TailSpin"
          color="#1E81B0"
          height={100}
          width={100}
          timeout={3000}
        />
      )}
      <div className={css.CategoryPostList}>
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && categoryPosts.length === 0 && !error && (
          <p className={css.NoPosts}>There are no posts yet</p>
        )}
        {!isLoading && 
          JSON.stringify(categoryPosts).length !== 0 &&
          !error &&
          Array.from(categoryPosts).map((post) => (
            <Post {...post} onLike={fetchCategoryPostsHandler} />
          ))}
      </div>
    </main>
  );
};

export default CategoryPost;
