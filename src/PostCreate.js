import React, { Component } from 'react';
import axios from 'axios';

export default class PostCreate extends Component {
  constructor(props) {
    super(props);
    this.postInput = React.createRef();

    this.onSubmit = async event => {
      event.preventDefault();

      await axios.post('http://localhost:4000/posts', {
        title : this.postInput.value
      });
  
      this.postInput.value = "";
    };
  
  }
  
  render() {
    return (
    <div>
      <form>
        <div className="form-group">
          <label>Title</label>
          <input 
            ref={el=> this.postInput = el}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary" onClick={this.onSubmit}>Submit</button> 
      </form>
    </div>
    );
  }
}

