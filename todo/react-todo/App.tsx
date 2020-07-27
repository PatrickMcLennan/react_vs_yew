import React, { useState, Dispatch, SetStateAction } from "react";

type State = {
  input: string;
  tasks: string[];
  error: boolean;
};

type SetState = Dispatch<SetStateAction<State>>;

function App(): JSX.Element {
  const [state, setState]: [State, SetState] = useState({
    input: ``,
    tasks: [],
    error: false,
  });

  const addTask: (e) => void = (e) => {
    e.preventDefault();
    const error = !state.input.length;

    return error
      ? setState((prevState) => ({ ...prevState, error }))
      : setState((prevState) => ({ ...prevState, input: ``, tasks: [...prevState.tasks, state.input], error: false }));
  };

  const removeAllTasks: () => void = () =>
    setState((prevState) => ({
      ...prevState,
      tasks: [],
    }));

  const removeTask: (i: number) => void = (badIndex: number) =>
    setState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter((_task, i) => i !== badIndex),
    }));

  return (
    <div className="background">
      <form className="form" onSubmit={addTask}>
        <label className={state.error ? "label-error" : "label"} htmlFor="task">
          <span className="span">
            Enter your Task: <sup className="sup">*</sup>
          </span>
          <input
            aria-label="Enter your task"
            className="input"
            name="task"
            onChange={({ target: { value } }) =>
              setState((prevState) => ({
                ...prevState,
                input: value,
              }))
            }
            title="Enter your task"
            type="text"
            value={state.input}
          />
        </label>
        <input className="submit" type="submit" value="Save" />
      </form>
      <ul className="ul">
        {state.tasks.map((task, i) => (
          <li className="li" key={`${task}-${i}`}>
            {task}
            <button className="button" onClick={(_) => removeTask(i)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {state.tasks.length >= 1 && (
        <button className="delete-all" onClick={removeAllTasks}>
          Delete All
        </button>
      )}
    </div>
  );
}

export default App;
