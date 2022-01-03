import React, { useContext, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import AuthContext from "./store/auth-context";
import Loader from "react-loader-spinner";

const SignInPage = React.lazy(() => import("./pages/SignInPage"));
const SignUpPage = React.lazy(() => import("./pages/SignUpPage"));
const CategoryPostsPage = React.lazy(() => import("./pages/CategoryPostsPage"));
const CreatePostPage = React.lazy(() => import("./pages/CreatePostPage"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const PostsPage = React.lazy(() => import("./pages/PostsPage"));
const CategoriesPage = React.lazy(() => import("./pages/CategoriesPage"));
const SinglePostPage = React.lazy(() => import("./pages/SinglePostPage"));
const SingleUserPage = React.lazy(() => import("./pages/SingleUserPage"));
const UserListPage = React.lazy(() => import("./pages/UserListPage"));

function App() {
  const ctxAuth = useContext(AuthContext);

  return (
    <Layout>
      <Suspense
        fallback={
          <Loader
            type="TailSpin"
            color="#D2E1FF"
            height={100}
            width={100}
            timeout={5000}
          />
        }
      >
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/login" exact element={<SignInPage />} />
          <Route path="/register" exact element={<SignUpPage />} />
          <Route path="/users" exact element={<UserListPage />} />
          <Route path="/user/:user_id" exact element={<SingleUserPage />} />
          <Route path="/category/:category_id/:category_name" exact element={<CategoryPostsPage />} />
          <Route path="/posts" exact element={<PostsPage />} />
          <Route path="/categories" exact element={<CategoriesPage />} />
          <Route path="/post/:post_id" exact element={<SinglePostPage />} />
          
          {ctxAuth.isLoggedIn && (
            <Route path="/profile" exact element={<ProfilePage />} />
          )}
          {ctxAuth.isLoggedIn && (
            <Route path="/createPost" exact element={<CreatePostPage />} />
          )}
          {!ctxAuth.isLoggedIn && (
            <Route path="*" exact element={<SignInPage />} />
          )}
          {ctxAuth.isLoggedIn && (
            <Route path="*" exact element={<ProfilePage />} />
          )}

        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
