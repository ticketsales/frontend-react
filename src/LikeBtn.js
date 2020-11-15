import React from 'react';


export default ({like}) => {

  return  <span className="badge badge-success badge-pill mr-0" onClick={like}><i className="fas fa-thumbs-up"></i></span>;

};
