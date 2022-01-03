import { useState, useContext, useCallback, useEffect } from "react";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import Post from "../Post/Post";
import AuthContext from "../store/auth-context";
import UserEdit from "./UserEdit/UserEdit";
import UserInfo from "./UserInfo/UserInfo";
import css from "./UserProfile.module.css";
import Fade from "react-reveal/Fade";

const UserProfile = (props) => {
  const [postsData, setPostsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);
  const [editShow, setEditShow] = useState(false);

  const saveEditHandler = async (newData) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/users/${authCtx.userId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            full_name: newData,
            role: authCtx.role,
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
        authCtx.editProfile(newData);
        console.log(data);
      }
    } catch (error) {
      alert(error.message);
    }

    setEditShow(false);
  };

  const fetchPostsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/posts/user/${authCtx.userId}`,
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
        return { key: Post.id, user_login: authCtx.userLogin, ...Post };
      });
      setPostsData(Array.from(transformedData));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [authCtx.userId, authCtx.userLogin]);

  useEffect(() => {
    fetchPostsHandler();
  }, [fetchPostsHandler]);

  return (
    <main className={css.Main}>
      <UserInfo show={editShow} onShowEdit={() => setEditShow(true)} />
      {editShow && (
        <Fade duration={500}>
          <UserEdit
            onCancel={() => setEditShow(false)}
            onSave={saveEditHandler}
          />
        </Fade>
      )}
      <div className={css.LabelPostDiv}>
        <label>Posts</label>
        <Link to="createPost">
          <button className={css.CreateButton}>Create new post</button>
        </Link>
      </div>
      <div className={css.UserPostList}>
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && postsData.length === 0 && !error && (
          <p className={css.NoPosts}>There are no posts yet</p>
        )}
        {!isLoading &&
          JSON.stringify(postsData).length !== 0 &&
          !error &&
          Array.from(postsData).map((post) => (
            <Post {...post} onLike={fetchPostsHandler} />
          ))}
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
    </main>
  );
};

export default UserProfile;
