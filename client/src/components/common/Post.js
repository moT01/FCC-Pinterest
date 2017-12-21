import React from 'react';
import { deletePost, pinPost, unpinPost, getMyPosts } from '../../actions/postsActions';
import { PostOverlay } from './PostOverlay';
import { addFlashMessage } from '../../actions/flashMessages';
import { connect } from 'react-redux';
import './Post.css';

class Post extends React.Component {
  constructor(props) {
 	 super(props);
    this.deletePost = this.deletePost.bind(this);
    this.pinPost = this.pinPost.bind(this);
    this.unpinPost = this.unpinPost.bind(this);
    this.getUserPosts = this.getUserPosts.bind(this);
  }

  deletePost(postID, postOwnerID) {
  	 console.log('delete clicked in component');
    this.props.deletePost(postID, postOwnerID, this.props.id).then(() => {
      this.props.addFlashMessage({
        type: "success",
        text: "picture deleted"
      });
    });
  }

  pinPost() {
  	console.log('pin clicked in component');
    this.props.pinPost(this.props.post._id, this.props.id).then(() => {
      this.props.addFlashMessage({
        type: "success",
        text: "pinned"
      });
    });
  }

  unpinPost() {
    console.log('unpin clicked in component');
    this.props.unpinPost(this.props.post._id, this.props.id).then(res => {
      this.props.addFlashMessage({
        type: "success",
        text: "unpinned"
      });
    });
  }

  getUserPosts(username) {
    this.props.getUserPosts(username);
  }

  render() {
    return (
      <div className="postContainer">
        <img src={this.props.post.imageURL} className="bookImage" alt=""/>
        <div className="postInfo">
          <PostOverlay
            post={this.props.post}
            userID={this.props.id}
            pinPost={this.pinPost}
            unpinPost={this.unpinPost}
            deletePost={this.deletePost}
          />
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    state: state,
    id: state.auth.user.id,
    username: state.auth.user.username
  }
}

export default connect(mapStateToProps, { deletePost, pinPost, unpinPost, getMyPosts, addFlashMessage})(Post);
