import React from 'react';
import CreatePostForm from './CreatePostForm';

class CreatePostPage extends React.Component {
  render() {
    return(
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <CreatePostForm />
        </div>
      </div>
    );
  }
}

export default CreatePostPage;
