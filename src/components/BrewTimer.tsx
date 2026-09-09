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
    <span className="timer-display" aria-label={`${remaining} seconds remaining`}>{String(Math.floor(remaining / 60)).padStart(2, "0")}:{String(remaining % 60).padStart(2, "0")}</span>
    <button type="button" onClick={toggle}>{running ? "Pause" : remaining === 0 ? "Again" : remaining === seconds ? "Start timer" : "Resume"}</button>
    {(remaining !== seconds || running) && <button className="timer-reset" type="button" onClick={() => { setRunning(false); setRemaining(seconds); }}>Reset</button>}
    <span className="sr-only" role="status">{remaining === 0 ? "Timer complete. Time for the next step." : ""}</span>
  </div>;
}
