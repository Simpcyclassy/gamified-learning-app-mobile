import {combineReducers} from 'redux';

import {
  UPDATE_CATEGORIES,
  UPDATE_QUIZ,
  UPDATE_TIMER,
  UPDATE_STATE,
  UPDATE_SETTINGS,
  UPDATE_QUIZ_RESULT,
} from './actions';

const merge = (prev, next) => Object.assign({}, prev, next);

const categoriesReducer = (state = [], action) => {
  if (action.type === UPDATE_CATEGORIES) {
    return [...state, ...action.payload];
  }
  return state;
};

const quizReducer = (state = {}, action) => {
  if (action.type === UPDATE_QUIZ) {
    return merge(state, action.payload);
  }
  return state;
};

const timerReducer = (state = {}, action) => {
  if (action.type === UPDATE_TIMER) {
    return merge(state, action.payload);
  }
  return state;
};

const stateReducer = (state = {}, action) => {
  if (action.type === UPDATE_STATE) {
    return merge(state, action.payload);
  }
  return state;
};

const settingsReducer = (state = {}, action) => {
  if (action.type === UPDATE_SETTINGS) {
    return merge(state, action.payload);
  }
  return state;
};

const quizResultReducer = (state = {}, action) => {
  if (action.type === UPDATE_QUIZ_RESULT) {
    return merge(state, action.payload);
  }
  return state;
};

const reducer = combineReducers({
  categories: categoriesReducer,
  quiz: quizReducer,
  timer: timerReducer,
  state: stateReducer,
  settings: settingsReducer,
  quizResult: quizResultReducer,
});

export default reducer;
