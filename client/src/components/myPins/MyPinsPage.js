import React from 'react';
import MyPinsForm from './MyPinsForm';

class MyPinsPage extends React.Component {
  render() {
    return(
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <MyPinsForm />
        </div>
      </div>
    );
  }
}

export default MyPinsPage;
