import initialState from "./initialState";

// Action
const SET_WALLET_ADDR = "SET_WALLET_ADDR";
const UNSET_WALLET_ADDR = "UNSET_WALLET_ADDR";

// Action 생성 함수
export const setWalletAddr = (walletAddr) => {
  return {
    type: SET_WALLET_ADDR,
    data: {
      walletAddr,
    },
  };
};

export const unsetWalletAddr = () => {
  return {
    type: UNSET_WALLET_ADDR,
  };
};

// Reducer
function walletReducer(state = initialState, action) {
  switch (action.type) {
    case SET_WALLET_ADDR:
      return {
        walletAddr: action.data.walletAddr,
      };
    case UNSET_WALLET_ADDR:
      return {
        walletAddr: "",
      };
    default:
      return state;
  }
}

export default walletReducer;
