import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({text, statistic}) => (
  <tr>
    <td>{text}:</td>
    <td>{statistic}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {

  if (good > 0 | neutral > 0 | bad > 0) {
    return(
      <div>
        <table>
          <tbody>
            <StatisticLine text="good" statistic={good} />
            <StatisticLine text="neutral" statistic={neutral} />
            <StatisticLine text="bad" statistic={bad}/>
            <StatisticLine text="all" statistic={good + neutral + bad} />
            <StatisticLine text="average" statistic={Math.round((good * 1 + neutral * 0 + bad * -1) / (good + bad + neutral) * 10)/10} />
            <StatisticLine text="positive" statistic={Math.round(100 * good / (good + neutral + bad) * 10) / 10 + " %"} />
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <p>No feedback given</p>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = (newValue) => {
    console.log("Good set")
    setGood(newValue)
  }
  const setToNeutral = (newValue) => {
    console.log("Neutral set")
    setNeutral(newValue)
  }

  const setToBad = (newValue) => {
    console.log("Bad set")
    setBad(newValue)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setToGood(good + 1)} text="Good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="Bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App