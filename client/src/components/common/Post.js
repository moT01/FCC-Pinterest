import React from 'react';
import { deletePost, pinPost, unpinPost, getMyPosts } from '../../actions/postsActions';
import { GetPinButton, GetDeleteButton } from './PostConditionals';
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

  deletePost(postID, postOwner) {
  	 console.log('delete clicked in component');
    this.props.deletePost(postID, postOwner, this.props.username).then(res => {
      this.props.addFlashMessage({
        type: this.props.messages.type,
        text: this.props.messages.content
      });
    });
  }

  pinPost() {
  	 console.log('pin clicked in component');
    this.props.pinPost(this.props.post._id, this.props.username).then(res => {
      this.props.addFlashMessage({
        type: this.props.messages.type,
        text: this.props.messages.content
      });
    });
  }

  unpinPost() {
    console.log('unpin clicked in component');
    /*this.props.unpinPost(this.props.post._id).then(res => {
      this.props.addFlashMessage({
        type: this.props.messages.type,
        text: this.props.messages.content
      });
    });*/
  }

  getUserPosts(username) {
    console.log('getUserPosts clicked in component');
    this.props.getUserPosts(username);
  }

  render() {
    console.log("post"+this.props.post);
    return (
      <div className="singleBookContainer">
        <img src={this.props.post.imageURL} className="bookImage" alt=":)"/>

        <div className="bookButtonContainer">
          <GetPinButton
            post={this.props.post}
            userID={this.props.id}
            username={this.props.username}
            pinPost={this.pinPost.bind(this)}
            unpinPost={this.unpinPost.bind(this)}
          />

          <div className="btn btn-primary" onClick={() => this.getUserPosts(this.props.post.postedBy)} >{this.props.post.postedBy}</div>

          <GetDeleteButton
            post={this.props.post}
            userID={this.props.id}
            username={this.props.username}
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
    messages: state.postsReducer.message,
    id: state.auth.user.id,
  	 username: state.auth.user.username
  }
}

export default connect(mapStateToProps, { deletePost, pinPost, unpinPost, getMyPosts, addFlashMessage})(Post);
