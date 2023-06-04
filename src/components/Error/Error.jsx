import React from 'react';
import './Error.scss';

const Error = ({error}) => {
  return (
    <div className="error-container">
      <h3 className="title">Oops, Something went wrong...</h3>
      <p>{error}</p>
    </div>
  );
};

export default Error;
