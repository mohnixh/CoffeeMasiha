import { useEffect, useRef, useState } from "react";

export function BrewTimer({ seconds }: { seconds: number }) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);
  const deadline = useRef(0);
  useEffect(() => {
    if (!running) return;
    const update = () => {
      const next = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000));
      setRemaining(next);
      if (!next) setRunning(false);
    };
    const timer = window.setInterval(update, 200);
    return () => window.clearInterval(timer);
  }, [running]);
  const toggle = () => {
    if (running) setRunning(false);
    else {
      const duration = remaining || seconds;
      setRemaining(duration);
      deadline.current = Date.now() + duration * 1000;
      setRunning(true);
    }
  };
  return <div className="brew-timer">
    <span className="timer-clock"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" /><circle className="timer-ring" cx="24" cy="24" r="21" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - remaining / seconds} /></svg><span className="timer-display" aria-label={`${remaining} seconds remaining`}>{String(Math.floor(remaining / 60)).padStart(2, "0")}:{String(remaining % 60).padStart(2, "0")}</span></span>
    <button type="button" onClick={toggle}>{running ? "Pause" : remaining === 0 ? "Again" : remaining === seconds ? "Start timer" : "Resume"}</button>
    {(remaining !== seconds || running) && <button className="timer-reset" type="button" onClick={() => { setRunning(false); setRemaining(seconds); }}>Reset</button>}
    <span className="sr-only" role="status">{remaining === 0 ? "Timer complete. Time for the next step." : ""}</span>
  </div>;
}
