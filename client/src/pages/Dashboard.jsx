import React from "react";
import "../pages/Dashboard.css";

export const Dashboard = () => {
  return (
    <div className="home">
      <div className="main-slide1">
        <div>
          <h1>
            "COOK CREATE SHARE: Share Your Secret Recipes on FoodieConnect"
          </h1>
          <p>
            "Welcome to Foodie Connect, where culinary creativity meets
            community collaboration! Dive into a world where flavors fuse,
            recipes roam freely, and foodies unite to share their passion for
            cooking. Join us on a mouthwatering journey as we celebrate the art
            of gastronomy, one delectable dish at a time. Get ready to unlock a
            treasure trove of recipes, connect with fellow food enthusiasts, and
            embark on a culinary adventure unlike any other. Let's cook, create,
            and connect together on Foodie Connect!"
          </p>
          {/* <button className="visit-now">Visit Now</button> */}
        </div>
        <div>
          <img src="../Images/image1.png" />
        </div>
      </div>
      <div className="food-items">
        <div className="item">
          <div>
            <img src="../Images/Pavbhaji.png" alt="pabvbhaji-image" />
          </div>
          <h3>Pav Bhaji</h3>
          <p>
            Pav Bhaji is a popular street food dish from Maharashtra, India. It
            consists of a spicy vegetable mash (bhaji) cooked with a special
            blend of spices, typically including tomatoes, onions, potatoes,
            peas, and various other vegetables. The bhaji is served hot with
            buttered pav (soft bread rolls) and often garnished with chopped
            onions, coriander leaves, and a squeeze of lime. It's a flavorful
            and satisfying dish enjoyed by people of all ages.
          </p>
        </div>
        <div className="item">
          <div>
            <img src="../Images/shahi-paneer.png" alt="ShaiPaneer-image" />
          </div>
          <h3>Shai Paneer</h3>
          <p>
            Shahi Paneer is a rich and creamy North Indian curry made with
            paneer (Indian cottage cheese) cooked in a luxurious gravy. The
            gravy is typically made with a base of onions, tomatoes, cashew
            nuts, and a blend of aromatic spices such as cardamom, cinnamon, and
            cloves. Cream and sometimes yogurt are added to give the dish its
            signature richness and creaminess. Shahi Paneer is often served as a
            main course dish in restaurants and is enjoyed with naan, roti, or
            rice.
          </p>
        </div>
        <div className="item">
          <div>
            <img src="../Images/PannerTikka.png" alt="paneerTikka-image" />
          </div>
          <h3>Paneer Tikka</h3>
          <p>
            Paneer Tikka is a popular appetizer in Indian cuisine, especially in
            North India. It consists of bite-sized pieces of paneer marinated in
            a spiced yogurt mixture along with bell peppers, onions, and
            sometimes other vegetables. The marinated paneer and vegetables are
            then skewered and grilled or baked until they are cooked through and
            have a charred, smoky flavor. Paneer Tikka is typically served hot,
            often with a side of mint chutney or tamarind chutney, and is a
            favorite at parties, gatherings, and as a starter in Indian
            restaurants.
          </p>
        </div>
        <div className="item">
          <div>
            <img src="../Images/ButterChicken.png" alt="ButterChickn-image" />
          </div>
          <h3>Butter Chicken</h3>
          <p>
            Butter Chicken, also known as Murgh Makhani, is one of the most
            popular and beloved Indian dishes worldwide. It originated in Delhi,
            India, in the 1950s. Butter Chicken features tender pieces of
            chicken marinated in a spiced yogurt mixture, then cooked in a rich
            and creamy tomato-based gravy. The gravy is made with butter,
            tomatoes, cream, and a blend of spices, giving the dish its
            distinctive flavor and velvety texture. Butter Chicken is typically
            served with naan, rice, or roti and is enjoyed by people of all ages
            for its comforting and indulgent taste.
          </p>
        </div>
      </div>
      <div className="main-slide2">
        <div className="foodimg">
          <img src="../Images/Biryani.png" alt="Birayani-image" />
        </div>
        <div className="question">
          <div>
            <h2>Why People Choose you?</h2>
          </div>
          <div>
            <div className="q-ans">
              <div>
                <img src="../Images/dish1.png" />
              </div>
              <div>
                <h4>Community Engagement</h4>
                <p>
                  FoodieConnect provides a platform for food enthusiasts to
                  connect with a like-minded community of fellow cooks and food
                  lovers. Users can share their favorite recipes, discover new
                  dishes, and engage in discussions about cooking techniques,
                  ingredient substitutions, and culinary traditions. The sense
                  of belonging to a community with a shared passion for food can
                  be a motivating factor for individuals to choose FoodieConnect
                  as their recipe-sharing platform.
                </p>
              </div>
            </div>
            <div className="q-ans">
              <div>
                <img src="../Images/dish2.png" />
              </div>
              <div>
                <h4>User-Friendly Interface</h4>
                <p>
                  FoodieConnect offers an intuitive and user-friendly interface
                  that makes it easy for users to upload, browse, and search for
                  recipes. With features such as categorization by cuisine,
                  dietary preferences, and ingredient tags, users can quickly
                  find recipes that match their tastes and preferences.
                  Additionally, the platform may provide tools for users to
                  customize their profiles, create collections of favorite
                  recipes, and interact with other users through comments,
                  likes, and recipe ratings, enhancing the overall user
                  experience.
                </p>
              </div>
            </div>
            <div className="q-ans">
              <div>
                <img src="../Images/dish3.png" />
              </div>
              <div>
                <h4>Recipe Quality and Diversity</h4>
                <p>
                  FoodieConnect strives to maintain a high standard of recipe
                  quality by encouraging users to share well-tested and reliable
                  recipes. The platform may also attract a diverse range of
                  contributors, including home cooks, professional chefs, and
                  culinary bloggers, resulting in a wide variety of recipes
                  spanning different cuisines, cooking styles, and skill levels.
                  Whether users are looking for simple weeknight meals, gourmet
                  dinner party ideas, or international delicacies, FoodieConnect
                  aims to be a go-to destination for discovering delicious
                  recipes to suit every taste and occasion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
