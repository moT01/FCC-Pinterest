import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { createPost } from '../../actions/postsActions';
import { getAllPosts } from '../../actions/postsActions';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../actions/flashMessages.js';
import Post from '../common/Post';
//import PropTypes from 'prop-types'

class MyPostsForm extends React.Component {
  componentWillMount() {
    console.log("userposts" + this.props.userPosts);
    if(this.props.id && this.props.userPosts.length === 0) {
      this.props.getAllPosts();
    } else {

    }
  }

  render() {
    console.log(this.props.postsToDisplay);
    return (
      <div className="manyBooksContainer">
        {this.props.postsToDisplay.map((post, index) =>
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
      userPosts: state.auth.userPosts,
      state: state,
      auth: state.auth,
      postsToDisplay: state.postsReducer.postsToDisplay
    }
}

export default connect(mapStateToProps, {createPost, addFlashMessage, getAllPosts})(MyPostsForm);
