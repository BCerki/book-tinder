import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

export default function AvatarUpload(props) {
  //Material UI styling
  const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  }));
  const classes = useStyles();
  const isEditingAvatar = function() {
    if (props.isEditingAvatar === true) {
      return (
        <div className="update-avatar">
          <form>
            <input type="file" name="avatar" onChange={props.onChange} />
          </form>
        </div>
      );
    }
    return (
      <div className="profile-avatar">
        <Avatar
          src={props.avatar}
          onClick={props.onClick}
          className={classes.large}
        />
      </div>
    );
  };
  return <div>{isEditingAvatar()}</div>;
}

//CLOUDINARY IMPLMENTATION
// export default function AvatarUpload(props) {
//   const isEditingAvatar = function() {
//     if (props.isEditingAvatar === true) {
//       return (
//         <div className="update-avatar">
//           <form>
//             <input type="file" name="avatar" onChange={props.onChange} value={props.avatar} className="form-input" />
//           </form>
//         </div>
//       );
//     }
//     return (
//       <div className="profile-avatar">
//         <Avatar src={props.avatar} onClick={props.onClick} />
//       </div>
//     );
//   };
//   return <div>{isEditingAvatar()}</div>;
// }
