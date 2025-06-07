import React, { useState } from "react";
const CountdownTimer = () => {
  const [input, setInput] = useState({ hours: "", minutes: "", seconds: "" });
  const [remainingTime, setRemainingTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [startButton, setStartButton] = useState("");
  const [quickSetButton, setQuickSetButton] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const val = Math.max(0, Math.min(59, parseInt(value || 0)));
    setInput((prev) => ({ ...prev, [name]: val }));
  };

  const setTimeFromInput = () => {
    const h = parseInt(input.hours || 0);
    const m = parseInt(input.minutes || 0);
    const s = parseInt(input.seconds || 0);
    const total = h * 3600 + m * 60 + s;
    setRemainingTime(total);
    setInitialTime(total);
  };

  const startTimer = () => {
    setStartButton("start");
    if (remainingTime > 0 && !isRunning) {
      setIsRunning(true);
      const id = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(id);
            setIsRunning(false);
            setStartButton("");
            setQuickSetButton("");
            alert("Time's up!");

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setIntervalId(id);
    }
  };

  const pauseTimer = () => {
    setStartButton("pause");
    setIsRunning(false);
    clearInterval(intervalId);
  };

  const resetTimer = () => {
    setStartButton("reset");
    setIsRunning(false);
    clearInterval(intervalId);
    setRemainingTime(initialTime);
  };

  const stopTimer = () => {
    setStartButton("stop");
    setIsRunning(false);
    clearInterval(intervalId);
    setRemainingTime(0);
  };

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const quickSet = (secs) => {
    setRemainingTime(secs);
    setInitialTime(secs);
  };
  return (
    <>
      <div className="input-container">
        <div className="input-box">
          <input
            type="number"
            name="hours"
            placeholder="HH"
            value={input.hours}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="minutes"
            placeholder="MM"
            value={input.minutes}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="seconds"
            placeholder="SS"
            value={input.seconds}
            onChange={handleInputChange}
          />

          <button onClick={setTimeFromInput} className="timer-button">
            Set
          </button>
        </div>
      </div>
      <div className="d-flex flex-row column-gap-3">
        {[60, 300, 600, 1800].map((sec) => (
          <button
            key={sec}
            onClick={() => {
              quickSet(sec);
              setQuickSetButton(sec);
            }}
            className={`${
              quickSetButton !== sec ? "timer-button" : "activeButton"
            }`}
          >
            {sec / 60} Min
          </button>
        ))}
      </div>

      <div className="show-contaienr">
        <p className="timer-box">{formatTime(remainingTime)}</p>
        <div className="action-box">
          <button
            className={`${
              startButton !== "start" ? "timer-button" : "activeButton"
            }`}
            onClick={startTimer}
            disabled={isRunning}
          >
            Start
          </button>
          <button
            className={`${
              startButton !== "pause" ? "timer-button" : "activeButton"
            }`}
            onClick={pauseTimer}
            disabled={!isRunning}
          >
            Pause
          </button>
          <button
            className={`${
              startButton !== "reset" ? "timer-button" : "activeButton"
            }`}
            onClick={resetTimer}
          >
            Reset
          </button>
          <button
            className={`${
              startButton !== "stop" ? "timer-button" : "activeButton"
            }`}
            onClick={stopTimer}
          >
            Stop
          </button>
        </div>
      </div>
    </>
  );
};

export default CountdownTimer;
