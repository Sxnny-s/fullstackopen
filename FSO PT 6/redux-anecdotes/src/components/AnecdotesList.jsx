import { useSelector, useDispatch } from 'react-redux'


const AnecdotesList = () => {
    let anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    anecdotes = anecdotes.filter(e => e.content.includes(filter))
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
      {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
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