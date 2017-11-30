import React from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import { getAllPosts, getMyPins, getUserPosts } from '../actions/postsActions';
import './NavigationBar.css';

class NavigationBar extends React.Component {
  logout(e){
    console.log('logout click in component');
    e.preventDefault();
    this.props.logout();
  }
  
  allPosts(e) {
    console.log('logout click in component');
    e.preventDefault();
    this.props.getAllPosts();    
  }
  
  myPins(e) {
    console.log('myPins clicked in nav component');
    e.preventDefault();
    this.props.getMyPins(this.props.username);
  }
  
  myPosts(e) {
    console.log('myPosts clicked in nav component');
    e.preventDefault();
    this.props.getUserPosts(this.props.username);
  }
 
  render(){
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <ul className="navbarButtonContainer">
        <li className="singleButtonContainer"><Link to="#" className="navbarButton" onClick={this.allPosts.bind(this)}>Browse</Link></li>
        <li className="singleButtonContainer"><Link to="/createPost" className="navbarButton">Create</Link></li>
        <li className="singleButtonContainer"><Link to="#" className="navbarButton" onClick={this.myPosts.bind(this)}>myPosts</Link></li>
        <li className="singleButtonContainer"><Link to="#" className="navbarButton" onClick={this.myPins.bind(this)}>myPins</Link></li>
        <li className="singleButtonContainer"><Link to="#" className="navbarButton" onClick={this.logout.bind(this)}>Logout</Link></li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbarButtonContainer">
        <li className="singleButtonContainer"><a href="http://localhost:8080/api/auth/twitterLogin" className="navbarButton">Login</a></li>
      </ul>
    );

    return (
      <nav className="navbarContainer">
        <div className="singleButtonContainer"><Link to="/" className="navbarBrand">Pinterest</Link></div>

        { isAuthenticated ? userLinks : guestLinks }
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

export default connect(mapStateToProps, { logout, getAllPosts, getMyPins, getUserPosts })(NavigationBar);
