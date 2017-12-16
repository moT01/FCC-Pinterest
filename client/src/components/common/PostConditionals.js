import React from 'react';

export function GetPinButton(props) {
  
  //if mine - show nothing
  if(props.username === props.post.postedBy) {
    return <div></div>
  }
  
  props.post.pinnedBy.forEach((pinner, index) => {

    //if pinned - show unpin button
    if(props.post.pinnedBy[index] === pinner) {
      return <div className="btn btn-primary" onClick={props.unpinPost}>P-</div>
    }
  });

  //if not pinned - show pin button
  return <div className="btn btn-primary" onClick={props.pinPost}>P+</div>
}

export function GetDeleteButton(props) {
	
  //if not logged in
  if(!props.userID) {
    return <div></div>
  }

  //if my post
  if(props.userID === props.post.postedBy) {
    return <div className="btn btn-primary" onClick={() => props.deletePost(props.post._id, props.post.postedBy)}>X</div>
  }

  return <div></div>
}
