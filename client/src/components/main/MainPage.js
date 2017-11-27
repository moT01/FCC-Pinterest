import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { getAllPosts } from '../../actions/postsActions';
import Post from '../common/Post';
//import Test from './Test';

class MainPage extends React.Component {
  componentWillMount() {
    this.props.getAllPosts();
  }
	
  componentDidMount() {
    if(!this.props.auth.isAuthenticated) {
      this.props.login();
    }
  }

  render(){
  	 console.log(this.props.allPosts);
    return (
      <div className="manyBooksContainer">
        {this.props.allPosts.map((post, index) =>
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
    allPosts: state.postsReducer.allPosts
  };
}

export default connect(mapStateToProps, { login, getAllPosts })(MainPage);
