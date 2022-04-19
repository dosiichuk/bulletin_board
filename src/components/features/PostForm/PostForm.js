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
import { addPostFormSchema } from '../../../schemas/addPostSchema';
import { createPostRequest } from '../../../redux/postsRedux';
import styles from './PostForm.module.scss';
import { getUserId } from '../../../redux/authRedux';

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

const Component = ({ formTitle, action, authorId, ...props }) => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(addPostFormSchema) });
  const classes = useStyles();
  const imagePickerRef = useRef();
  const onSubmitHandler = (data, e) => {
    e.preventDefault();
    console.log({ ...data, author: authorId, status: 'published' }, e);
    reset();
    console.log('submitted');
    action({ ...data, author: authorId, status: 'published' });
    history.push('/');
  };
  const pickImage = e => {
    imagePickerRef.current.click();
  };
  return (
    <Container className={classes.container}>
      <div className={clsx(styles.root)}>
        <h2>{formTitle}</h2>
        <form
          className={classes.root}
          autoComplete='off'
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className={classes.image}>
            <input ref={imagePickerRef} type='file' className={classes.imagePicker} />
            <div className={classes.imageContainer}>
              <img
                src={`${process.env.PUBLIC_URL}/images/header4.jpg`}
                alt='image'
                className={classes.image}
              />
            </div>
            <Button onClick={pickImage} className={classes.button}>
              Pick image
            </Button>
          </div>
          <div className={classes.entry}>
            <TextField
              id='outlined-disabled'
              label='Author:'
              variant='outlined'
              defaultValue={props.author || ''}
              {...register('author')}
            />
          </div>
          <div className={classes.entry}>
            <TextField
              id='outlined-disabled'
              label='Email:'
              defaultValue={props.email || ''}
              variant='outlined'
              {...register('email')}
            />
          </div>

          <div className={classes.entry}>
            <TextField
              required
              id='outlined-required'
              label='Title:'
              defaultValue={props.title || ''}
              variant='outlined'
              {...register('title')}
            />
            <small className={errors.title ? classes.errorMessage : ''}>
              {errors.title?.message}
            </small>
          </div>
          <div className={classes.entry}>
            <TextField
              required
              id='outlined-required'
              label='Price:'
              defaultValue={props.price || ''}
              variant='outlined'
              {...register('price')}
            />
            <small className={errors.price ? classes.errorMessage : ''}>
              {errors.price?.message}
            </small>
          </div>
          <div className={classes.entry}>
            <TextField
              required
              id='outlined-required'
              label='Location:'
              defaultValue={props.location || ''}
              variant='outlined'
            />
          </div>
          <div className={classes.entry}>
            <TextField
              id='outlined-multiline-static'
              label='Summary:'
              multiline
              minRows={2}
              defaultValue={props.summary || ''}
              variant='outlined'
              {...register('summary')}
            />
            <small className={errors.summary ? classes.errorMessage : ''}>
              {errors.summary?.message}
            </small>
          </div>
          <div className={classes.entry}>
            <TextField
              id='outlined-multiline-static'
              label='Description:'
              multiline
              minRows={6}
              defaultValue={props.content || ''}
              variant='outlined'
              {...register('content')}
            />
            <small className={errors.content ? classes.errorMessage : ''}>
              {errors.content?.message}
            </small>
          </div>
          <Button type='submit' color='primary' className={classes.button}>
            {formTitle}
          </Button>
        </form>
      </div>
    </Container>
  );
};

Component.propTypes = {};

const mapStateToProps = state => ({
  authorId: getUserId(state),
});

const ContainerComponent = connect(mapStateToProps)(Component);

export { ContainerComponent as PostForm, Component as PostFormComponent };
