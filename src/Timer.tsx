import React, { useState } from 'react';
import './timer.css'

function Timer() {
  const [Time, SetTime] = useState({ ms: 0, s: 0, m: 0 });
  const [Interval, SetInterval] = useState<any>();
  const [status, SetStatus] = useState(0);

  const startTimer = () => {
    runTimer();
    SetStatus(1);
    SetInterval(setInterval(runTimer, 10));
  }

  let updatedMs = Time.ms, updatedS = Time.s, updatedM = Time.m;
  const runTimer = () => {
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return SetTime({ ms: updatedMs, s: updatedS, m: updatedM });
  };

  const stopTimer = () => {
    clearInterval(Interval);
    SetStatus(2);
  };

  const ResetTimer = () => {
    clearInterval(Interval);
    SetStatus(0);
    SetTime({ ms: 0, s: 0, m: 0 })
  };
  const resumeTimer = () => startTimer();


  return (
    <div className='Timer'>
      <div className='heading'>
        <h4>stopTimer watch</h4>
      </div>
      <div className='outer-con'>
        {/* timer */}
        <div className='inner-con'>
          <div className='minutes'>
            <h1 className='Timer-num one'>{(Time.m >= 10) ? Time.m : "0" + Time.m} : </h1>
          </div>
          <div className='seconds'>
            <h1 className='Timer-num '>{(Time.s >= 10) ? Time.s : "0" + Time.s}</h1>
          </div>
        </div>
        {/* button */}
        <div className='startTimerbtn'>
          {(status === 0) ?
            <button className="btn start"
              onClick={startTimer}>Start</button> : ""
          }

          {(status === 1) ?
            <div>
              <button className="btn stop"
                onClick={stopTimer}>Stop</button>
              <button className="btn reset"
                onClick={ResetTimer}>Reset</button>
            </div> : ""
          }

          {(status === 2) ?
            <div>
              <button className="btn start"
                onClick={resumeTimer}>Start</button>
              <button className="btn reset"
                onClick={ResetTimer}>Reset</button>
            </div> : ""
          }
        </div>
      </div>
    </div>
  );
}


export default Timer
