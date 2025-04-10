
import { createSlice } from "@reduxjs/toolkit"


const anecdotesAtStart = []

// const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    // id: getId(),
    votes: 0
  }
}


const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
      const id = action.payload.id
      const anecdoteToChange = state.find(e => e.id === id)
      const anecdotePlusVote = {...anecdoteToChange , votes: anecdoteToChange.votes + 1}
      return state.map(anecdote => anecdote.id === id ? anecdotePlusVote : anecdote)
    },
    createAnecdote(state, action) {
      const content = asObject(action.payload)
      state.push(content)

    },
    appendAnecdote(state, action){
      state.push(action.payload.anecdote)
    },
    setAnecdote(state,action) {
      return action.payload.anecdotes
    }
  }


})


// export const { createAnecdotes, vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer