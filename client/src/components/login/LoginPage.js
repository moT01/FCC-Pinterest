import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import MainPage from '../main/MainPage';

class LoginPage extends React.Component {
  render(){
  	 this.props.login();
  	 
  	 return (
      <div>
        logged in page
        MainPage component here
        
        <MainPage />
      </div>
    );
  }
}

export default connect(null, { login })(LoginPage);
