import { combineReducers } from 'redux';

import {
  SET_FILTER,
  SET_MOVIES,
  SET_USER,
  SET_FAVORITES,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  SET_DIRECTORS,
  SET_GENRES,
} from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}
function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function user(state = '', action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

function favorites(state = [], action) {
  switch (action.type) {
    case SET_FAVORITES:
      return [...action.value];
    case ADD_FAVORITE:
      return [...state, action.value];
    case REMOVE_FAVORITE:
      return state.filter((id) => id !== action.value);
    default:
      return state;
  }
}

function genres(state = [], action) {
  switch (action.type) {
    case SET_GENRES:
      return action.value;
    default:
      return state;
  }
}

function directors(state = [], action) {
  switch (action.type) {
    case SET_DIRECTORS:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
  favorites,
  directors,
  genres,
});

export default moviesApp;
