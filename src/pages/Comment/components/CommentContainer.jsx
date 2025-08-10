import React from "react";
import styles from "../commentStyle.module.css";
import CommentsItem from "./CommentsItem";
function CommentContainer({ comments,addReply }) {
  return (
    <div className={styles.commentContainer}>
      {comments?.map((comment) => {
        return <CommentsItem comment={comment} addReply={addReply} key={comment.id}/>;
      })}
    </div>
  );
}

export default CommentContainer;