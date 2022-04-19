import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { PostForm } from '../PostForm/PostForm';
import { addPostFormSchema } from '../../../schemas/addPostSchema';
import { createPostRequest } from '../../../redux/postsRedux';
import styles from './AddPostForm.module.scss';
import { getUserData, getUserId } from '../../../redux/authRedux';

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

const Component = ({ children, createPost, author, email, ...props }) => {
  return (
    <PostForm
      formTitle='Publish ad'
      action={createPost}
      author={author}
      email={email}
    />
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  author: getUserData(state).name,
  email: getUserData(state).email,
});

const mapDispatchToProps = dispatch => ({
  createPost: postData => dispatch(createPostRequest(postData)),
});

const ContainerComponent = connect(mapStateToProps, mapDispatchToProps)(Component);

export { ContainerComponent as AddPostForm, Component as AddPostFormComponent };
