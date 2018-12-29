import React from 'react';
import {Link} from 'react-router-dom';

export function PostOverlay(props) {

  if (!props.userID) { //when user is logged out
    return (
      <div>
        <Link to={'/userPage/' + props.post.postedBy}>
          <img src={props.post.profileImageUrl} className="userPicture" alt=""/>
        </Link>
        <Link to={'/userPage/' + props.post.postedBy} className="userName">
          {(props.post.ownerUsername).slice(0, 10)}
        </Link>
      </div>
    );
  } else if (props.userID === props.post.postedBy) { //when user is logged in and owns the post
    return (
      <div>
        <div onClick={() => props.deletePost(props.post._id, props.post.postedBy)} className="glyphicon glyphicon-remove deleteButton"/>
        <Link to={'/myPosts'}>{/* send user to myposts instead of userPage*/}
          <img src={props.post.profileImageUrl} className="userPicture" alt=""/>
        </Link>
        <Link to={'/myPosts'} className="userName">
          {(props.post.ownerUsername).slice(0, 10)}
        </Link>
      </div>
    );
  } else if (props.post.pinnedBy.indexOf(props.userID) >= 0) { //when user is logged in and has  pinned the post
    console.log("pinned");
    const pinCount = props.post.pinnedBy.length;
    return (
      <div>
        <div className=" unpinButton" onClick={props.unpinPost}>
          <span className="glyphicon glyphicon-pushpin"/>
          <text>
            {pinCount}
          </text>
        </div>
        <Link to={'/userPage/' + props.post.postedBy}>
          <img src={props.post.profileImageUrl} className="userPicture" alt=""/>
        </Link>
        <Link to={'/userPage/' + props.post.postedBy} className="userName">
          {(props.post.ownerUsername).slice(0, 10)}
        </Link>
      </div>
    );
  } else { //when user is logged in and has not pinned the post
    const pinCount = props.post.pinnedBy.length;
    return (
      <div>
        <div className=" pinButton" onClick={props.pinPost}>
          <span className="glyphicon glyphicon-pushpin"/>
          <text>
            {pinCount}
          </text>
        </div>
        <Link to={'/userPage/' + props.post.postedBy}>
          <img src={props.post.profileImageUrl} className="userPicture" alt=""/>
        </Link>
        <Link to={'/userPage/' + props.post.postedBy} className="userName">
          {(props.post.ownerUsername).slice(0, 10)}
        </Link>
      </div>
    );
  }
}
