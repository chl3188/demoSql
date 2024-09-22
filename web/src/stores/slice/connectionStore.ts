import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { IResConnection } from "../../apis/connection/connection.types";

interface HomeStoreProps {
  loading: boolean;
  connectionInfo: IResConnection | null;
}

const initialState: HomeStoreProps = {
  loading: false,
  connectionInfo: null,
};

export const ConnectionStoreSlice = createSlice({
  name: "connectionStore",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setConnection: (state, action: PayloadAction<IResConnection | null>) => {
      state.connectionInfo = action.payload;
    },
  },
});

export const { setLoading, setConnection } = ConnectionStoreSlice.actions;

export const connectionLoading = (state: RootState) =>
  state.connectionStore.loading;
export const connectionInfo = (state: RootState) =>
  state.connectionStore.connectionInfo;

export default ConnectionStoreSlice.reducer;
