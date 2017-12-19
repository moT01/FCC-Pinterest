import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { getAllPosts } from '../../actions/postsActions';
import Post from '../common/Post';
var Masonry = require('react-masonry-component');

var masonryOptions = {
transitionDuration: 0
};

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

  	console.log(this.props.state);
    return (
      <Masonry
        className={'my-gallery-class'} // default ''
        elementType={'ul'} // default 'div'
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
      >


        {this.props.postsToDisplay.map((post, index) =>
          <Post key={index} post={post}/>
        )}
      
      </Masonry>
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
