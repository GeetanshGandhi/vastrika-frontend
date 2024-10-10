import React from 'react'
import './Footer.css'
export default function Footer() {

    const handleRedirectInsta = () => {
        window.open('https://www.instagram.com/vastrika_threadsoftradition?utm_source=qr&igsh=MzNlNGNkZWQ4Mg%3D%3D'); // Replace with your Instagram ID
      };
      const handleRedirectFacebook = () => {
        window.open('https://www.facebook.com/people/Vastrika/61566606672339/?viewas&show_switched_toast=false&show_switched_tooltip=false&is_tour_dismissed=false&is_tour_completed=false&show_podcast_settings=false&show_community_review_changes=false&should_open_composer=false&badge_type=NEW_MEMBER&show_community_rollback_toast=false&show_community_rollback=false&show_follower_visibility_disclosure=false&bypass_exit_warning=true'); // Replace with your Instagram ID
      };
  return (
    <div className="container-footer">
      <div className="top-footer">
      <div className="list">
        <div className="col-1">
          <ul>
            <li className="head">ABOUT</li>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Vastrika Stories</li>
            <li>Corporate Information</li>
          </ul>
        </div>
        <div className="col-2">
          <ul>
            <li className="head">HELP</li>
            <li>Payments</li>
            <li>Shipping</li>
            <li>Cancellation & Returns</li>
            <li>FAQ</li>
            <li>Report Infringement</li>
          </ul>
        </div>
        <div className="col-3">
          <ul>
            <li className="head">CONSUMER POLICY</li>
            <li>Cancellation & Returns</li>
            <li>Terms Of Use</li>
            <li>Security</li>
            <li>Privacy</li>
            <li>Sitemap</li>
          </ul>
        </div>
        <div
          style={{
            borderLeft: "2px solid white", // The vertical line
            height: "auto", // The height of the line
            margin: "15px 0px", // Optional margin for spacing
            marginLeft: "100px",
          }}
        ></div>
      </div>
  
      <div className="right">
       <h3>Social : </h3>
        <div className="social">
          <img src={require("../images/LinkedinIcon.svg")} alt="li" />
          <img src={require("../images/Facebook.svg")} alt="fb" onClick={handleRedirectFacebook}/>
          <img src={require("../images/Insta.svg")} alt="ig" onClick={handleRedirectInsta}/>
          <img src={require("../images/Twitter.svg")} alt="tw" />
          <img src={require("../images/Youtube.svg")} alt="yt" />
        </div>
      </div>
      </div>
      <hr style={{
        height: "1px", // The height of the line
        width : "100vw",
        color : "white",
        margin : "10px 0px", // Optional margin for spacing
      }}/>
             <p style={{
          marginLeft:"40vw",
       }}>&copy;2024 Vastrika.com, All rights reserved</p>
    </div>
);
}
