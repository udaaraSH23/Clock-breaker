import React, { useState, useReducer, useEffect } from "react";
import "./App.css";

function Timer() {
  //timer start-session

const [minute,setMinute] = useState(25)

const minutesChange = () =>{
  if(minute==0&&sec==0){
    setRunBreak(true)
    setRunning(false)
    
  }
  if(minute >0){setMinute(m =>m-1)}
  
}




  const [sec, setSec] = useState(59);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timerID;
    if (running && sec > 0) {
      timerID = setTimeout(() => {
        setSec((prevSec) => prevSec - 1);
      }, 1000);
    } else if (sec === 0) {
      setSec(59)
      minutesChange()
    }
    return () => clearTimeout(timerID);
  }, [running, sec]);

  

  const [timerLabel, setTimerLabel] = useState("25:00");

  

  // Session Counter
  const initialSession = {
    count: 25,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "increment":
        if (state.count === 25) {
          return { count: state.count };
        } else {
          return { count: state.count + 1 };
        }

      case "decrement":
        if (state.count === 0) {
          return { count: state.count };
        } else {
          return { count: state.count - 1 };
        }
      case "reset":
        return { count: 25 };

      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, initialSession);

  // Break Counter
  const initialBreak = {
    breakCount: 5,
  };

  const reducerCount = (state, action) => {
    switch (action.type) {
      case "increment":
        if (state.breakCount === 60) {
          return { breakCount: state.breakCount };
        } else {
          return { breakCount: state.breakCount + 1 };
        }

      case "decrement":
        if (state.breakCount === 0) {
          return { breakCount: state.breakCount };
        } else {
          return { breakCount: state.breakCount - 1 };
        }

      case "reset":
        return { breakCount: 5 };

      default:
        throw new Error();
    }
  };

  const [stateBreak, dispatchBreak] = useReducer(reducerCount, initialBreak);


  //Break-Timer

  const [runBreak,setRunBreak] =useState(false)


  




//Session to display
useEffect(()=>{
  setMinute(state.count)
},[state.count])

  //reset function

  const reset = () => {
    dispatch({ type: "reset" });
    dispatchBreak({ type: "reset" });
    setRunning(false);
    setSec(60)
  };

  return (
    <div className="body">
      <div className="timer">
        <div className="settings">
          <div className="break">
            <p>Break</p>
            <p>{stateBreak.breakCount}</p>
            <div>
              <button onClick={() => dispatchBreak({ type: "increment" })}>
                up
              </button>
              <button onClick={() => dispatchBreak({ type: "decrement" })}>
                down
              </button>
            </div>
          </div>
          <div className="time">
            <p>Session</p>
            <p>{state.count}</p>
            <div>
              <button onClick={() => dispatch({ type: "increment" })}>
                up
              </button>
              <button onClick={() => dispatch({ type: "decrement" })}>
                down
              </button>
            </div>
          </div>
        </div>
        <div className="display">{minute}:{sec}</div>
        <div className="timer-control">
          <button onClick={() =>setRunning(true)}>play</button>
          <button onClick={() =>setRunning(false)}>pause</button>
          <button onClick={() => reset()}>reset</button>
        </div>
      </div>
    </div>
  );
}

export default Timer;
