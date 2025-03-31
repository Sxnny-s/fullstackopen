import AnecdotesForm from './components/AnecdotesForm'
import AnecdotesList from './components/AnecdotesList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdotes from './services/anecdotes'
import { useEffect } from 'react'
import {useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    anecdotes.getAll().then(anecdotes => 
      dispatch({type: 'anecdotes/setAnecdote', payload: {anecdotes}})
    )
  
  },[])

  return (
    <div>
      <Filter/>
      <Notification/>
      <AnecdotesList/>
      <AnecdotesForm/>
    </div>
  )
}

export default App