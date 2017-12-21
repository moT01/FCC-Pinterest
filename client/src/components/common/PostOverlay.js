import React from 'react';
import { Link } from 'react-router-dom';

export function PostOverlay(props) {

  //when user is logged out
  if(!props.userID) {
     return(
      <div>
        <Link to={'/userPage/'+ props.post.postedBy}>
          <img src={props.post.profileImageUrl} className="userPicture" alt=""/>
        </Link>
        <Link to={'/userPage/'+ props.post.postedBy} className="userName">
          {props.post.ownerUsername}
        </Link>
      </div>);
  }

  //when user is logged in and owns the post
  else if(props.userID === props.post.postedBy) {
     return(
      <div>
        <div onClick={() => props.deletePost(props.post._id, props.post.postedBy)}
             className="glyphicon glyphicon-remove deleteButton"/>
        <Link to={'/userPage/'+ props.post.postedBy}>
          <img src={props.post.profileImageUrl} className="userPicture" alt=""/>
        </Link>
        <Link to={'/userPage/'+ props.post.postedBy} className="userName">
          {props.post.ownerUsername}
        </Link>
      </div>);
  }

  //when user is logged in and has  pinned the post
  else if(props.post.pinnedBy.indexOf(props.userID) >= 0){
    const pinCount = props.post.pinnedBy.length;
    return(
     <div>
       <div className=" pinButton" onClick={props.unpinPost}>
         <span className = "glyphicon glyphicon-pushpin"/>
         <text> {pinCount} </text>
       </div>
       <Link to={'/userPage/'+ props.post.postedBy}>
         <img src={props.post.profileImageUrl} className="userPicture" alt=""/>
       </Link>
       <Link to={'/userPage/'+ props.post.postedBy} className="userName">
         {props.post.ownerUsername}
       </Link>
     </div>);
  }

  //when user is logged in and has not pinned the post
  else{
    const pinCount = props.post.pinnedBy.length;
    return(
     <div>
       <div className=" pinButton" onClick={props.pinPost}>
         <span className = "glyphicon glyphicon-pushpin"/>
         <text> {pinCount} </text>
       </div>
       <Link to={'/userPage/'+ props.post.postedBy}>
         <img src={props.post.profileImageUrl} className="userPicture" alt=""/>
       </Link>
       <Link to={'/userPage/'+ props.post.postedBy} className="userName">
         {props.post.ownerUsername}
       </Link>
     </div>);
  }
}
