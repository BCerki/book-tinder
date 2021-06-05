import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Switch from "@material-ui/core/Switch";
import genreData from "../dummyGenreData";

export default function Button() {
  //Chip functions
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  //Styling
  const useStyles = makeStyles({
    root: {
      width: 200,
    },
  });

  const classes = useStyles();

  //Slider helpers
  function valuetext(value) {
    return `${value}`;
  }

  //FIX FIX, mentor and talk to DB
  const [value, setValue] = React.useState([20, 40]);
  //State updates
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {},
  // });
  // const setDay = (day) => setState({ ...state, day });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
  console.log(genreData);
  const genreChips = genreData.map((genre) => {
    console.log(genre);
    return (
      <Chip
        // icon={<FaceIcon />}
        id={genre.id}
        label={genre.name}
        onClick={handleClick}
        onDelete={handleDelete}
      />
    );
  });

  return (
    <main>
      <section>
        <Avatar />
      </section>
      <div className={classes.root}>
        <Typography id="range-slider" gutterBottom>
          Age range (publication date)
        </Typography>
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
      <div className={classes.root}>
        <Typography id="range-slider" gutterBottom>
          Commitment level (page count)
        </Typography>
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
      <div className={classes.root}>
        <Typography id="range-slider" gutterBottom>
          Date cost (price range)
        </Typography>
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
      <div className={classes.root}>
        <Typography id="discrete-slider-always" gutterBottom>
          Maximum distance (to a bookstore)
        </Typography>
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
      <div className={classes.root}>
        <Typography id="discrete-slider-always" gutterBottom>
          Adventurous? (maturity level)
        </Typography>
        <Switch
          checked={true}
          // onChange={handleChange}
          color="primary"
          name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
      <section>
        <Typography gutterBottom>Genres</Typography>
        {genreChips}
      </section>
    </main>
  );
}
