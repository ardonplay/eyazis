import { configureStore, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import fileDownload from "js-file-download";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export interface ApiResponse {
  nodes: {
    id: string
    name: string
    val: number
  }[]
  links: {
    source: string
    target: string
  }[]
}

interface AppSliceState {
  text?: string;
  isHelpMode: boolean;
  parsedNodes?: ApiResponse
}

export const ENTITY_PER_PAGE = 15;


export const fetchForAnalyse = createAsyncThunk<
  { text: string; response: ApiResponse },
  { text: string }
>(
  "case/fetchForAnalyse",
  async ({ text }) => {
    const response = await (await fetch(`http://localhost:8000/api/v1/lr4?text=${text}`)).json();
    return { text, response };
  },
);

const initialState = {
  isHelpMode: false,
} as AppSliceState;

const caseSlice = createSlice({
  name: "case",
  initialState,
  reducers: {
    
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
  },

  extraReducers(builder) {
    builder.addCase(fetchForAnalyse.fulfilled, (state, action) => {
      state.parsedNodes = action.payload.response
      // state.text = action.payload.text
    })
  }
});

export const {
  changeHelpMode,
  downloadCurrent,
  loadText
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
