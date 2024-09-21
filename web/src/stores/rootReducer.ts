import { combineReducers } from "@reduxjs/toolkit";
import connectionStore from "./slice/connectionStore";

const rootReducer = combineReducers({
  connectionStore,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
