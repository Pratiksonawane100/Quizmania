import React from "react";
import "./css/Background.css"; // Import your CSS file for the background

const Background = () => {
  const shapes = [];
  for (let i = 0; i < 60; i++) {
    shapes.push(<div key={i} className={`shape shape-${i % 3}`}></div>);
  }

  return <div className="background">{shapes}</div>;
};

export default Background;
