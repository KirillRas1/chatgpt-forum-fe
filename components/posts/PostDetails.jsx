import React from 'react';
const PostDetails = ({ post = {}, onClosePost }) => {
const { title, author, content, comments = []} = post;
  return (
    <div>
      <button onClick={onClosePost}>Close Post</button>
      <h2>{title}</h2>
      <p>Author: {author}</p>
      <p>{content}</p>
      <h3>Comments:</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetails;
