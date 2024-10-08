import "./Footer.css";
import React from "react";
import Linkedin from "../images/LinkedinIcon.svg";
import Facebook from "../images/Facebook.svg";
import Twitter from "../images/Twitter.svg";
import Youtube from "../images/Youtube.svg";
import Insta from "../images/Insta.svg";

export default function Footer() {
  const handleRedirect = () => {
      window.open('https://www.instagram.com/vastrika_threadsoftradition?utm_source=qr&igsh=MzNlNGNkZWQ4Mg%3D%3D'); // Replace with your Instagram ID
    };
  const handleRedirectFacebook = () => {
      window.open('https://www.facebook.com/people/Vastrika/61566606672339/?viewas&show_switched_toast=false&show_switched_tooltip=false&is_tour_dismissed=false&is_tour_completed=false&show_podcast_settings=false&show_community_review_changes=false&should_open_composer=false&badge_type=NEW_MEMBER&show_community_rollback_toast=false&show_community_rollback=false&show_follower_visibility_disclosure=false&bypass_exit_warning=true'); // Replace with your Instagram ID
    };
return (
  <div className="Container">
      <div className="block">
    <table className="left">
      <tr className="head">
        <th>ABOUT</th>
        <th>HELP</th>
        <th>CONSUMER POLICY</th>
      </tr>
      <tr>
        <td>Contact Us</td>
        <td>Payments</td>
        <td>Cancellation & Returns</td>
      </tr>
      <tr>
        <td>About Us</td>
        <td>Shipping</td>
        <td>Terms Of Use</td>
      </tr>
      <tr>
        <td>Careers</td>
        <td>Cancellation & Returns</td>
        <td>Security</td>
      </tr>
      <tr>
        <td>Vastrika Stories</td>
        <td>FAQ</td>
        <td>Privacy</td>
      </tr>
      <tr>
        <td>Corporate Information</td>
        <td>Report Infringement</td>
        <td>Sitemap</td>
      </tr>
    </table>
    <div
      style={{
        borderLeft: "2px solid white", // The vertical line
        height: "auto", // The height of the line
        margin: "15px 0", // Optional margin for spacing
      }}
    ></div>
      <div className="right">
        <h3>Social : </h3>
        <div className="social">
          <img src={Linkedin} alt="" />
          <img src={Facebook} alt="" onclick={handleRedirectFacebook}/>
          <img src={Insta} alt="" onClick={handleRedirect}/>
          <img src={Twitter} alt="" />
          <img src={Youtube} alt="" />
        </div>
      </div>
      </div>
      <hr style={{
        height: "1px", // The height of the line
        width : "100vw",
        color : "white",
        margin : "10px 0px", // Optional margin for spacing
      }}/>
      <p>&copy;2024 Vastrika.com, All rights reserved</p>
  </div>
);
}
