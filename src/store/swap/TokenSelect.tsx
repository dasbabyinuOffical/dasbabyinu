import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TokenInfo {
  name: string;
  symbol: string;
  contract: string;
  balance: string;
  value: string;
  visibility: boolean;
}

// Define a type for the slice state
interface TokenSelectorState {
  inputToken: TokenInfo;
  outputToken: TokenInfo;
  settings: boolean;
  recentTx: boolean;
  txList: string[];
  speed: string;
  slipper: number;
  deadline: number;
}

const initialState: TokenSelectorState = {
  settings: false,
  recentTx: false,
  txList: [],
  speed: "Standard",
  slipper: 0.1,
  deadline: 20,
  inputToken: {
    name: "BNB",
    symbol: "BNB",
    contract: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    balance: "0.0",
    value: "0.0",
    visibility: false,
  },
  outputToken: {
    name: "DasBaby",
    symbol: "DasBabyInu",
    contract: "0x8e849671C0516Fd9A74075F2349A78390D52aa28",
    balance: "0.0",
    value: "0.0",
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
    setRecentTxVisiable: (state) => {
      state.recentTx = true;
    },
    setRecentTxInVisiable: (state) => {
      state.recentTx = false;
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
    setSelectedSpeed: (state, action: PayloadAction<string>) => {
      state.speed = action.payload;
    },
    setSelectedSlipper: (state, action: PayloadAction<number>) => {
      state.slipper = action.payload;
    },
    setSelectedDeadline: (state, action: PayloadAction<number>) => {
      state.deadline = action.payload;
    },
    setSelectedTxList: (state, action: PayloadAction<string[]>) => {
      state.txList = action.payload;
    },
  },
});

// action
export const {
  setSettingsVisiable,
  setSettingsInVisiable,
  setRecentTxVisiable,
  setRecentTxInVisiable,
  setInputTokenVisiable,
  setOutputTokenVisiable,
  setInputTokenInVisiable,
  setOutputTokenInVisiable,
  setInputToken,
  setOutputToken,
  setSelectedSpeed,
  setSelectedSlipper,
  setSelectedDeadline,
  setSelectedTxList,
} = tokenSelectSlice.actions;

export default tokenSelectSlice.reducer;
