import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getLoginStatus, getRole } from '../../../redux/authRedux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';

import styles from './Navbar.module.scss';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary[800],
  },
  appBar: {
    backgroundColor: theme.palette.primary[800],
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    color: theme.palette.primary[100],
    backgroundColor: theme.palette.primary[800],
  },
}));

const Component = ({ role, loginStatus }) => {
  const classes = useStyles();
  return (
    <AppBar position='static' className={classes.appBar}>
      <Container maxWidth='lg'>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <CardGiftcardIcon />
          </IconButton>
          <Typography variant='h6' className={clsx(classes.title, styles.navTitle)}>
            Bulletin Board
          </Typography>
          {!loginStatus && <Button color='inherit'>Login</Button>}
          {loginStatus && (
            <>
              <Button color='inherit'>My offers</Button>{' '}
              <Button color='inherit'>Logout</Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Component.propTypes = {
  loginStatus: PropTypes.bool.isRequired,
  role: PropTypes.oneOf(['admin', 'user']),
};

const mapStateToProps = state => ({
  loginStatus: getLoginStatus(state),
  role: getRole(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const ContainerComponent = connect(mapStateToProps)(Component);

export { ContainerComponent as Navbar, Component as NavbarComponent };
