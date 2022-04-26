import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getLoginStatus } from '../../../redux/authRedux';
import { AllPosts } from '../../features/AllPosts/AllPosts';
import styles from './MyPosts.module.scss';

const Component = ({ loginStatus }) => (
  <div className={clsx(styles.root)}>
    <div className={styles.pageHeading}>
      <h2 className={styles.pageTitle}>My Posts</h2>
    </div>
    {loginStatus && <AllPosts onlyMyPosts={true} />}
  </div>
);

Component.propTypes = {
  loginStatus: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loginStatus: getLoginStatus(state),
});

const Container = connect(mapStateToProps)(Component);

export { Container as MyPosts, Component as MyPostsComponent };
