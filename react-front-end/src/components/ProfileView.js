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

  //Chip functions
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  //Slider helpers
  function valuetext(value) {
    return `${value}`;
  }

  //do one of these for each slider, mentor and talk to DB
  const [value, setValue] = React.useState([20, 40]);

  //State updates
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {},
  // });
  // const setDay = (day) => setState({ ...state, day });

  //do one for each slider
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //onClick
  // const [state, setState] = useState({
  //   sliderOne: false,
  //   sliderTwo: false,
  //   sliderThree: false,
  // });
  // const sliderHandler = (sliderName) => {
  //   setState((prevState) => ({ ...prevState, sliderName: !sliderName }));
  // };

  //age variables
  const thisYear = new Date().getFullYear();
  const maxAge = thisYear - 1970;
  const ageMarks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: maxAge,
      label: `${maxAge}`,
    },
  ];

  //page count variables
  const maxPageCount = 1000;
  const pageCountMarks = [
    {
      value: 0,
      label: "One-night stand",
    },
    {
      value: maxPageCount,
      label: `Long-term relationship`,
    },
  ];

  //price variables
  const maxPrice = 200;
  const priceMarks = [
    {
      value: 0,
      label: "Cheap",
    },
    {
      value: maxPrice,
      label: `Expensive`,
    },
  ];

  //location variables
  const maxDistance = 200;
  const locationMarks = [
    {
      value: 0,
      label: "0km",
    },

    {
      value: maxDistance,
      label: `${maxDistance}km`,
    },
  ];

  //genre

  const chipClass = classNames({ selected: true }, { deselected: false });
  const genreChips = genreData.map((genre) => {
    return (
      <span className={chipClass}>
        <Chip
          // icon={<FaceIcon />}
          id={genre.id}
          label={genre.name}
          onClick={handleClick}
          onDelete={handleDelete}
        />
      </span>
    );
  });

  return (
    <main>
      <div className="profile-avatar">
        <Avatar className={classes.large} />
      </div>
      <div className="profile-preference">
        <span className="profile-label">Age range (publication date)</span>

        <Slider
          value={value}
          marks={ageMarks}
          max={thisYear - 1970}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
      </div>
      <div className="profile-preference">
        <span class="profile-label">Commitment level (page count)</span>
        <Slider
          value={value}
          marks={pageCountMarks}
          max={maxPageCount}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
      </div>
      <div className="profile-preference">
        <span class="profile-label">Date cost (price range)</span>
        <Slider
          value={value}
          marks={priceMarks}
          max={maxPrice}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
      </div>
      <div className="profile-preference">
        <span class="profile-label">Maximum distance (to a bookstore)</span>
        <Slider
          defaultValue={80}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-always"
          step={10}
          marks={locationMarks}
          max={maxDistance}
          valueLabelDisplay="auto"
        />
      </div>
      <div className="profile-preference">
        <span class="profile-label">Adventurous? (maturity level)</span>
        <Switch
          checked={true}
          // onChange={handleChange}
          color="primary"
          name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
      <div className="profile-preference">
        <span class="profile-label">Genres</span>
        <div class="genre-box">{genreChips}</div>
      </div>
    </main>
  );
}
