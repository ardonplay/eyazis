import { ApiResponse } from "@/api";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import fileDownload from "js-file-download";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

interface AppSliceState {
  text?: string;
  splitedText?: string[];
  highlightedText: string[];
  isHelpMode: boolean;
  parsedText?: ApiResponse;
  searchWord?: string;
}

export const ENTITY_PER_PAGE = 15;

const initialState = {
  highlightedText: [],
  isHelpMode: false,
} as AppSliceState;

const caseSlice = createSlice({
  name: "case",
  initialState,
  reducers: {
    splitText: (state, action: PayloadAction<{ text: string }>) => {
      console.log(action.payload.text);
      if (action.payload.text && action.payload.text.length > 0) {
        console.log("text: ", action.payload.text);
        state.text = action.payload.text;
        state.splitedText = action.payload.text
          .split("!").join(".")
          .split("?").join(".")
          .split(";").join(".")
          .split("(").join(".")
          .split(")").join(".")
          .split("[").join(".")
          .split("]").join(".")
          .split("|").join(".")
          .split(".").filter((e) => e.trim().length > 0);
      } else {
        state.splitedText = undefined;
      }
    },
    downloadCurrent: (state) => {
      const { text } = state;
      const data = {
        text,
      };

      fileDownload(JSON.stringify(data), "save.txt");
    },
    changeHelpMode: (state, action: PayloadAction<boolean>) => {
      state.isHelpMode = action.payload;
    },
    loadText: (
      state,
      action: PayloadAction<{ text: string }>,
    ) => {
      console.log("action:", action.payload.text);
      state.text = action.payload.text;
    },
    clearResponseData: (state) => {
      state.parsedText = undefined;
    },
  },
});

export const {
  clearResponseData,
  changeHelpMode,
  downloadCurrent,
  loadText,
  splitText,
} = caseSlice.actions;

// types configuration
export const store = configureStore({ reducer: caseSlice.reducer });
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
