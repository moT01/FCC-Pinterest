import React from 'react';
import UserPostsForm from './UserPostsForm';

class UserPostsPage extends React.Component {
  render() {
    console.log(this.props);
    console.log("hello");
    return(
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <UserPostsForm userId={this.props.match.params.userId}/>
        </div>
      </div>
    );
  }
}
//
export default UserPostsPage;
