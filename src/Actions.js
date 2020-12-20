import React, { useState } from "react";
// read: https://fontawesome.com/how-to-use/on-the-web/using-with/react
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import data from "./data.json";

const Actions = (props) => {
  const { setRestaurants } = props;

  const [showSortSelector, setSortSelector] = useState(false);
  const [showDietarySelector, setDietarySelector] = useState(false);
  const [showPriceRangeSelector, setPriceRangeSelector] = useState(false);
  const [dietTypeArr, setDietTypeArr] = useState("");

  const handeGeneralSorting = (restaurants, sortBy) => {
    let sortedRestaurants = [];
    if (sortBy === "maxDeliveryTime") {
      sortedRestaurants = restaurants
        .slice()
        .sort((a, b) => a[sortBy] - b[sortBy]);
    } else {
      sortedRestaurants = restaurants
        .slice()
        .sort((a, b) => b[sortBy] - a[sortBy]);
    }
    document.getElementById("printMsg").innerHTML =
      "Restaurants sorted in the order of " + sortBy;
    setRestaurants(sortedRestaurants);
  };

  let priceRangeSelect = (restaurants, minPrice, maxPrice = 1000) => {
    let priceRangeRestaurants = [];
    restaurants.forEach((restaurantElement) => {
      restaurantElement.menu.forEach((menuElement) => {
        menuElement.items.forEach((itemsElement) => {
          if (
            itemsElement.price >= minPrice &&
            itemsElement.price <= maxPrice
          ) {
            priceRangeRestaurants.push(restaurantElement);
          }
        });
      });
    });
    priceRangeRestaurants = [...new Set(priceRangeRestaurants)]; // removing the duplicate entries of restaurants
    priceRangeRestaurants.length !== 0
      ? (document.getElementById("printMsg").innerHTML =
          "You have selected price range between $" +
          minPrice +
          " and $" +
          maxPrice)
      : (document.getElementById("printMsg").innerHTML =
          "You have selected price range between $" +
          minPrice +
          " and $" +
          maxPrice +
          ". But sorry no restaurants available.");
    setRestaurants(priceRangeRestaurants);
  };

  // This function gets all the diet types chosen by user into an array
  let getDietTypes = (dietTypeArr, diet, isDietChecked) => {
    let dietTypeArrCopy = [...dietTypeArr];
    isDietChecked
      ? dietTypeArrCopy.push(diet)
      : dietTypeArrCopy.splice(dietTypeArrCopy.indexOf(diet), 1);
    setDietTypeArr(dietTypeArrCopy);
  };

  let dietarySelect = (restaurants, dietTypeArr) => {
    let dietSelected = [];
    //Add all the selected dietary to an array(dietTypeArr)
    restaurants.forEach((element) => {
      element.menu.forEach((itemsElement) => {
        itemsElement.items.forEach((data) => {
          dietTypeArr.forEach((diet) => {
            if (data.typeOfMeal === diet) {
              dietSelected.push(element);
            }
          });
        });
      });
    });
    dietSelected = [...new Set(dietSelected)]; // removing the duplicate entries of restaurants
    dietSelected.length !== 0
      ? (document.getElementById("printMsg").innerHTML = " ")
      : (document.getElementById("printMsg").innerHTML =
          "Sorry, no restaurants found");
    setRestaurants(dietSelected);
  };

  return (
    <div className="actions">
      <span className="button-group">
        <button
          onClick={() => {
            setPriceRangeSelector(false);
            setDietarySelector(false);
            setSortSelector(!showSortSelector);
          }}
        >
          <span>Sort</span> <FontAwesomeIcon icon={"chevron-down"} />
        </button>
        {showSortSelector && (
          <div>
            <label>
              Most popular{" "}
              <input
                value="popularity"
                type="radio"
                name="generalSort"
                onChange={(event) =>
                  handeGeneralSorting(
                    data.restarants,
                    event.currentTarget.value
                  )
                }
              />
            </label>
            <label>
              Rating{" "}
              <input
                value="rating"
                type="radio"
                name="generalSort"
                onChange={(event) =>
                  handeGeneralSorting(
                    data.restarants,
                    event.currentTarget.value
                  )
                }
              />
            </label>
            <label>
              Delivery time{" "}
              <input
                value="maxDeliveryTime"
                type="radio"
                name="generalSort"
                onChange={(event) =>
                  handeGeneralSorting(
                    data.restarants,
                    event.currentTarget.value
                  )
                }
              />
            </label>
          </div>
        )}
      </span>
      {/* TODO */}
      {/* <!-- Implement as assignment for Thursday --> */}
      <span className="button-group">
        <button
          onClick={() => {
            setDietarySelector(false);
            setSortSelector(false);
            setPriceRangeSelector(!showPriceRangeSelector);
          }}
        >
          <span>Price Range</span> <FontAwesomeIcon icon={"chevron-down"} />
        </button>
        {showPriceRangeSelector && (
          <div>
            <button
              onClick={(event) => priceRangeSelect(data.restarants, 50, 100)}
            >
              <span>$</span>
            </button>
            <button
              onClick={(event) => priceRangeSelect(data.restarants, 101, 200)}
            >
              <span>$$</span>
            </button>
            <button
              onClick={(event) => priceRangeSelect(data.restarants, 201, 300)}
            >
              <span>$$$</span>
            </button>
            <button onClick={(event) => priceRangeSelect(data.restarants, 301)}>
              <span>$$$$</span>
            </button>
          </div>
        )}
      </span>
      <span className="button-group">
        <button
          onClick={() => {
            setSortSelector(false);
            setPriceRangeSelector(false);
            setDietarySelector(!showDietarySelector);
          }}
        >
          <span>Dietary choice</span> <FontAwesomeIcon icon={"chevron-down"} />
        </button>
        {showDietarySelector && (
          <div>
            <label>
              Vegetarian{" "}
              <input
                value="vegetarian"
                type="checkbox"
                id="cb1"
                name="dietaryFilter"
                onChange={(event) =>
                  getDietTypes(
                    dietTypeArr,
                    event.currentTarget.value,
                    event.currentTarget.checked
                  )
                }
              />
            </label>
            <label>
              Vegan{" "}
              <input
                value="vegan"
                type="checkbox"
                id="cb1"
                name="dietaryFilter"
                onChange={(event) =>
                  getDietTypes(
                    dietTypeArr,
                    event.currentTarget.value,
                    event.currentTarget.checked
                  )
                }
              />
            </label>
            <label>
              Non-vegan{" "}
              <input
                value="non vegan"
                type="checkbox"
                id="cb1"
                name="dietaryFilter"
                onChange={(event) =>
                  getDietTypes(
                    dietTypeArr,
                    event.currentTarget.value,
                    event.currentTarget.checked
                  )
                }
              />
            </label>
            <button onClick={() => dietarySelect(data.restarants, dietTypeArr)}>
              Show restaurants
            </button>
          </div>
        )}
      </span>
    </div>
  );
};
export default Actions;
