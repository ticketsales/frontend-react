import React, { Component } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default class PostList extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  fetchPosts = function() {
    axios.get('http://localhost:4000/posts')
    .then(res => {
      console.log(res.data)
      this.setState({posts: res.data})
    } )
    .catch(error => {console.log(error)})   
  };
  
  start = setInterval(() => {
    this.fetchPosts();
  }, 1000);
  
  renderedPosts = Object.values(this.state.posts).map(post => {
    return (
      <div
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList postId={post.id} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });
  
  render() {
    return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {this.fetchPosts}
      {this.start}
      {this.renderedPosts}
    </div>
    );
  }
}
