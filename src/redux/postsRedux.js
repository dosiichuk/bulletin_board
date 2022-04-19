import axios from 'axios';
import config from '../config';

/* selectors */
export const getAll = ({ posts }) => posts.data;
export const getPostById = ({ posts }, id) => posts.data.find(post => post._id == id);

export const getIsLoading = ({ posts }) => posts.loading.active;

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const CREATE_SUCCESS = createActionName('CREATE_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const createSuccess = payload => ({ payload, type: CREATE_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

/* thunk creators */
export const fetchPostsRequest = () => async (dispatch, getState) => {
  try {
    const postsDataIsEmpty = getAll(getState()).length === 0;
    const isLoading = getIsLoading(getState());
    if (postsDataIsEmpty && !isLoading) {
      dispatch(fetchStarted());
      const { data } = await axios.get(`${config.api.baseUrl}/posts`);
      if (data.length > 0) {
        dispatch(fetchSuccess(data));
      }
    }
    console.log('after', getAll(getState()));
  } catch (err) {
    dispatch(fetchError(err));
  }
};

export const createPostRequest = postData => async dispatch => {
  try {
    dispatch(fetchStarted());
    const response = await axios.post(`${config.api.baseUrl}/posts`, postData);
    console.log(response);
    if (response.statusText === 'OK') {
      dispatch(createSuccess(response.data));
    }
  } catch (err) {
    dispatch(fetchError(err));
  }
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case CREATE_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: [...statePart.data, action.payload],
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }

    default:
      return statePart;
  }
};
