import { configureStore,ThunkAction, Action } from "@reduxjs/toolkit";
import tokenSelectorReducer from "./swap/TokenSelect";

// store
const  store = configureStore({
  reducer: {
    tokenSelect: tokenSelectorReducer,
  },
});

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
