import React from 'react';
import MyPostsForm from './MyPostsForm';

class MyPostsPage extends React.Component {
  render() {
    return(
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <MyPostsForm />
        </div>
      </div>
    );
  }
}

export default MyPostsPage;
