import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}`;
}

export default function RangeSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState([20, 40]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const thisYear = new Date().getFullYear();

  const age = thisYear - 1970;

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: age,
      label: `${age}`,
    },
  ];

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Age range (publication date)
      </Typography>
      <Slider
        value={value}
        marks={marks}
        max={thisYear - 1970}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
