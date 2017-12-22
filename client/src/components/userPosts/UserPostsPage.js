import React from 'react';
import { deletePost, getUserPosts } from '../../actions/postsActions';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../actions/flashMessages.js';
import Post from '../common/Post';
import StackGrid from "react-stack-grid";

class UserPostsPage extends React.Component {
  componentWillMount() {
      this.props.getUserPosts(this.props.match.params.userId);
  }
  render() {
    return(
      <StackGrid columnWidth={150}>
        {this.props.userPosts.map((post, index) =>
        <Post key={index} post={post}/>
        )}
      </StackGrid>
    );
  }
}

function mapStateToProps(state) {
    return {
      message: state.postsReducer.message,
      userPosts: state.postsReducer.userPosts,
    }
}

export default connect(mapStateToProps, {addFlashMessage, getUserPosts, deletePost})(UserPostsPage);
