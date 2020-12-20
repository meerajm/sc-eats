import "./App.css";
import React, { useState, useCallback } from "react";
import Actions from "./Actions";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import data from "./data.json";
import { Router, Link } from "@reach/router";

library.add(faChevronDown);

const getTag = (restaurant) => {
  const { menu } = restaurant;
  let vegan = 0;
  let nonVegan = 0;
  menu.forEach((menuItem) => {
    vegan += menuItem.items.filter((item) => item.typeOfMeal === "vegan")
      .length;
    nonVegan += menuItem.items.filter((item) => item.typeOfMeal === "non vegan")
      .length;
  });
  let displayString = "";
  if (vegan > 0 && nonVegan === 0) {
    displayString = "vegan";
  } else if (vegan === 0 && nonVegan > 0) {
    displayString = "non-vegan";
  } else {
    displayString = "vegan och non vegan";
  }
  return (
    <span>
      {displayString}
      <br />
      Rating: {restaurant.rating}
      <br />
      <strong>{restaurant.popularity}</strong>
      <br />
      <em>Time: {restaurant.maxDeliveryTime} mins</em>
    </span>
  );
};

const Index = (props) => {
  const { restaurants } = props;
  return (
    <div className="restaurants">
      {restaurants.map((restaurant) => {
        return (
          <section key={restaurant.id}>
            <div className="overlay">
              <span className="tag">{getTag(restaurant)}</span>
              <img src={restaurant.img} alt="" />
            </div>
            <h2>{restaurant.name}</h2>
            <p className="description">{restaurant.description}</p>
          </section>
        );
      })}
    </div>
  );
};

function App() {
  const [restaurants, setRestaurants] = useState([]);

  // Explore effect! (for classfull, this was related to componentWillMount, componentDidMount side effects) )
  React.useEffect(() => {
    setRestaurants(data.restarants);
    localStorage.setItem("restaurants", JSON.stringify(data.restaurants));
  }, []);

  const [restuarantName, setName] = useState("");

  return (
    <div className="App">
      <header>
        <nav>
          <Link to="/">
            SC<span style={{ color: "#06c167" }}>eats</span>
          </Link>
        </nav>
        {<Actions setRestaurants={setRestaurants} restaurants={restaurants} />}
        <form className="searchFood" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search restaurant"
            value={restuarantName}
            onBlur={(e) => setName(e.target.value)}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={() => {
              console.log(restaurants);
              let searchRestaurant = [];
              searchRestaurant = restaurants.find(
                (restaurant) => restaurant.name === restuarantName
              );
              if (!searchRestaurant) {
                document.getElementById("printMsg").innerHTML =
                  "Sorry no restaurant found";
              } else {
                setRestaurants([searchRestaurant]);
              }
            }}
          >
            Search
          </button>
        </form>
      </header>
      <Router>
        <Index restaurants={restaurants} path="/" />
      </Router>
      <div>
        <label id="printMsg" className="label-app"></label>
      </div>
    </div>
  );
}

export default App;
