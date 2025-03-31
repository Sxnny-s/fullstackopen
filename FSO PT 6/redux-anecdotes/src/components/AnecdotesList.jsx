import { useSelector, useDispatch } from 'react-redux'


const AnecdotesList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const filteredAnecdotes = anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

    const dispatch = useDispatch()
    
      const vote = (id,content) => {
    
        console.log('vote', id)
        dispatch({ type: 'anecdotes/vote', payload: {id} })

        dispatch({type: 'notification/setNoti', payload: {content}})

        setTimeout(() => {
          dispatch({type: 'notification/setNoti', payload: {content: ''}})
        },5000)
      }


  return (
    <>
     <h2>Anecdotes</h2>
      {filteredAnecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id,anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdotesList