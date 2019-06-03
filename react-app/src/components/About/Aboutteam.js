import React, { Component } from "react";
import logo from "../../icons/logo.png";

import "./Aboutteam.css";

class Aboutteam extends Component {
  render() {
    return (
      <div className="aboutteamBody">
        <div className="container">
          <div className="text-center ">
            <img
              className="d-block mx-auto mb-4"
              src={logo}
              alt=""
              width="100"
              height="100"
            />
            <h1>"mindSpark"</h1>
            <p className="lead">
              MindSpark is a web application that let’s users share quotes that
              inspirit one another
              {/* “mindSpark” is an app that encourages people through quotes and
              messages. It helps people who are having tough time with emotional
              problem. It also lets you share your own quotes to help community
              build curated ideas. */}
            </p>
            <h3 className="text-uppercase">Inspirit yourself</h3>
            <p>
              Classified quotes will help you to be motivated based on your
              mind-state and mood
            </p>
            <h3 className="text-uppercase">Inspirit others</h3>
            <p>
              Join us and be author! You don’t only receive quotes but you can
              write your own quote, share and help other mindSpark member
            </p>
            <h3 className="text-uppercase">unique experience</h3>
            <p>
              People will read, rate and suggest quotes You are not only
              listener here, you can be the speaker
            </p>
            <h1>What kind of service do we offer</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Aboutteam;
