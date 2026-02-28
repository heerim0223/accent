import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

// A little explosion of small squares radiating outwards from a slot.
// We render the shards in a portal so they can be absolutely positioned
// relative to the document body.

function Shatter({ slotRef, color = "white", onDone }) {
  const [shards] = useState(() => {
    const countX = 5;
    const countY = 5;
    const arr = [];
    for (let y = 0; y < countY; y++) {
      for (let x = 0; x < countX; x++) {
        arr.push({
          id: `${x}-${y}-${Math.random()}`,
          cellX: x,
          cellY: y,
          delay: Math.random() * 200,
          // random target offset
          dx: (Math.random() - 0.5) * 150,
          dy: (Math.random() - 0.5) * 150
        });
      }
    }
    return arr;
  });

  useEffect(() => {
    const timer = setTimeout(onDone, 600);
    return () => clearTimeout(timer);
  }, [onDone]);

  if (!slotRef.current) return null;
  const rect = slotRef.current.getBoundingClientRect();
  // color is provided by parent; fallback to white if missing
  const bgColor = color;

  return ReactDOM.createPortal(
    <div
      className="shatter-container"
      style={{
        position: "absolute",
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height,
        pointerEvents: "none",
        overflow: "visible"
      }}
    >
      {shards.map((s) => (
        <div
          key={s.id}
          className="shard"
          style={{
            width: `${100 / 5}%`,
            height: `${100 / 5}%`,
            left: `${(s.cellX * 100) / 5}%`,
            top: `${(s.cellY * 100) / 5}%`,
            animationDelay: `${s.delay}ms`,
            backgroundColor: bgColor,
            // pass variables for the keyframe
            ["--dx"]: `${s.dx}px`,
            ["--dy"]: `${s.dy}px`
          }}
        />
      ))}
    </div>,
    document.body
  );
}

export default Shatter;