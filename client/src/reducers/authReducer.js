import * as types from "../actions/types";
import isEmpty from "../utils/isempty";
const intialState = {
  isAuthenticate: false,
  user: {}
};
const authReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticate: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};
export default authReducer;
