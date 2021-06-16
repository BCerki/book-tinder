import React, { useState, useContext, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import GenreChip from "./GenreChip";
import PostalCode from "./PostalCode";
import UserName from "./UserName";
import AvatarUpload from "./AvatarUpload";

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

  //set individual states and user state
  const [age, setAge] = useState([20, 40]);
  const [pageCount, setPageCount] = useState([256, 512]);
  const [price, setPrice] = useState([10, 30]);
  const [maxDistance, setMaxDistance] = useState(80);
  const [maturity, setMaturity] = useState(false);
  const [chips, setChips] = useState([]);
  const [avatar, setAvatar] = useState("");

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
    avatar: "",
  });
  //AVATAR: add avatar to user state above??

  useEffect(() => {
    //get the user info that's currently in the db
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
        setPostalCode(result.data[0].postalCode);
        setName(result.data[0].name);
        setAvatar(result.data[0].avatar);
        console.log("WHAT IS THIS", result.data[0].avatar)
      })
      .catch((err) => console.log("Error message:", err.message));
  }, []);

  const sendToDB = function(userObject) {
    console.log("send to DB is firing with userObject:", userObject);
    //need to send userObject, not userState, because it's not updated yet
    console.log("userobject.id is", userObject.id);
    console.log("userstate.id is", userState.id);
    //set state with new info
    setUserState(userObject);
    //send to db
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

  //genre variables
  const genreData = [
    "Mystery",
    "Romance",
    "Literary",
    "Science Fiction",
    "Fantasy",
    "Children's",
    "Non-fiction",
    "History",
    "Biography/Memoir",
    "Cooking",
    "Humour",
    "Self-help",
  ];

  //Genres
  const handleClick = function(genre) {
    console.log("I am click handler and userState.genres is", userState.genres);
    const newGenres = [...userState.genres];

    if (userState.genres.includes(genre)) {
      const index = userState.genres.findIndex((element) => element === genre);
      newGenres.splice(index, 1);
      console.log("i am removing", genre, "and new genres is", newGenres);
    } else {
      newGenres.push(genre);
      console.log("i am adding", genre, "and new genres is", newGenres);
    }
    const newUserObject = { ...userState, genres: newGenres };
    sendToDB(newUserObject);
    setChips(newGenres);
  };

  const genreChips = genreData.map((genre) => {
    return (
      <GenreChip
        key={genre}
        onClick={() => {
          handleClick(genre);
        }}
        selected={chips.includes(genre) ? true : false}
      />
    );
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [name, setName] = useState("");
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  console.log("postalCode state is", postalCode);
  //PostalCode
  const handleEditing = function(event) {
    setIsEditing(true);
  };

  const handleNameEditing = function(event) {
    setIsEditingName(true);
  };

  const handleBlur = function(event) {
    setIsEditing(false);
    setPostalCode(event.target.value);

    const newUserObject = { ...userState, postalCode: event.target.value };

    sendToDB(newUserObject);
  };

  const handleBlurName = function(event) {
    setIsEditingName(false);
    setName(event.target.value);

    const newUserObject = { ...userState, name: event.target.value };

    sendToDB(newUserObject);
  };

  //AVATAR
  const handleAvatarChange = (event) => {
    event.preventDefault();
    
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      function() {
        // convert image file to base64 string
        console.log("reader result:", reader.result);
        
        const newUserObject = { ...userState, avatar: reader.result };

        sendToDB(newUserObject);
        setAvatar(reader.result);
        setIsEditingAvatar(false);
      },
      false
    );

    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  //CLOUDINARY IMPLEMENTATION
  // const handleAvatarChange = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   if (!file) return;
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     console.log("FILE IS:", reader.result);
  //     uploadImage(reader.result);
  //   };
  //   reader.onerror = () => {
  //     console.error("Did not work!");
  //   };
  // };

  // const uploadImage = function(base64EncodedImage) {
  //   console.log("Did I hit?");
  //   setAvatar('');
  //   axios
  //   .post('/api/upload/', base64EncodedImage)
  //   .then((result) => {
  //     console.log("image post worked!");
  //   })
  //   .catch((err) => console.log("Error message:", err.message));
  // };
  
    const handleAvatarClick = function() {
      setIsEditingAvatar(true);
    }

  //   try {
  //     await fetch ('/api/upload', {
  //       method: 'POST',
  //       body: JSON.stringify({data: base64EncodedImage}),
  //       headers: {"Content-Type": "application/json"},
  //     });
  //     setAvatar("");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  


  console.log("avatar is:", avatar);
  console.log("setAvatar is:", setAvatar);

  console.log("isediting is", isEditing);
  //Return statements components
  if (!userState.id) {
    return <Loading />;
  }
  return (
    <main>
      {/* <div className="profile-avatar">
        <Avatar className={classes.large}
        src={avatar}/>
      </div> */}
      <div>
        <AvatarUpload
        onChange={handleAvatarChange}
        avatar={avatar}
        isEditingAvatar={isEditingAvatar}
        onClick={handleAvatarClick}
        />
      </div>
      <div>
        <UserName
          onClick={handleNameEditing}
          isEditing={isEditingName}
          name={name}
          onBlur={handleBlurName}
        />
      </div>

      <div>
        <PostalCode
          onClick={handleEditing}
          isEditing={isEditing}
          postalCode={postalCode}
          onBlur={handleBlur}
        />
      </div>
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
        <span className={"profile-label"}>Commitment level (page count)</span>
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
        <span className={"profile-label"}>Date cost (price range)</span>
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
        <span className={"profile-label"}>
          Maximum distance (to a bookstore)
        </span>
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
          <span className={"profile-label"}>
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
        <span className={"profile-label"}>Genres</span>
        <div className={"genre-box"}>{genreChips}</div>
      </div>
    </main>
  );
}
