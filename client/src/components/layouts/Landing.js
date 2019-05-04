import React from "react";
export default function Landing() {
  return (
    <div className="app-landing">
      <img
        className="landing-img"
        src={process.env.PUBLIC_URL + "/img/landing.jpg"}
        alt="landing"
      />
      <div className="landing-content">
        <div className="landing-content-left">
          <h1 className="title">Welcome to Dev Book.</h1>
          <p>
            Here developers connect together and create projects and share to
            world. Place developer and designer.
          </p>
          <div className="landing-btns">
            <button className="btn btn-primary btn-md">Explore</button>
          </div>
        </div>
        <div className="landing-content-right">
          <img
            src={process.env.PUBLIC_URL + "/img/illustration2.svg"}
            alt="illustration"
          />
        </div>
      </div>
    </div>
  );
}
