import React, { useState, useContext, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import GenreChip from "./GenreChip";

import Switch from "@material-ui/core/Switch";
// import genreData from "../dummyData/dummyGenreData";
import Loading from "./Loading";
import classNames from "classnames";
import axios from "axios";

//Styling
import "../styles/profileView.scss";
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

export default function ProfileView(props) {
  //Material UI styling hook
  const classes = useStyles();

  //Slider helpers
  function valuetext(value) {
    return `${value}`;
  }

  //set individual states
  const [age, setAge] = useState([20, 40]);
  const [pageCount, setPageCount] = useState([256, 512]);
  const [price, setPrice] = useState([10, 30]);
  const [maxDistance, setMaxDistance] = useState(80);
  const [maturity, setMaturity] = useState(false);

  //set user state--ultimately get starting state from hook

  //should it be an object, not an array, from DB?
  // const [userState, setUserState] = useState({
  //   id: 1,
  //   name: "Sandra Gardiner",
  //   age: [20, 40],
  //   pageCount: [256, 512],
  //   price: [10, 30],
  //   maxDistance: 80,
  //   maturity: false,
  //   genres: [],
  // });

  const [userState, setUserState] = useState({
    id: null,
    name: "",
    age: [],
    pageCount: [],
    postalCode: null,
    price: [],
    maxDistance: null,
    maturity: null,
    genres: [],
  });
  //set them all to blank
  useEffect(() => {
    axios
      //update route if doing multiple users
      .get("/api/users/1")
      .then((result) => {
        setUserState(result.data[0]);
        console.log(
          "i am in axios get for user, result.data[0] is:",
          result.data[0]
        );
        setChips(result.data[0].genres);
      })
      .catch((err) => console.log("Error message:", err.message));
  }, []);

  //send to db
  const sendToDB = function(userObject) {
    console.log("send to DB is firing with userObject:", userObject);
    //need to send userObject, not userState, because it's not updated yet
    console.log("userobject.id is", userObject.id);
    console.log("userstate.id is", userState.id);
    setUserState(userObject);

    axios
      .put(`/api/users/${userState.id}`, userObject)
      .then((result) => {
        console.log("all is well");
      })
      .catch((err) => console.log("Error message:", err.message));
  };

  const handleChange = (event, newValue, id) => {
    console.log("handleChange is firing");
    const newUserObject = { ...userState, [id]: newValue };
    console.log("newuserobject is:", newUserObject);
    sendToDB(newUserObject);
  };

  //age variables
  const thisYear = new Date().getFullYear();
  const maxAgeMark = thisYear - 1970;
  const ageMarks = [
    {
      value: 0,
      // label: "0",
    },
    {
      value: maxAgeMark,
      // label: `${maxAgeMark}`,
    },
  ];

  //page count variables
  const maxPageCountMark = 1000;
  const pageCountMarks = [
    {
      value: 0,
      // label: "One-night stand",
    },
    {
      value: maxPageCountMark,
      // label: `Long-term relationship`,
    },
  ];

  //price variables
  const maxPriceMark = 200;
  const priceMarks = [
    {
      value: 0,
      // label: "Cheap",
    },
    {
      value: maxPriceMark,
      // label: `Expensive`,
    },
  ];

  //location variables
  const maxDistanceMark = 200;
  const distanceMarks = [
    {
      value: 0,
      // label: "0km",
    },

    {
      value: maxDistanceMark,
      // label: `${maxDistanceMark}km`,
    },
  ];

  //genre

  //Chip functions

  //onClick FIX FIX use incoming state
  // const [chips, setChips] = useState({
  //   mystery: false,
  //   romance: false,
  //   adventure: false,
  //   literary: false,
  //   "non-fiction": false,
  //   "biography/memoir": false,
  //   humour: false,
  //   art: false,
  //   history: false,
  //   cooking: false,
  //   "children's": false,
  //   poetry: false,
  //   science: false,
  //   "sci-fi/fantasy": false,
  //   "self-help": false,
  // });

  const [chips, setChips] = useState([]);

  // const selectedChips = function(chips) {
  //   const result = [];
  //   for (const key in chips) {
  //     if (chips[key]) {
  //       result.push(key);
  //     }
  //   }
  //   return result;
  // };

  // const chipsHandler = (chipName) => {
  //   setChips((prev) => ({
  //     ...prev,
  //     [chipName.target.innerHTML]: !chips[chipName.target.innerHTML],
  //   }));
  //   console.log("in chips handler, chips is", chips);
  //   // console.log("selectedChips(chips)", selectedChips(chips));
  //   const newUserObject = { ...userState, genres: chips };
  //   sendToDB(newUserObject);
  // };

  //checkbox checked array.includes value
  //taraget.value of genre .includes(genre)

  const handleClick = function(genre) {
    console.log("i am handling click and chips is", chips);
    console.log("chips.includes(genre) is", chips.includes(genre));
    if (chips.includes(genre)) {
      //pop is wrong, need to grab specific one
      setChips((prev) => {
        // [...prev].pop(genre);
        console.log("i should remove the genre");
      });
    } else {
      setChips((prev) => {
        [...prev].push(genre);
      });
      const newUserObject = { ...userState, genres: chips };
      sendToDB(newUserObject);
    }
  };

  //create the chips

  //genreData could be the array of genres

  const genreData = [
    "Mystery",
    "Romance",
    "Young Adult",
    "Fiction",
    "Science Fiction",
    "Biography",
  ];
  const genreChips = genreData.map((genre) => {
    // if (!chips) {
    //   return <Loading />;
    // }
    return (
      <GenreChip
        id={genre}
        onClick={() => {
          handleClick(genre);
        }}
        selected={chips.includes(genre) ? true : false}
        // onDelete={handleDelete}
      />
    );
  });
  if (!userState.id) {
    return <Loading />;
  }
  return (
    <main>
      <div className="profile-avatar">
        <Avatar className={classes.large} />
      </div>
      <div className="user">{userState.name}</div>
      <div>{userState.postalCode}</div>
      <div className="profile-preference">
        <span className="profile-label">Age range (publication date)</span>

        <Slider
          id={"age"}
          value={[userState.age[0], userState.age[1]]}
          marks={ageMarks}
          max={thisYear - 1970}
          onChange={(event, newValue) => {
            setAge(newValue);
            handleChange(event, newValue, "age");
          }}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
        <div className={"labels"}>
          <span>0</span>
          <span>{maxAgeMark}</span>
        </div>
      </div>
      <div className="profile-preference">
        <span class="profile-label">Commitment level (page count)</span>
        <Slider
          value={[userState.pageCount[0], userState.pageCount[1]]}
          marks={pageCountMarks}
          max={maxPageCountMark}
          onChange={(event, newValue) => {
            setPageCount(newValue);
            handleChange(event, newValue, "pageCount");
          }}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
        <div className={"labels"}>
          <span>One-night stand</span>
          <span>Long-term relationship</span>
        </div>
      </div>
      <div className="profile-preference">
        <span class="profile-label">Date cost (price range)</span>
        <Slider
          value={[userState.price[0], userState.price[1]]}
          marks={priceMarks}
          max={maxPriceMark}
          onChange={(event, newValue) => {
            setPrice(newValue);
            handleChange(event, newValue, "price");
          }}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
        <div className={"labels"}>
          <span>Cheap</span>
          <span>Expensive</span>
        </div>
      </div>
      <div className="profile-preference">
        <span class="profile-label">Maximum distance (to a bookstore)</span>
        <Slider
          value={userState.maxDistance}
          // defaultValue={maxDistance}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-always"
          step={10}
          onChange={(event, newValue) => {
            setMaxDistance(newValue);
            handleChange(event, newValue, "maxDistance");
          }}
          marks={distanceMarks}
          max={maxDistanceMark}
          valueLabelDisplay="auto"
        />
        <div className={"labels"}>
          <span>0km</span>
          <span>{maxDistance}km</span>
        </div>
      </div>
      <div className="profile-preference">
        <div className="maturity">
          <span class="profile-label">
            Adventurous? (include mature content)
          </span>
          <Switch
            checked={userState.maturity}
            onChange={(event, newValue) => {
              setMaturity(newValue);
              handleChange(event, newValue, "maturity");
            }}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
      </div>
      <div className="profile-preference">
        <span class="profile-label">Genres</span>
        <div class="genre-box">{genreChips}</div>
      </div>
    </main>
  );
}
