import React from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import './NavigationBar.css';

class NavigationBar extends React.Component {
  logout(e){
    console.log('logout click in component');
    e.preventDefault();
    this.props.logout();
  }
 
  render(){
  	 console.log(this.props.state);
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <ul className="navbarButtonContainer">
        YOU ARE LOGGED IN!!
        <li className="singleButtonContainer"><Link to="/" className="navbarButton">Browse</Link></li>
        <li className="singleButtonContainer"><Link to="/createPost" className="navbarButton">Create</Link></li>
        <li className="singleButtonContainer"><Link to="/posted" className="navbarButton">Posted</Link></li>
        <li className="singleButtonContainer"><Link to="/pinned" className="navbarButton">Pinned</Link></li>
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
    auth: state.auth
  };
}
export default connect(mapStateToProps, { logout })(NavigationBar);
