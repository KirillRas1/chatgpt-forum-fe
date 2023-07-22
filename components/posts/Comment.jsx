import React from 'react';

const Comment = ({ author, text }) => {
  return (
    <div className="comment">
      <div className="content">
        <span className="author">{author}</span>
        <p className="text">{text}</p>
      </div>
    </div>
  );
};

export default Comment;
