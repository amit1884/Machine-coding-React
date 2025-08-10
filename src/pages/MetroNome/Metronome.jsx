import { useEffect, useState } from "react";
import "./metronome.css";

export default function Metronome() {
  const [active, setActive] = useState(0); // current box index
  const [speed, setSpeed] = useState(16);  // beats per second
  const boxes = 16;

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % boxes);
    }, 1000 / speed); 
    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div className="metronome-container">
        <div>
            <h1>Basic metronome</h1>
        </div>
      <div className="box-container">
        {Array.from({ length: boxes }).map((_, i) => (
          <div
            key={i}
            className="box"
            style={{
              backgroundColor: i === active ? "blue" : "grey",
            }}
          />
        ))}
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>Beats per second: </label>
        <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))}>
          <option value={8}>8</option>
          <option value={16}>16</option>
          <option value={32}>32</option>
        </select>
      </div>
    </div>
  );
}
