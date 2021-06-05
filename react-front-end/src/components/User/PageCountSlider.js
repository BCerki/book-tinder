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
  const [value, setValue] = React.useState([256, 512]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const maxPageCount = 1000;

  const marks = [
    {
      value: 0,
      label: "One-night stand",
    },
    {
      value: maxPageCount,
      label: `Long-term relationship`,
    },
  ];

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Commitment level (page count)
      </Typography>
      <Slider
        value={value}
        marks={marks}
        max={maxPageCount}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
