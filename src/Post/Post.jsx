import React, {useContext} from "react";
import * as Icon from "react-bootstrap-icons";
import css from "./Post.module.css";
import { Link } from "react-router-dom";
import Box from "../UI/Box";
import AuthContext from "../store/auth-context";


const Post = (props) => {
    const authCtx = useContext(AuthContext);
    let contentText = props.content;
    if(contentText.length > 140) contentText = contentText.substring(0, 140) + "...";

    const likeHandler = async (type) => {
        try {
            const response = await fetch(
              `http://127.0.0.1:8000/api/posts/${props.id}/like`,
              {
                method: "POST",
                body: JSON.stringify({
                  "type": type
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
              props.onLike();
            }
          } catch (error) {
            alert(error.message);
          }
    }

    return (
        <Box className={css.Post}>
            <div className={css.PostMark}>
                <Icon.ChevronUp className={css.MarkButton} onClick={()=>likeHandler('like')}/>
                <span className={css.Rating}>{props.rating}</span>
                <Icon.ChevronDown className={css.MarkButton} onClick={()=>likeHandler('dislike')}/>
            </div>
            <div className={css.PostMain}>
                <div>
                    <Link to={`/post/${props.id}`} className={css.PostTitle}>{props.title}</Link>
                    <div className={css.CategoriesAndUser}>
                        {Array.from(props.categories).map((Category) => {
                            return <Link to={`/category/${Category.category_id}/${Category.category_name}`} key={Category.category_id} className={css.Link}>#{Category.category_name}</Link>;
                        })}
                        <Icon.Person className={css.PersonIcon}/>
                        <Link to={`/user/${props.user_id}`} className={css.Link} >{props.user_login}</Link>
                    </div>
                    <div className={css.PostContent}>
                        <span className={css.PostContentText}>{contentText}</span>
                    </div>
                </div>
                <div>
                    <div className={css.PostDate}>
                        <span>{new Date(props.updated_at).toUTCString()}</span>
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default React.memo(Post);
