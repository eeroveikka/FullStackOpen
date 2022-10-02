import { useState } from 'react'

const BestAnecdote = ({maxInd, anecdotes}) => {
  if (maxInd > -1) {
    return(
      <div>
        {anecdotes[maxInd]}
      </div>
    )
  }
  return(
    <div>
      No votes yet
    </div>
  )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const randInd = () => {
    return(Math.floor(Math.random() * anecdotes.length))
  }

  const getUpdatedPoints = () => {
    const copy = [...points]
    copy[selected] += 1
    return(copy)
  }

  const getMax = () => {

    const maxValue = Math.max(...points)

    if (maxValue > 0) {
      return(points.indexOf(maxValue))
    }

    return(-1)

  }

  const setToSelected = (newValue) => () => {
    setSelected(newValue)
  }

  const setToPoints = (newPoints) => () => {
    setPoints(newPoints)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <button onClick={setToPoints(getUpdatedPoints)}>vote</button>
      <button onClick={setToSelected(randInd)}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <BestAnecdote maxInd={getMax()} anecdotes={anecdotes}></BestAnecdote>
    </div>
  )
}

export default App
