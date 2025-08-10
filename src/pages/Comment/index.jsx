import React, { useState } from "react";
import CommentContainer from "./components/CommentContainer";
import { updateComment } from "./utils/helper";
import { commentData } from "./constans";

export default function Comments() {
    const [comments,setComments]=useState(commentData)
    const addReply=(commentId,newComment)=>{
        let updatedComment=updateComment(comments,commentId,newComment)
        setComments(updatedComment)
    }
  return <CommentContainer comments={comments} addReply={addReply}/>;
}