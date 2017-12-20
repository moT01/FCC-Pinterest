import React from 'react';
import { deletePost, getMyPosts } from '../../actions/postsActions';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../actions/flashMessages.js';
import Post from '../common/Post';

class MyPostsForm extends React.Component {
  componentWillMount() {
    if(this.props.id && this.props.myPosts.length === 0) {
      this.props.getMyPosts(this.props.id);
    }
  }

  render() {
    return (
      <div className="manyBooksContainer">
        {this.props.myPosts.map((post, index) =>
          <Post key={index} post={post}/>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      id: state.auth.user.id,
      myPosts: state.postsReducer.myPosts,
    }
}

export default connect(mapStateToProps, {addFlashMessage, getMyPosts, deletePost})(MyPostsForm);
