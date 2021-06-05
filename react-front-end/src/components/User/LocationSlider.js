import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const maxDistance = 200;
const marks = [
  {
    value: 0,
    label: "0km",
  },

  {
    value: maxDistance,
    label: `${maxDistance}km`,
  },
];

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-always" gutterBottom>
        Maximum distance (to a bookstore)
      </Typography>
      <Slider
        defaultValue={80}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-always"
        step={10}
        marks={marks}
        max={maxDistance}
        valueLabelDisplay="auto"
      />
    </div>
  );
}
