import React from "react";
import spinner from "../assests/spinner.png";

export default function Spinner() {
  return (
    <div className="loading-spinner">
      <img src={spinner} alt="loading spinner" />
    </div>
  );
}
