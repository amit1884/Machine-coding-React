export const updateComment = (comments, commentId, newComment) => {
  let commentsCopy = JSON.parse(JSON.stringify(comments));
  for (let comment of commentsCopy) {
    if (comment.id === commentId) {
      comment.subComment.push({
        id: new Date().getTime,
        comment: newComment,
        subComment: [],
      });
    }
    if (comment.subComment.length > 0) {
      comment.subComment = updateComment(comment.subComment, commentId, newComment);
    }
  }
  return commentsCopy;
};