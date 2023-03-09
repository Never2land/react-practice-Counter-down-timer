import Icon from './PlayIcon';
import React, { useEffect, useRef, useState } from 'react';

import styles from './Countdown.module.css';

let interval: any;
const Countdown = () => {
  const [minutes, setMinutes] = useState(0);
  const hoursRef = useRef<Number>(0);
  const minutesRef = useRef<Number>(minutes || 1);
  const secondsRef = useRef<Number>(0);
  const [timer, setTimer] = useState('00:00:00');
  const [timerStarted, setTimerStarted] = useState(false);

  const startTimer = () => {
    setTimerStarted(true);
    if (!timerStarted) {
      interval = setInterval(setTime, 1000);
    }
  };

  useEffect(() => {
    setDefaultTime();
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {}, [
    hoursRef.current,
    minutesRef.current,
    secondsRef.current,
  ]);

  const setTime = () => {
    const seconds = secondsRef.current;
    const minutes = minutesRef.current;
    const hours = hoursRef.current;

    if (seconds > 0) {
      secondsRef.current = seconds - 1;
    } else if (minutes > 0) {
      minutesRef.current = minutes - 1;
      secondsRef.current = 59;
    } else if (hours > 0) {
      hoursRef.current = hours - 1;
      minutesRef.current = 59;
      secondsRef.current = 59;
    } else {
      clearInterval(interval);
    }
    setTimer(
      `${hoursRef.current > 9 ? hoursRef.current : '0' + hoursRef.current}:
      ${minutesRef.current > 9 ? minutesRef.current : '0' + minutesRef.current}:
      ${secondsRef.current > 9 ? secondsRef.current : '0' + secondsRef.current}`
    );
  };

  const setDefaultTime = () => {
    secondsRef.current = 0;
    minutesRef.current = Math.floor(minutes % 60);
    hoursRef.current = Math.floor(minutes / 60);

    setTimer(
      `${hoursRef.current > 9 ? hoursRef.current : '0' + hoursRef.current}:
      ${minutesRef.current > 9 ? minutesRef.current : '0' + minutesRef.current}:
      ${secondsRef.current > 9 ? secondsRef.current : '0' + secondsRef.current}`
    );
  };

  useEffect(() => {
    setDefaultTime();
  }, [minutes]);

  return (
    <div>
      <div className="input">
        <input
          type="text"
          value={minutes}
          onChange={(event) => setMinutes(parseInt(event.target.value))}
        ></input>
      </div>
      <div className="countDown">
        <button onClick={startTimer}>
          <Icon className="play" />
        </button>
        {timer}
      </div>
    </div>
  );
};

export default Countdown;
