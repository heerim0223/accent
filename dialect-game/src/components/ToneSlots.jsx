const toneColors = {
  1: "#4CAF50",
  2: "#2196F3",
  3: "#f44336"
};

function ToneSlots({ syllables, userTones, onSlotClick }) {
  return (
    <div className="slots">
      {syllables.map((syllable, index) => (
        <div key={index} className="slot">
          <div className="syllable">{syllable}</div>

          <div
            className="tone"
            onClick={() => onSlotClick(index)}
            style={{
              backgroundColor: toneColors[userTones[index]] || "white"
            }}
          >
            {userTones[index] ?? "_"}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ToneSlots;