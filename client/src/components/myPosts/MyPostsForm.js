import React from 'react';
import { deletePost, getMyPosts } from '../../actions/postsActions';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../actions/flashMessages.js';
import Post from '../common/Post';
//import PropTypes from 'prop-types'

class MyPostsForm extends React.Component {
  componentWillMount() {
    if(this.props.id && this.props.myPosts.length === 0) {
      this.props.getMyPosts(this.props.id);
    } else {
    }
  }

  render() {
    //console.log("myPostsfrom" + this.props.myPosts);
    return (
      <div className="manyBooksContainer">
        {this.props.myPosts.map((post, index) =>
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
      myPosts: state.postsReducer.myPosts,
      state: state,
      auth: state.auth,
      postsToDisplay: state.postsReducer.postsToDisplay
    }
}

export default connect(mapStateToProps, {addFlashMessage, getMyPosts, deletePost})(MyPostsForm);
