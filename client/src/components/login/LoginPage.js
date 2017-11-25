import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';

class ProfilePage extends React.Component {
  render(){
  	 this.props.login();
  	 
  	 return (
      <div></div>
    );
  }
}

export default connect(null, { login })(ProfilePage);
