import React from "react";
import Avatar from "@material-ui/core/Avatar";


export default function AvatarUpload(props) {
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
        <Avatar src={props.avatar} onClick={props.onClick} />
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

