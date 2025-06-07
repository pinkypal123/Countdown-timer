import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [input, setInput] = useState({ hours: "", minutes: "", seconds: "" });
  const [remainingTime, setRemainingTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(0);
  const [endTime, setEndTime] = useState(null);
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
      const now = Date.now();
      setEndTime(now + remainingTime * 1000);
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setStartButton("pause");
    setIsRunning(false);
    setEndTime(null);
  };

  const resetTimer = () => {
    setStartButton("reset");
    setIsRunning(false);
    setRemainingTime(initialTime);
    setEndTime(null);
  };

  const stopTimer = () => {
    setStartButton("stop");
    setIsRunning(false);
    setRemainingTime(initialTime);
    setEndTime(null);
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

  // This useEffect runs when isRunning or endTime changes
  useEffect(() => {
    if (!isRunning || !endTime) return;

    const interval = setInterval(() => {
      const newTime = Math.round((endTime - Date.now()) / 1000);
      if (newTime <= 0) {
        clearInterval(interval);
        setIsRunning(false);
        setRemainingTime(0);
        setStartButton("");
        setQuickSetButton("");
        alert("Time's up!");
      } else {
        setRemainingTime(newTime);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isRunning, endTime]);

  return (
    <>
      <div className="input-container">
        <div className="input-box">
          <input
            name="hours"
            placeholder="HH"
            value={input.hours}
            onChange={handleInputChange}
            // min="0"
          />
          <input
            name="minutes"
            placeholder="MM"
            value={input.minutes}
            onChange={handleInputChange}
            // min="0"
            // max="59"
          />
          <input
            name="seconds"
            placeholder="SS"
            value={input.seconds}
            onChange={handleInputChange}
            // min="0"
            // max="59"
          />

          <button onClick={setTimeFromInput} className="timer-button">
            Set
          </button>
        </div>
      </div>

      <div className="d-flex flex-row column-gap-3">
        <button
          onClick={() => {
            quickSet(60);
            setQuickSetButton(60);
          }}
          className={`${
            quickSetButton !== 60 ? "timer-button" : "activeButton"
          }`}
        >
          1 Min
        </button>
        <button
          onClick={() => {
            quickSet(300);
            setQuickSetButton(300);
          }}
          className={`${
            quickSetButton !== 300 ? "timer-button" : "activeButton"
          }`}
        >
          5 Min
        </button>
        <button
          onClick={() => {
            quickSet(600);
            setQuickSetButton(600);
          }}
          className={`${
            quickSetButton !== 600 ? "timer-button" : "activeButton"
          }`}
        >
          10 Min
        </button>
        <button
          onClick={() => {
            quickSet(1800);
            setQuickSetButton(1800);
          }}
          className={`${
            quickSetButton !== 1800 ? "timer-button" : "activeButton"
          }`}
        >
          30 Min
        </button>
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
