import React from 'react';
import {getMyPins} from '../../actions/postsActions';
import {connect} from 'react-redux';
import {addFlashMessage} from '../../actions/flashMessages.js';
import Post from '../common/Post';
import StackGrid from "react-stack-grid";


class MyPinsPage extends React.Component {
  componentWillMount() {
    if (this.props.id && this.props.myPins.length === 0) {
      this.props.getMyPins(this.props.id);
    }
  }
  render() {
    return (
      <StackGrid columnWidth={250}>
        {this.props.myPins.map((post, index) =>
          <Post key={index} post={post}/>
        )}
      </StackGrid>
    );
  }
}

function mapStateToProps(state) {
  return {id: state.auth.user.id, myPins: state.postsReducer.myPins}
}

export default connect(mapStateToProps, {addFlashMessage, getMyPins})(MyPinsPage);
