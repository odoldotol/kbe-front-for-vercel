import initialState from "./initialState";

// Action
const SET_TOKEN = "SET_TOKEN";
const UNSET_TOKEN = "UNSET_TOKEN";

// Action 생성 함수
export const setToken = (accessToken) => {
  return {
    type: SET_TOKEN,
    data: {
      accessToken,
    },
  };
};

export const unsetToken = () => {
  return {
    type: UNSET_TOKEN,
  };
};

// Reducer
function tokenReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        token: action.data.accessToken,
      };
    case UNSET_TOKEN:
      return {
        token: "",
      };
    default:
      return state;
  }
}

export default tokenReducer;
