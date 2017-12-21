import React from 'react';
import { Link } from 'react-router-dom';

export function PostOverlay(props) {

  const pinCount = 999;
  //props.post.pinnedBy.length;

  console.log(pinCount);

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
        <div className="glyphicon glyphicon-pushpin pinButton" onClick={props.unpinPost}/>
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

  //when user is logged in and has not pinned the post
  else if(props.post.pinnedBy.indexOf(props.userID) >= 0){
    return(
     <div>
       <div className="glyphicon glyphicon-pushpin pinButton" onClick={props.unpinPost}/>
       <Link to={'/userPage/'+ props.post.postedBy}>
         <img src={props.post.profileImageUrl} className="userPicture" alt=""/>
       </Link>
       <Link to={'/userPage/'+ props.post.postedBy} className="userName">
         {props.post.ownerUsername}
       </Link>
     </div>);
  }

  //when user is logged in and has pinned the post
  else{
    return(
     <div>
       <div className="glyphicon glyphicon-pushpin pinButton" onClick={props.unpinPost}/>
       <Link to={'/userPage/'+ props.post.postedBy}>
         <img src={props.post.profileImageUrl} className="userPicture" alt=""/>
       </Link>
       <Link to={'/userPage/'+ props.post.postedBy} className="userName">
         {props.post.ownerUsername}
       </Link>
     </div>);
  }
}
