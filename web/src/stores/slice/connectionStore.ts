import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

interface HomeStoreProps {
  loading: boolean;
  connectionKey: string | null;
}

const initialState: HomeStoreProps = {
  loading: false,
  connectionKey: null,
};

export const ConnectionStoreSlice = createSlice({
  name: "connectionStore",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setConnectionKey: (state, action: PayloadAction<string>) => {
      state.connectionKey = action.payload;
    },
  },
});

export const { setLoading, setConnectionKey } = ConnectionStoreSlice.actions;

export const connectionLoading = (state: RootState) =>
  state.connectionStore.loading;
export const connectionKey = (state: RootState) =>
  state.connectionStore.connectionKey;

export default ConnectionStoreSlice.reducer;
