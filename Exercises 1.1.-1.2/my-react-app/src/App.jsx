import { useState } from 'react'

const Button = ({onClick,text}) => {
return <button onClick={onClick}> {text}</button>
}

const Statistics = ({text,num}) => {
  return (<tr>
    <td>
       {text} {num}
    </td>
  </tr>)
}

const Display = ({anecdotes,index}) => {
 return <p>{anecdotes} </p>
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // const [total, setTotal] = useState(0)

  const total = good + neutral + bad;
  const avg = ((good / (total)) * 100).toFixed(2)


  

  const handleGood = () => {
      const oldTotal = total
      const newGood = good + 1
      setGood(newGood)
      
  }
  const handleNeutral = () => {
      const oldTotal = total
      const newNeutral = neutral + 1
      setNeutral(newNeutral)
      
  }
  const handleBad = () => {
      const oldTotal = total
      const newBad = bad + 1
      setBad(newBad)
      
  }

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const rdmQuote = () => {
    let rng = Math.floor(Math.random() * anecdotes.length)
    setSelected(rng)
    
  }

  const [selected, setSelected] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleGood} text={'good'} />
      <Button onClick={handleNeutral} text={'neutral'} />
      <Button onClick={handleBad} text={'bad'} />
      <h1>Statistics</h1>
      {total === 0 ? (<p>No feedback given</p>) : (
        <>
        <table>
          <tbody>
            <Statistics text={"good"} num={good}/>
            <Statistics text={"Neutral"} num={neutral}/>
            <Statistics text={"bad"} num={bad}/>
            <Statistics text={"Total"} num={total}/>
            <Statistics text={"positive"} num={avg} />
          </tbody>
        </table>
        </>

      )}
        <Button onClick={rdmQuote} text={'Next anecdote'}/>
      <Display anecdotes={anecdotes[selected]} />


    </div>
  )
}

export default App