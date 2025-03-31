import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice ({
    name: 'notification',
    initialState,
    reducers: {
        setNoti(state,action){
            state = action.payload.content
            return state
        },
        clearNoti(state,action){
            state = action.payload.content
            return state
        },
    }
})

export default notificationSlice.reducer