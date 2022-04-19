import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { PostForm } from '../PostForm/PostForm';
import { createPostRequest, getPostById } from '../../../redux/postsRedux';
import { getUserData, getUserId } from '../../../redux/authRedux';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    width: '70%',
  },
  root: {
    '& .MuiTextField-root': {
      width: '100%',
      margin: '1rem auto',
    },
  },
  media: {
    height: 140,
  },
  entry: {},
  button: {
    width: '40%',
    backgroundColor: '#1565c0',
    color: 'white',
    marginTop: '1rem',
  },
  imagePicker: {
    display: 'none',
  },
  imageContainer: {
    height: '40%',
    width: '100%',
  },
  image: {
    height: '100%',
    maxWidth: '100%',
  },
  errorMessage: {
    color: 'red',
  },
});

const Component = ({ children, createPost, author, email, post, ...props }) => {
  return (
    <PostForm
      formTitle='Edit your post'
      action={createPost}
      author={author}
      email={email}
      {...post}
    />
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
  author: getUserData(state).name,
  email: getUserData(state).email,
});

const mapDispatchToProps = dispatch => ({
  createPost: postData => dispatch(createPostRequest(postData)),
});

const ContainerComponent = connect(mapStateToProps, mapDispatchToProps)(Component);

export { ContainerComponent as EditPostForm, Component as EditPostFormComponent };
