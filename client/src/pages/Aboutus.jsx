import React from "react";
import { Navbar } from "../components/Navbar";
import "./Aboutus.css";

export const Aboutus = () => {
  return (
    <div className="container1">
      <Navbar />
      <div className="about-container">
        <div className="logo-container">
          <img src="./Images/title.png" alt="Recipe Logo" />
          <h1>Foodie Connect</h1>
        </div>

        <div className="info-part">
          <div className="who-are-we-container">
            <h2>Who Are We?</h2>
            <p>
              Simply Recipes is here to help you cook delicious meals with less
              stress and more joy. We offer recipes and cooking advice for home
              cooks, by home cooks. Helping create “kitchen wins” is what we’re
              all about. Simply Recipes was founded in 2003 by Elise Bauer as a
              home cooking blog to record her favorite family recipes. Today,
              Simply Recipes has grown into a trusted resource for home cooks
              with more than 3,000 tested recipes, guides, and meal plans,
              drawing over 15 million readers each month from around the world.
              We’re supported by a diverse group of recipe developers, food
              writers, recipe and product testers, photographers, and other
              creative professionals
            </p>
          </div>

          <div className="recipe-development-container">
            <h2>Recipe Development and Testing</h2>
            <p>
              Our recipes primarily use fresh, unprocessed ingredients but we
              also believe there is a time and a place for canned, frozen, and
              other prepared ingredients. We believe in a diet that includes a
              wide variety of foods: real butter and cream, extra virgin olive
              oil, eggs, lots of fruits and vegetables, and protein from meat,
              fish, beans, and cheese. Plus cake for dessert.
            </p>
          </div>
        </div>

        {/* <div className="meet-the-team-container">
          <h2>Meet the Team</h2>
          <div className="team-member">
            <div className="member-pranav">
              <img src="./Images/Pranav.jpg" alt="Team Member 1" />
              <h3>Pranav Malap</h3>
              <p>
                Pranav Malap's academic journey, highlighted by a Bachelor's in
                Information Technology from Adarsh Education Society and K. P.
                B. Hinduja College, reflects a dedication to excellence.
              </p>
            </div>
            <div className="member-jeevan">
              <img src="./Images/jeevan.jpg" alt="Team Member 2" />
              <h3>Jeevan Auji</h3>
              <p>
                Jeevan Auji design for Simply Recipes and the Khal.com Food +
                Drink group. He joined progen in 2023 and has held several roles
                around the company since then.
              </p>
            </div>
          </div>
        </div> */}
        

        <div className="contact-us-container">
          <h2 align="center">Contact Us</h2>
          <p>
            Have something you’d like to let us know? Whether you have a comment
            on a recipe or an idea to share, we would love to hear from you:
            <a href="mailto:foodieconnect07@gmail.com">
              foodieconnect07@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
