import { useSelector, useDispatch } from 'react-redux'


const AnecdotesForm = () => {

    const dispatch = useDispatch()

    const addAnecdote = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
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