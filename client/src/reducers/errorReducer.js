import * as types from "../actions/types";
const intialState = {};
const errorReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};
export default errorReducer;
