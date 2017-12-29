import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { getAllPosts } from '../../actions/postsActions';
import Post from '../common/Post';
import StackGrid from "react-stack-grid";


class MainPage extends React.Component {
  componentWillMount() {
    if(this.props.postsToDisplay.length === 0) {
      this.props.getAllPosts();
    }
  }

  render(){

    return (
      <StackGrid columnWidth={150}
        monitorImagesLoaded={true}
        duration={0}>
        {this.props.postsToDisplay.map((post, index) =>
          <Post key={index} post={post}/>
        )}
     </StackGrid>
    );
  }
}
//
function mapStateToProps(state) {
  return {
    state: state,
    auth: state.auth,
    postsToDisplay: state.postsReducer.postsToDisplay
  };
}

export default connect(mapStateToProps, { login, getAllPosts })(MainPage);
