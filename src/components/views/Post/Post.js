import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { connect } from 'react-redux';
import { getUserData } from '../../../redux/authRedux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Post.module.scss';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Component = ({ data, userData }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            {data.author.name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={data.title}
        subheader={data.publishedDate}
      />
      <CardMedia
        className={classes.media}
        image={`${process.env.PUBLIC_URL}/images/${data.photo}`}
        title='Paella dish'
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {data.summary}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Link to={`/post/${data._id}`}>See details</Link>
        {userData.loggedIn && userData.id === data.author._id && (
          <Link to={`/post/${data._id}/edit`}>Edit</Link>
        )}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>Content:</Typography>
          <Typography paragraph>{data.content}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

Component.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    summary: PropTypes.string.isRequired,
    publishedDate: PropTypes.string,
    updatedDate: PropTypes.string,

    author: PropTypes.object,
    status: PropTypes.oneOf(['published', 'draft', 'closed']),
    photo: PropTypes.string,
    price: PropTypes.number,
    phone: PropTypes.string,
    location: PropTypes.string,
  }),
};

const mapStateToProps = state => ({
  userData: getUserData(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export { Container as Post, Component as PostComponent };
