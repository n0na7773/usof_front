import React, { useState, useEffect, useCallback, useContext } from "react";
import Loader from "react-loader-spinner";

import css from "./Categories.module.css";
import AuthContext from "../store/auth-context";

const CategoriesList = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const authCtx = useContext(AuthContext);

  const fetchCategoriesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/categories`,
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
      const transformedData = data.map((Post) => {
        return { key: Post.id, ...Post };
      });
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [authCtx.isLoggedIn, authCtx.token]);

  useEffect(() => {
    fetchCategoriesHandler();
  }, [fetchCategoriesHandler]);

  return (
      <div className={css.CategoriesList}>
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && !error && (
          <p>We got no Categories</p>
        )}
        {isLoading && (
          <Loader
            type="TailSpin"
            color="#1E81B0"
            height={100}
            width={100}
            timeout={3000}
          />
        )}
      </div>
  );
};

export default CategoriesList;
