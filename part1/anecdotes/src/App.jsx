import { useState } from "react";

const randomInt = (maxi) => {
  return Math.floor(Math.random() * maxi);
};

const Heading1 = ({ text }) => <h1>{text}</h1>;

const DisplayVotes = ({ count }) => <p>has {count} votes</p>;

const App = () => {
  const anecdotes = [
    
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const len = anecdotes.length;

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(len).fill(0));

  const maxVoteIdx = votes.indexOf(Math.max(...votes));

  const handleVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  console.log(votes[maxVoteIdx]);
  return (
    <div>
      <Heading1 text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <DisplayVotes count={votes[selected]} />
      <button onClick={handleVote}>Vote</button>
      <button onClick={() => setSelected(randomInt(len))}>Next Anecdote</button>

      <Heading1 text="Anecdote with most Votes" />
      <p>{anecdotes[maxVoteIdx]}</p>
      <DisplayVotes count={votes[maxVoteIdx]} />
    </div>
  );
};

export default App;
