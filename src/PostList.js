import React, { Component } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: {}
    };
  }
  
  componentDidMount(){
    axios.get('http://localhost:4000/posts')
    .then(res => {
      this.setState({posts: res.data})
    } )
    .catch(error => {console.log(error)})   
  }
  
  renderedPosts = () => { 
    return Object.values(this.state.posts).map(post => {
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
    
  }
  render() {
    return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {this.state.posts ? this.renderedPosts() : null }
    </div>
    );
  }
}
