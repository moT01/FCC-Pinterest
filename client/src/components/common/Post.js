import React from 'react';
import { deletePost, pinPost, unpinPost } from '../../actions/postsActions';
import { GetPinButton, GetDeleteButton } from './PostConditionals';
import { addFlashMessage } from '../../actions/flashMessages';
import { connect } from 'react-redux';
import './Post.css';

class Post extends React.Component {
  constructor(props) {
 	 super(props);
    this.deletePost = this.deletePost.bind(this);
  }

  deletePost(postID, postOwner) {
  	 console.log('delete clicked in component');
    this.props.deletePost(postID, postOwner, this.props.username).then(res => {
      this.props.addFlashMessage({
        type: this.props.messages.messageType,
        text: this.props.messages.messageMessage
      });
    });
    console.log('end delete click in component');
  }

  pinPost() {
  	 console.log('pin clicked in component');
    /*this.props.pinPost(this.props.post._id).then(res => {
      this.props.addFlashMessage({
        type: this.props.messages.messageType,
        text: this.props.messages.messageMessage
      });
    });*/
  }

  unpinPost() {
    console.log('unpin clicked in component');
    /*this.props.unpinPost(this.props.post._id).then(res => {
      this.props.addFlashMessage({
        type: this.props.messages.messageType,
        text: this.props.messages.messageMessage
      });
    });*/
  }

  render() {
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

          <a className="btn btn-primary" href="http://localhost:3000" >{this.props.username}</a>

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

export default connect(mapStateToProps, { deletePost, pinPost, unpinPost, addFlashMessage})(Post);
