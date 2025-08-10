import React, { useState } from "react";
import styles from "../commentStyle.module.css";
import CommentContainer from "./CommentContainer";
function CommentsItem({ comment, addReply }) {
  const [showReply, setShowReply] = useState(false);
  const [showAddReply, setShowAddReply] = useState(false);
  const [reply, setReply] = useState("");
  const handlerBlur = (e) => {
    const newComment = e.target.value;
    if (e.target.value !== "") {
      addReply(comment.id, newComment);
      setShowReply(true);
      setShowAddReply(false);
    }
  };
  return (
    <div className={styles.commentItem}>
      <div className={styles.commentDetails}>
        <div>{comment.comment}</div>
        <div className={styles.actionBtn}>
          {comment.subComment?.length > 0 && (
            <button onClick={() => setShowReply(!showReply)}>
                {showReply?'Hide Replies':'View Replies'}
            </button>
          )}
          <button onClick={() => setShowAddReply(!showAddReply)}>
            Add Reply
          </button>
        </div>
      </div>
      {showAddReply && (
        <div className={styles.addReplyContainer}>
          <input
            type="text"
            className={styles.addReplyInput}
            placeholder="enter comment"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onBlur={handlerBlur}
            autoFocus
          />
        </div>
      )}
      {showReply && (
        <div>
          <CommentContainer comments={comment.subComment} addReply={addReply} />
        </div>
      )}
    </div>
  );
}

export default CommentsItem;