import { useState } from 'react'

const DisplayBold = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const DisplayStat = ({ text, val, symbol }) => {
  const displayVal = Number.isNaN(val) ? 0 : val

  return (
    <tr>
      <td>{text}</td>
      <td>{displayVal} {symbol}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  if (total === 0) {
    return (
      <>
        <DisplayBold text='Statistics' />
        <div>No feedback given</div>
      </>
    )
  }

  return (
    <>
      <DisplayBold text='Statistics' />
      <table>
        <tbody>
          <DisplayStat text='good' val={good} />
          <DisplayStat text='neutral' val={neutral} />
          <DisplayStat text='bad' val={bad} />
          <DisplayStat text='all' val={total} />
          <DisplayStat text='average' val={(good - bad) / total} />
          <DisplayStat text='positive' val={(good / total) * 100} symbol='%' />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <DisplayBold text='Give Feedback' />
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
