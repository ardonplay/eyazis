import { ApiResponse, serverApi } from "@/api";
import {
  configureStore,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import fileDownload from "js-file-download";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

interface AppSliceState {
  text?: string;
  highlightedText: string[]
  isHelpMode: boolean;
  parsedText?: ApiResponse;
  searchWord?: string
}

export const ENTITY_PER_PAGE = 15;

const initialState = {
  text: undefined,
  highlightedText: [],
  isHelpMode: false,
  parsedText: undefined,
} as AppSliceState;

export const fetchForAnalyse = createAsyncThunk<
  { text: string; response: ApiResponse },
  { text: string },
  { dispatch: any }
>(
  "case/fetchForAnalyse",
  async ({ text }) => {
    const response = await serverApi.fetchForAnalyse(text);
    return { text, response };
  },
);


function createRegExp(word: string) {
    return new RegExp(`(?:^|\\.|\\?|\\!)(.*?\\b${word}\\b.*?)(?:[\\.\\?\\!]|$)`, 'gmi');
    // return new RegExp(`((?:^|\.\s*|[\?\!])\s*([^\.]*?\b(?:${word})\b[^\.]*?)[\.\!\?])`, 'gm');
    // const regex = new RegExp(`((?:^|\.\s*|[\?\!])\s*([^\.]*?\b(?:${word})\b[^\.]*?)[\.\!\?])`, 'gm')
    // return /(?:^|\.|\?|\!)\s*([^\.]*?\b(?:the)\b[^\.]*?)[\.!\?]/
}

const fineMatchings = (word: string, text: string): string[] =>  {
    var re = new RegExp(`\\b${word}\\b`  ?? 'kek', 'g');
    
    return text
      .split('.').join(',')
      .split('!').join(',')
      .split('?').join(',')
      .split(',').join(',')
      .split(';').join(',')
      .split(':').join(',')
      .split('(').join(',')
      .split(')').join(',')
      .split('[').join(',')
      .split(']').join(',')
      .split('|').join(',')
      .split(',')
      .filter(str => re.test(str.toLowerCase()))
}

const caseSlice = createSlice({
  name: "case",
  initialState,
  reducers: {
    findMatchings: (state, action: PayloadAction<{word: string}>) => {
        console.log('action: ', action)
        console.log('hig: ', state.highlightedText)
        if (state.searchWord === action.payload.word) {
            state.highlightedText = []
            state.searchWord = undefined
        } else {
            state.searchWord = action.payload.word
            state.highlightedText = fineMatchings(action.payload.word, state.text!)


            // const matches  = createRegExp(action.payload.word).exec(state.text!)
            // if (matches) {
            //     state.highlightedText = [ matches[1] ]
            // }
            
        }

    },
    downloadCurrent: (state) => {
        const { text, parsedText } = state
        const data = {
            text,
            response: parsedText
        }

        fileDownload(JSON.stringify(data), 'result.txt')
    },
    changeHelpMode: (state, action: PayloadAction<boolean>) => {
      state.isHelpMode = action.payload;
    },
    changeResponseData: (state, action: PayloadAction<ApiResponse>) => {
      state.parsedText = action.payload;
    },
    loadParsedText: (
      state,
      action: PayloadAction<{ text: string; response: ApiResponse }>,
    ) => {
      state.text = action.payload.text
      state.parsedText = action.payload.response;
    },
    clearResponseData: (state) => {
      state.parsedText = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchForAnalyse.fulfilled, (state, action) => {
      state.text = action.payload.text;
      state.parsedText = action.payload.response;
    });
  },
});

export const { changeResponseData, clearResponseData, changeHelpMode, downloadCurrent, loadParsedText, findMatchings } =
  caseSlice.actions;

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
