import React from 'react';
import { deletePost, getUserPosts } from '../../actions/postsActions';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../actions/flashMessages.js';
import Post from '../common/Post';
//import PropTypes from 'prop-types'

class UserPostsForm extends React.Component {
  componentWillMount() {
      this.props.getUserPosts(this.props.userId);
  }

  render() {
    //console.log("userPostsfrom" + this.props.userPosts);
    return (
      <div className="manyBooksContainer">
        {this.props.userPosts.map((post, index) =>
          <Post key={index} post={post}/>
        )}
      </div>
    );
  }
}

/*CreatePostForm.propTypes = {
  createPost: PropTypes.func.isRequired
}*/

function mapStateToProps(state) {
    return {
      id: state.auth.user.id,
      username: state.auth.user.username,
      message: state.postsReducer.message,
      userPosts: state.postsReducer.userPosts,
      state: state,
      auth: state.auth,
      postsToDisplay: state.postsReducer.postsToDisplay
    }
}

export default connect(mapStateToProps, {addFlashMessage, getUserPosts, deletePost})(UserPostsForm);
