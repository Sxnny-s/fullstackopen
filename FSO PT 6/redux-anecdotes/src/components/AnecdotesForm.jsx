import { useDispatch } from 'react-redux'
import anecdotes from '../services/anecdotes'


const AnecdotesForm = () => {

    const dispatch = useDispatch()

    const addAnecdote = async (e) => {
        e.preventDefault()
        const anecdote = e.target.anecdote.value
        e.target.anecdote.value = ''
        const content = await anecdotes.createNew(anecdote)
        dispatch({type: 'anecdotes/createAnecdote', payload: {content}})
    }
    
  return (
    <>
    <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
            <input name="anecdote" placeholder="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdotesForm