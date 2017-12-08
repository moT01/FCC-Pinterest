import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { getAllPosts } from '../../actions/postsActions';
import Post from '../common/Post';

class MainPage extends React.Component {
  // // componentWillMount() {
  // //   console.log('will mount');
  // //   if(!this.props.auth.isAuthenticated) {
  // //     console.log('will mount - login()');
  // //     this.props.login().then(() => {
  // //       console.log('login.then => getAllPosts');
  // //       this.props.getAllPosts();
  // //     });
  // //   } else {
  // //   	console.log('getAllPosts');
  // //     this.props.getAllPosts();
  // //   }
  // // }
  //
  // componentDidMount() {
  //   console.log('did mount');
  // }

  render(){
  	 console.log(this.props.state);
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
