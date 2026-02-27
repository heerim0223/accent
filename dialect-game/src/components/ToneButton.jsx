function ToneButtons({ onSelect }) {
  return (
    <div className="buttons">
      <button
        style={{ backgroundColor: "#4CAF50" }}
        onClick={() => onSelect(1)}
      >
        1 ↓
      </button>

      <button
        style={{ backgroundColor: "#2196F3" }}
        onClick={() => onSelect(2)}
      >
        2 →
      </button>

      <button
        style={{ backgroundColor: "#f44336" }}
        onClick={() => onSelect(3)}
      >
        3 ↑
      </button>
    </div>
  );
}

export default ToneButtons;