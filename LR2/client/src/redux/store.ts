import { ApiResponse, serverApi } from "@/api"
import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

interface AppSliceState {
    isHelpMode: boolean
    parsedText?: ApiResponse
}

export const ENTITY_PER_PAGE = 15

const initialState = {
    isHelpMode: false,
    parsedText: undefined
} as AppSliceState


export const fetchForAnalyse = (text: string) => (dispatch: AppDispatch) => {
    serverApi.fetchForAnalyse(text).then(data => dispatch(changeResponseData(data)))
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        changeHelpMode: (state, action: PayloadAction<boolean>) => {
            state.isHelpMode = action.payload
        },
        changeResponseData: (state, action: PayloadAction<ApiResponse>) => {
            state.parsedText = action.payload
        },
        clearResponseData: (state) => {
            state.parsedText = undefined
        }
    }
})

export const { changeResponseData, clearResponseData, changeHelpMode} = playerSlice.actions

// types configuration
export const store = configureStore({ reducer: playerSlice.reducer })
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector