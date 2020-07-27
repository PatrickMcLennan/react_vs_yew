import React, { useState, Dispatch, SetStateAction, FormEventHandler, FormEvent } from "react";

type State = {
  error: boolean;
  guess: string;
  guesses: string[];
  remainingGuesses: number;
  word: string;
  message: string;
  gameState: "IN_PROGRESS" | `WON` | `LOST`;
};

type SetState = Dispatch<SetStateAction<State>>;

const WORDS: string[] = [`react`, `typescript`, `javascript`, `hangman`, `rust`];
const startingState: () => State = () => ({
  error: false,
  guess: ``,
  guesses: [],
  remainingGuesses: 5,
  word: WORDS[Math.floor(Math.random() * WORDS.length)],
  message: ``,
  gameState: `IN_PROGRESS`,
  gameWon: false,
  gameLost: false,
});

function App(): JSX.Element {
  const [state, setState]: [State, SetState] = useState(startingState());

  const handleSubmit: FormEventHandler = (e: FormEvent) => {
    e.preventDefault();
    if (state.error || !state.guess.length) return;
    if (state.guesses.includes(state.guess.trim().toLowerCase()))
      return setState((prevState) => ({
        ...prevState,
        error: false,
        guess: ``,
        message: `You have already guessed ${state.guess}`,
      }));
    else {
      const correctGuess = state.word.includes(state.guess.trim().toLowerCase());
      const playerHasWon =
        correctGuess &&
        state.word.split("").filter((letter: string) => state.guesses.includes(letter)).length ===
          state.word.length - 1;
      const playerHasLost = !correctGuess && state.remainingGuesses === 1;

      if (playerHasWon || playerHasLost)
        return playerHasWon
          ? setState((prevState) => ({
              ...prevState,
              error: false,
              guess: ``,
              gameState: `WON`,
              guesses: [...prevState.guesses, prevState.guess],
              message: `You've won!  Your word was ${prevState.word}`,
            }))
          : setState((prevState) => ({
              ...prevState,
              error: false,
              guess: ``,
              gameState: `LOST`,
              remainingGuesses: 0,
              message: `You're out of guesses -- your word was ${prevState.word}.  Please play again!`,
            }));

      if (correctGuess)
        return setState((prevState) => ({
          ...prevState,
          error: false,
          guess: ``,
          guesses: [...prevState.guesses, prevState.guess],
          message: `${prevState.guess} was correct`,
        }));

      if (!correctGuess)
        return setState((prevState) => ({
          ...prevState,
          error: false,
          guess: ``,
          guesses: [...prevState.guesses, prevState.guess],
          remainingGuesses: prevState.remainingGuesses - 1,
          message: `${prevState.guess} was incorrect`,
        }));
    }
  };

  return (
    <div className="container align-middle background text-center">
      <div className="word-display mx-auto mt-5 mb-2 w-50 text-center">
        {state.word.split("").map((letter: string, i: number) => (
          <span className={i === state.word.length - 1 ? "letter" : "letter mr-2"} key={`${i}-${letter}`}>
            {state.guesses.includes(letter) ? letter : `_`}
          </span>
        ))}
      </div>
      <span className="remaining-guesses my-2 text-center">Remaining Guesses: {state.remainingGuesses}</span>
      <form className="mt-3 mb-2" onSubmit={handleSubmit}>
        <fieldset className="form-row align-items-center w-25 mx-auto" disabled={state.gameState !== `IN_PROGRESS`}>
          <label className="label" htmlFor="guess">
            Enter a letter: <sup className={state.error ? "sup text-danger" : "sup"}>*</sup>
          </label>
          <input
            autocomplete="off"
            className="form-control mb-3"
            name="guess"
            type="text"
            onChange={({ target: { value } }) =>
              setState((prevState) => ({
                ...prevState,
                guess: value,
                error: state.guess.length + value.length > 1,
              }))
            }
            value={state.guess}
          />
          <input
            type="submit"
            className={state.error ? "btn btn-block btn-danger" : "btn btn-block btn-primary"}
            value={state.error ? `${state.guess} is invalid` : `Guess ${state.guess}`}
          />
        </fieldset>
      </form>
      {state.message.length >= 1 && <small className="form-text text-muted">{state.message}</small>}
      {state.gameState !== `IN_PROGRESS` && (
        <button
          className={state.gameState === `WON` ? "btn btn-success my-2" : "btn btn-danger my-2"}
          onClick={() => setState(startingState())}
        >
          Play Again
        </button>
      )}
    </div>
  );
}

export default App;
