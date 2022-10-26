import React from "react";

function LoadingSpinner() {
  return (
    <div className="d-flex align-items-center loading-spinner text-center">
      <span>Loading...</span>
      <div className="half-spinner"></div>
    </div>
  );
}

export default LoadingSpinner;
