import React from "react";
import { useParams } from "react-router";
import SinglePost from "../SinglePostPage/SinglePost";
import Zoom from "react-reveal/Zoom";

const SinglePostPage = (props) => {
  let { post_id } = useParams();
  return (
    <Zoom delay={400} duration={400}>
      <SinglePost id={post_id} />
    </Zoom>
  );
};

export default SinglePostPage;
