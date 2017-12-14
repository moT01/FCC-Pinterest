import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { createPost } from '../../actions/postsActions';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../actions/flashMessages.js';
import checkImage from 'image-check';
//import PropTypes from 'prop-types'

class CreatePostForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      imageURL: '',
      defaultImage: 'https://goo.gl/yNUY3G',
      userID: this.props.id,
      username: this.props.username,
      isLoading: false,
      sendable:false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
    if(this.checkForImage(e.target.value) && this.isURL(e.target.value)){
      this.validate(e.target.value);
    }else{
      this.setState({defaultImage: "https://goo.gl/yNUY3G", sendable: false});
    }
  }

  //checks for valid image
  validate(URL, state){
    checkImage(URL).then((data) => {
        this.setState({defaultImage: URL, sendable: true});
    }).catch((err) => {
      //error handeling
        this.setState({defaultImage: "https://goo.gl/yNUY3G", sendable: false});
    });
  }

  //checks if it is an image
  checkForImage(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  //checks if input is a url
  isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?'+ // port
    '(\\/[-a-z\\d%@_.~+&:]*)*'+ // path
    '(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
  }
  onSubmit(e) {
  	 console.log('submit create post form');
    e.preventDefault();
    this.props.createPost(this.state).then(() => {
      this.props.addFlashMessage({
        type: "success",
        text: "picture added successfully"
      });
      this.setState({defaultImage: "https://goo.gl/yNUY3G", sendable: false, imageURL: '' });

    });
    console.log('end of submit create post form');
  }
  render() {
    const { imageURL, isLoading, sendable } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1> Create a Post... </h1>
        <img src={this.state.defaultImage} className="img-thumbnail" alt="Cinque Terre" width="304" height="236"/>
        <TextFieldGroup
          field="imageURL"
          label="Image URL:"
          name="imageURL"
          value={imageURL}
          onChange={this.onChange}
          />
        <button type="submit" disabled={isLoading || !sendable} className="btn btn-primary">Add</button>
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
