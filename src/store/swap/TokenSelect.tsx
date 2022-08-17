import {createSlice} from "@reduxjs/toolkit";

// Define a type for the slice state
interface TokenSelectorState {
  value: boolean
}

const initialState: TokenSelectorState = {value:false};

// create action and reducer
const tokenSelectSlice = createSlice({
    name:"tokenSelect",
    initialState: initialState,
    reducers:{
        setVisiable: state => {
            console.log("setVisiable");
            state.value = true;
        },
        setInVisiable: state => {
            console.log("setInVisiable");
            state.value = false;
        }
    }
})

// action
export const {setVisiable,setInVisiable} = tokenSelectSlice.actions;

export default tokenSelectSlice.reducer;
