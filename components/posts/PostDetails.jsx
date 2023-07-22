import React from 'react';
import { useRouter } from 'next/router'
import Comment from 'components/posts/Comment';

const PostDetails = (post={}, comments=[]) => {
const { title, author, content} = post;

const router = useRouter()
  return (
    <div>
      <button onClick={() => router.back()}>Close Post</button>
      <h2>{title}</h2>
      <p>Author: {author}</p>
      <p>{content}</p>
      <h3>Comments:</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}><Comment author={comment.author} text={comment.text}/></li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetails;
