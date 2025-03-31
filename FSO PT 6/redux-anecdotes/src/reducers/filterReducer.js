
import { createSlice } from "@reduxjs/toolkit"

const initialState = ''


const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers:{
        setFilter(state, action){
            state = action.payload.filter
            return state
        }
    }
})
// export const {setFilter} = filterSlice.actions
export default filterSlice.reducer