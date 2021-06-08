import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

import Switch from "@material-ui/core/Switch";
import genreData from "../dummyData/dummyGenreData";
import classNames from "classnames";

//Styling
import "../styles/profile.scss";
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

export default function ProfileView() {
  //Material UI styling hook
  const classes = useStyles();

  //Slider helpers
  function valuetext(value) {
    return `${value}`;
  }

  //do one of these for each slider, mentor and talk to DB
  const [age, setAge] = useState([20, 40]);
  const [pageCount, setPageCount] = useState([256, 512]);
  const [price, setPrice] = useState([10, 30]);
  const [maxDistance, setMaxDistance] = useState(80);
  const [maturity, setMaturity] = useState(false);

  //do one for each slider
  const handleAgeChange = (event, newValue) => {
    setAge(newValue);
  };
  const handlePageCountChange = (event, newValue) => {
    setPageCount(newValue);
  };
  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };
  //FIX FIX this one doesn't have a change function?
  const handleMaxDistanceChange = (event, newValue) => {
    setMaxDistance(newValue);
  };
  const handleMaturityChange = (event) => {
    setMaturity(!maturity);
  };

  //age variables
  const thisYear = new Date().getFullYear();
  const maxAgeMark = thisYear - 1970;
  const ageMarks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: maxAgeMark,
      label: `${maxAgeMark}`,
    },
  ];

  //page count variables
  const maxPageCountMark = 1000;
  const pageCountMarks = [
    {
      value: 0,
      label: "One-night stand",
    },
    {
      value: maxPageCountMark,
      label: `Long-term relationship`,
    },
  ];

  //price variables
  const maxPriceMark = 200;
  const priceMarks = [
    {
      value: 0,
      label: "Cheap",
    },
    {
      value: maxPriceMark,
      label: `Expensive`,
    },
  ];

  //location variables
  const maxDistanceMark = 200;
  const distanceMarks = [
    {
      value: 0,
      label: "0km",
    },

    {
      value: maxDistanceMark,
      label: `${maxDistanceMark}km`,
    },
  ];

  //genre

  //Chip functions

  //onClick
  const [chips, setChips] = useState({
    mystery: false,
    romance: false,
    adventure: false,
  });
  const chipsHandler = (chipName) => {
    console.log("you clicked the chip:", chipName.target.innerHTML);
    setChips((prev) => ({
      ...prev,
      [chipName.target.innerHTML]: !chips[chipName.target.innerHTML],
    }));
    console.log("chips is:", chips);
    // const chipClass = chips[chipName.target.innerHTML];
    // console.log("chip class is", chipClass);
  };

  const genreChips = genreData.map((genre) => {
    return (
      <span
        className={classNames(
          { selected: chips[genre.name] },
          { deselected: !chips[genre.name] }
        )}
      >
        <Chip
          // icon={<FaceIcon />}
          id={genre.id}
          label={genre.name}
          name={genre.name}
          onClick={chipsHandler}
          // onDelete={handleDelete}
          variant="outlined"
        />
      </span>
    );
  });

  return (
    <>
      <div className="profile-avatar">
        <Avatar className={classes.large} />
      </div>
      <div className="profile-preference">
        <span className="profile-label">Age range (publication date)</span>

        <Slider
          value={age}
          marks={ageMarks}
          max={thisYear - 1970}
          onChange={handleAgeChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
      </div>
      <div className="profile-preference">
        <span class="profile-label">Commitment level (page count)</span>
        <Slider
          value={pageCount}
          marks={pageCountMarks}
          max={maxPageCountMark}
          onChange={handlePageCountChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
      </div>
      <div className="profile-preference">
        <span class="profile-label">Date cost (price range)</span>
        <Slider
          value={price}
          marks={priceMarks}
          max={maxPriceMark}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
      </div>
      <div className="profile-preference">
        <span class="profile-label">Maximum distance (to a bookstore)</span>
        <Slider
          defaultValue={maxDistance}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-always"
          step={10}
          marks={distanceMarks}
          max={maxDistanceMark}
          valueLabelDisplay="auto"
        />
      </div>
      <div className="profile-preference">
        <span class="profile-label">Adventurous? (maturity level)</span>
        <Switch
          // checked={true}
          onChange={handleMaturityChange}
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
      <div className="profile-preference">
        <span class="profile-label">Genres</span>
        <div class="genre-box">{genreChips}</div>
      </div>
    </>
  );
}
