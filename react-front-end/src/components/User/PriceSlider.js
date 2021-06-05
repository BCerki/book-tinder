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
  const [value, setValue] = React.useState([20, 60]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const maxPrice = 200;

  const marks = [
    {
      value: 0,
      label: "Cheap",
    },
    {
      value: maxPrice,
      label: `Expensive`,
    },
  ];

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Date cost (price range)
      </Typography>
      <Slider
        value={value}
        marks={marks}
        max={maxPrice}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
