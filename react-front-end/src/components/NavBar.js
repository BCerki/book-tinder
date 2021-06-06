import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ChatIcon from "@material-ui/icons/Chat";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

//FIX FIX probably rather styling myself?
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    // maxWidth: 100,
  },
});

export default function NavBar(props) {
  const classes = useStyles();
  // const [value, setValue] = React.useState(0);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  console.log("navbar props", props);
  return (
    <Paper square className={classes.root}>
      <Tabs
        value={props.value}
        onChange={props.handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab
          icon={<MenuBookIcon />}
          // label="RECENTS"
        />
        <Tab
          icon={<ChatIcon />}
          // label="FAVORITES"
        />
        <Tab
          icon={<AccountBoxIcon />}
          // label="NEARBY"
        />
      </Tabs>
    </Paper>
  );
}
