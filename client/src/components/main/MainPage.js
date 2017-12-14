import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { getAllPosts } from '../../actions/postsActions';
import Post from '../common/Post';

class MainPage extends React.Component {
  componentWillMount() {
    if(this.props.postsToDisplay.length === 0) {
      this.props.getAllPosts();
    } else {

    }
  }

  componentDidMount() {
  }

  render(){
    return (
      <div className="manyBooksContainer">
        {this.props.postsToDisplay.map((post, index) =>
          <Post key={index} post={post}/>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
    auth: state.auth,
    postsToDisplay: state.postsReducer.postsToDisplay
  };
}

export default connect(mapStateToProps, { login, getAllPosts })(MainPage);
