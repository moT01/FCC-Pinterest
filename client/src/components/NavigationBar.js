import React from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout } from '../actions/authActions';
import { getAllPosts, getMyPins, getMyPosts } from '../actions/postsActions';
import TwitterLogin from 'react-twitter-auth';
import './NavigationBar.css';

class NavigationBar extends React.Component {
  onSuccess = (response) => {
    this.props.login(response);
  };

  //needs to be connected to the error handleing mechanism.
  onFailed = (error) => {
    alert(error);
  };


  logout(e){
    this.setState({isAuthenticated: false, token: '', user: null})
    console.log('logout click in component');
    e.preventDefault();
    this.props.logout();
  }



  render(){
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <ul className="navbarButtonContainer">
        <li className="singleButtonContainer"><Link to="/" className="navbarButton">Browse</Link></li>
        <li className="singleButtonContainer"><Link to="/createPost" className="navbarButton">Create</Link></li>
        <li className="singleButtonContainer"><Link to="/myPosts" className="navbarButton" >myPosts</Link></li>
        <li className="singleButtonContainer"><Link to="/myPins" className="navbarButton" >myPins</Link></li>
        <li className="singleButtonContainer"><Link to="#" className="navbarButton" onClick={this.logout.bind(this)}>Logout</Link></li>
      </ul>
    );

    // the twitter component uses the 'react-twitter-auth' to connect to twitter through the backend
    const guestLinks = (
      <ul className="navbarButtonContainer">
        <li className="singleButtonContainer">
          <TwitterLogin loginUrl="http://localhost:8080/api/auth/twitter"
                      onFailure={this.onFailed} onSuccess={this.onSuccess}
                      requestTokenUrl="http://localhost:8080/api/auth/twitter/reverse"/>
          </li>
      </ul>
    );

    return (
      <nav className="navbarContainer">
        <div className="singleButtonContainer"><Link to="/" className="navbarBrand">Pinterest</Link></div>
        {isAuthenticated ? userLinks : guestLinks}
      </nav>
    );
  }
}

/*NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}*/

function mapStateToProps(state) {
  return {
    state: state,
    auth: state.auth,
    username: state.auth.user.username
  };
}

export default connect(mapStateToProps, { logout, login })(NavigationBar);
