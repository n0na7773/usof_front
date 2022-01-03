import React, { useState, useEffect, useCallback } from "react";
import Loader from "react-loader-spinner";

import css from "./UserList.module.css";
import UserCard from "./UserCard/UserCard";

const UserList = (props) => {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPostsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/users`,
        {
          method: "GET",
          headers:  {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      const transformedData = data.map((User) => {
        return { key: User.id, ...User };
      });
      setUsersData(Array.from(transformedData));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPostsHandler();
  }, [fetchPostsHandler]);

  return (
    <div className={css.Main}>
        <div className={css.UserList}>
        {!isLoading && error && <p>{error}</p>}
        {!isLoading &&
            JSON.stringify(usersData).length !== 0 &&
            !error &&
            Array.from(usersData).map((user) => <UserCard {...user}/>)}
        {!isLoading && usersData.length === 0 && !error && (
            <p>We got no users</p>
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
    </div>

  );
};

export default UserList;
