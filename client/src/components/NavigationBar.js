import React from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout } from '../actions/authActions';
import './NavigationBar.css';

class NavigationBar extends React.Component {
  login(e){
  	 console.log('login click in component');
    e.preventDefault();
    this.props.login();
  }	
	
  logout(e){
    console.log('logout click in component');
    e.preventDefault();
    this.props.logout();
  }
  
  render(){
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <ul className="navbarButtonContainer">
        YOU ARE LOGGED IN!!
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
        <div className="singleButtonContainer"><Link to="/" className="navbarBrand">pinterest</Link></div>

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
    auth: state.auth
  };
}
export default connect(mapStateToProps, { login, logout })(NavigationBar);
