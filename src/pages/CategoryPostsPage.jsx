import React from "react";
import { useParams } from "react-router";
import CategoryPost from "../CategoryPostsPage/CategoryPosts";

const CategoryPostsPage = (props) => {
  let { category_id, category_name} = useParams();
  return <CategoryPost category_id={category_id} category_name={category_name}/>;
};

export default CategoryPostsPage;
