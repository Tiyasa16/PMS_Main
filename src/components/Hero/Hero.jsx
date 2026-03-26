import React from "react";
import "./Hero.css";
import { IMAGES } from "../../utils/constants";

import Sidebar from "../SideNavBar/Sidebar";

const Hero = () => {

  
  
  return (
    <div className="hero">
      <div className="hero-text">
        <div className="head">
          <div className="subhead">
            <span>
              A New Way of
              <img
                src={IMAGES.acc1}
                alt=""
                className="acc1"
              />
            </span>
          </div>

          <span>
            Project Management
            <img
              src={IMAGES.acc2}
              alt=""
              className="acc2"
            />
          </span>
        </div>

        <p>
          Manage projects smarter, collaborate better, and achieve goals faster with our powerful project management system.
        </p>

        {/* <div className="buttons">
          <button className="primary-btn" onClick={<Sidebar/>}>Log In ➤</button>
        </div> */}

        <div className="bullets">
          <div className="b">
            <span>➤</span>
            <span>Advanced Task Planning</span>
          </div>
          <div className="b">
            <span>➤</span>
            <span>Seamless Team Coordination</span>
          </div>
          <div className="b">
            <span>➤</span>
            <span>Powerful Progress Tracking</span>
          </div>
        </div>
      </div>

      <div className="hero-img">
        <img
          src={IMAGES.heroBg}
          alt="hero"
        />
      </div>
    </div>
  );
};

export default Hero;
