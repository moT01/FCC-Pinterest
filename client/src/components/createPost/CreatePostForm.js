import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { createPost } from '../../actions/postsActions';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../actions/flashMessages.js';
//import PropTypes from 'prop-types'

class CreatePostForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      imageURL: '',
      userID: this.props.id,
      username: this.props.username,
      isLoading: false
    };
    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    console.log('submit event');
    this.props.createPost(this.state).then(() => {
    	console.log('pre-add flash');
      this.props.addFlashMessage({
        type: this.props.message.messageType,
        text: this.props.message.messageMessage
      });
    });
  }

  render() {
    const { imageURL, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1> Create a Post... </h1>
        <TextFieldGroup
          field="imageURL"
          label="Image URL:"
          name="imageURL"
          value={imageURL}
          onChange={this.onChange}
          />
        <button type="submit" disabled={isLoading} className="btn btn-primary">Add</button>
      </form>
    );
  }
}

/*CreatePostForm.propTypes = {
  createPost: PropTypes.func.isRequired
}*/

function mapStateToProps(state) {
    return {
      id: state.auth.user.id,
      username: state.auth.user.username,
      message: state.postsReducer.message
    }
}

export default connect(mapStateToProps, {createPost, addFlashMessage})(CreatePostForm);
