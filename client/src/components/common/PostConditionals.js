import React from 'react';

export function GetPinButton(props) {

  //if mine - show nothing
  if(props.userID === props.post.postedBy) {
    return <div/>
  }

  //if pinned - show unpin button
  if(props.post.pinnedBy.indexOf(props.userID) >= 0) {
      return <div className="btn btn-primary unpinButton" onClick={props.unpinPost}>P-</div>
  }

  //if not pinned - show pin button
  return <div className="glyphicon glyphicon-pushpin pinButton" onClick={props.pinPost}/>
}

export function GetDeleteButton(props) {

  //if not logged in
  if(!props.userID) {
    return <div></div>
  }

  //if my post
  if(props.userID === props.post.postedBy) {
    return <div onClick={() => props.deletePost(props.post._id, props.post.postedBy)}
         className="glyphicon glyphicon-remove deleteButton">
      </div>
  }

  return <div></div>
}
