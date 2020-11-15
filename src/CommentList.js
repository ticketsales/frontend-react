import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LikeBtn from './LikeBtn';
import DislikeBtn from './DislikeBtn';

export default ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );

    setComments(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const likeBtn = (commentId) => {
    let newComment = comments;
    let updateComment= newComment.filter(comment => comment.id === commentId)
    updateComment[0].like++;
    let newCommentEnd = newComment.map(obj => {
      if (obj === commentId){
        return obj = updateComment;
      }else{
        return obj;
      }
    });
    setComments(newCommentEnd);
  }

  const disLikeBtn = (commentId) => {
    let newComment = comments;
    let updateComment= newComment.filter(comment => comment.id === commentId)
    updateComment[0].dislike++;
    let newCommentEnd = newComment.map(obj => {
      if (obj === commentId){
        return obj = updateComment;
      }else{
        return obj;
      }
    });
    setComments(newCommentEnd);
  }

  const onUpadteComments = async () => {

    await axios.put(`http://localhost:4001/posts/${postId}/comments`, {
      comments
    });

  };
  
  useEffect(() => {
    onUpadteComments();
  }, [comments]);// eslint-disable-line react-hooks/exhaustive-deps

  const renderedComments = comments.map(comment => {
    return (
    <li className="list-group-item d-flex align-items-center" key={comment.id}>
      <span className="mr-auto">{comment.content}</span>
      <DislikeBtn disLike={disLikeBtn.bind(this,comment.id)} />
      <span className="badge mr-3">{comment.dislike}</span>
      <LikeBtn like={likeBtn.bind(this,comment.id)} />
      <span className="badge ">{comment.like}</span>
    </li>)
  });

  return <ul className="list-group">{renderedComments}</ul>;
};
