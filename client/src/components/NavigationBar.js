import React from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout } from '../actions/authActions';
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
        <li className="singleButtonContainer"><Link to="/" className="navbarButton glyphicon glyphicon-eye-open"></Link></li>
        <li className="singleButtonContainer"><Link to="/createPost" className="navbarButton glyphicon glyphicon-plus"></Link></li>
        <li className="singleButtonContainer"><Link to="/myPosts" className="navbarButton glyphicon glyphicon-folder-open" ></Link></li>
        <li className="singleButtonContainer"><Link to="/myPins" className="navbarButton glyphicon glyphicon-pushpin" ></Link></li>
        <li className="singleButtonContainer"><Link to="#" className="navbarButton glyphicon glyphicon-off" onClick={this.logout.bind(this)}></Link></li>
      </ul>
    );

    // the twitter component uses the 'react-twitter-auth' to connect to twitter through the backend
    const guestLinks = (
      <ul className="navbarButtonContainer">
        <li className="singleButtonContainer twitterLogin">
          <TwitterLogin loginUrl="http://localhost:8080/api/auth/twitter"
                      onFailure={this.onFailed} onSuccess={this.onSuccess}
                      requestTokenUrl="http://localhost:8080/api/auth/twitter/reverse"/>
          </li>
      </ul>
    );

    return (
      <nav className="navbarContainer navbar-fixed-top">
        <div className="singleButtonContainer">
          <Link to="/" className="navbarBrand">
            <img src="https://seeklogo.com/images/P/pinterest-badge-logo-82C89A5E42-seeklogo.com.png" alt="Pinterest"/>
          </Link>
        </div>
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
