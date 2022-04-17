import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { addPostFormSchema } from '../../../schemas/addPostSchema';
import styles from './AddPostForm.module.scss';

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

const Component = ({ className, children }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(addPostFormSchema) });
  const classes = useStyles();
  const imagePickerRef = useRef();
  const onSubmitHandler = data => {
    console.log(data);
    reset();
    console.log('submitted');
  };
  const pickImage = e => {
    imagePickerRef.current.click();
  };
  return (
    <Container className={classes.container}>
      <div className={clsx(className, styles.root)}>
        <h2>Add your advestisement / announcement</h2>
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
              disabled
              id='outlined-disabled'
              label='Author:'
              variant='outlined'
              value='author'
            />
          </div>
          <div className={classes.entry}>
            <TextField
              disabled
              id='outlined-disabled'
              label='Email:'
              defaultValue='Hello World'
              variant='outlined'
              {...register('email')}
            />
          </div>

          <div className={classes.entry}>
            <TextField
              required
              id='outlined-required'
              label='Title:'
              defaultValue='Hello World'
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
              // defaultValue='Hello World'
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
              defaultValue='Hello World'
              variant='outlined'
            />
          </div>
          <div className={classes.entry}>
            <TextField
              id='outlined-multiline-static'
              label='Summary:'
              multiline
              minRows={2}
              defaultValue='Default Value'
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
              defaultValue='Default Value'
              variant='outlined'
              {...register('content')}
            />
            <small className={errors.content ? classes.errorMessage : ''}>
              {errors.content?.message}
            </small>
          </div>
          <Button type='submit' color='primary' className={classes.button}>
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as AddPostForm,
  // Container as AddPostForm,
  Component as AddPostFormComponent,
};
