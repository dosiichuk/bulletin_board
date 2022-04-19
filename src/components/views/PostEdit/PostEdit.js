import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { EditPostForm } from '../../features/EditPostForm.js/EditPostForm';
import { getPostById } from '../../../redux/postsRedux';

import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostEdit.module.scss';

const Component = ({ className, post }) => (
  <div className={clsx(className, styles.root)}>
    <EditPostForm post={post} />
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
  post: getPostById(state, ownProps.match.params.id),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export { Container as PostEdit, Component as PostEditComponent };
