import React from 'react';
import { getMyPins } from '../../actions/postsActions';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../actions/flashMessages.js';
import Post from '../common/Post';

class MyPinsForm extends React.Component {
  componentWillMount() {
    console.log("mypins " + this.props.myPins);
    if(this.props.id && this.props.myPins.length === 0) {
      this.props.getMyPins(this.props.id);
    } else {

    }
  }

  render() {
    console.log(this.props.myPins);
    return (
      <div className="manyBooksContainer">
        {this.props.myPins.map((post, index) =>
          <Post key={index} post={post}/>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      id: state.auth.user.id,
      myPins: state.postsReducer.myPins
    }
}

export default connect(mapStateToProps, { addFlashMessage, getMyPins})(MyPinsForm);
