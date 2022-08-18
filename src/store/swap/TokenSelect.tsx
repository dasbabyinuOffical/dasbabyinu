import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TokenInfo {
  name: string;
  symbol: string;
  contract: string;
  balance: string;
  visibility: boolean;
}

// Define a type for the slice state
interface TokenSelectorState {
  inputToken: TokenInfo;
  outputToken: TokenInfo;
  settings: boolean;
}

const initialState: TokenSelectorState = {
  settings: false,
  inputToken: {
    name: "BNB",
    symbol: "BNB",
    contract: "BNB",
    balance: "0.0",
    visibility: false,
  },
  outputToken: {
    name: "DasBaby",
    symbol: "DasBabyInu",
    contract: "DasBaby",
    balance: "0.0",
    visibility: false,
  },
};

// create action and reducer
const tokenSelectSlice = createSlice({
  name: "tokenSelect",
  initialState: initialState,
  reducers: {
    setSettingsVisiable: (state) => {
      state.settings = true;
    },
    setSettingsInVisiable: (state) => {
      state.settings = false;
    },
    setInputTokenVisiable: (state) => {
      state.inputToken.visibility = true;
    },
    setOutputTokenVisiable: (state) => {
      state.outputToken.visibility = true;
    },
    setInputTokenInVisiable: (state) => {
      state.inputToken.visibility = false;
    },
    setOutputTokenInVisiable: (state) => {
      state.outputToken.visibility = false;
    },
    setInputToken: (state, action: PayloadAction<TokenInfo>) => {
      state.inputToken = action.payload;
    },
    setOutputToken: (state, action: PayloadAction<TokenInfo>) => {
      state.outputToken = action.payload;
    },
  },
});

// action
export const {
  setSettingsVisiable,
  setSettingsInVisiable,
  setInputTokenVisiable,
  setOutputTokenVisiable,
  setInputTokenInVisiable,
  setOutputTokenInVisiable,
  setInputToken,
  setOutputToken,
} = tokenSelectSlice.actions;

export default tokenSelectSlice.reducer;
