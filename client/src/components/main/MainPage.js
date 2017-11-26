import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';

class MainPage extends React.Component {
  componentDidMount() {
    if(!this.props.auth.isAuthenticated) {
      this.props.login();
    }
  }

  render(){
    return (
      <div>Main Page - browse all posts here</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
    auth: state.auth
  };
}

export default connect(mapStateToProps, { login })(MainPage);
