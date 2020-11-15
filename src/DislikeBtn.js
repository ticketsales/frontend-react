import React from 'react';


export default ({disLike}) => {

  return <span className="badge badge-danger badge-pill mr-0" onClick={disLike}><i className="fas fa-thumbs-down"></i></span>;
};
