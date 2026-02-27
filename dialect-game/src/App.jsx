import { useState, useEffect } from "react";
import problems from "./data/problems.json";
import "./App.css";

function App() {
  const [problem, setProblem] = useState(null);
  const [userTones, setUserTones] = useState([]);
  const [currentSlot, setCurrentSlot] = useState(0); // index of active syllable
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);

  // bounce animation flags per slot
  const [bounceSlots, setBounceSlots] = useState([]);
  // fade-out animation flags for deletions
  const [fadeSlots, setFadeSlots] = useState([]);

  const loadRandomProblem = () => {
    const random =
      problems[Math.floor(Math.random() * problems.length)];
    setProblem(random);
    setUserTones(Array(random.syllables.length).fill(null));
    setBounceSlots(Array(random.syllables.length).fill(false));
    setFadeSlots(Array(random.syllables.length).fill(false));
    setCurrentSlot(0);
    setTimeLeft(20);
  };

  useEffect(() => {
    loadRandomProblem();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      alert("시간 초과!");
      loadRandomProblem();
    }
  }, [timeLeft]);

  // keyboard-based selection handlers

  // when we want a slot to bounce, flip the flag off then on so the
  // CSS animation restarts cleanly even during rapid typing
  const animateSlot = (idx) => {
    setBounceSlots((prev) => {
      const arr = [...prev];
      arr[idx] = false;
      return arr;
    });
    // next frame toggle on
    requestAnimationFrame(() => {
      setBounceSlots((prev) => {
        const arr = [...prev];
        arr[idx] = true;
        return arr;
      });
    });
    // clear after animation ends so class doesn't linger
    setTimeout(() => {
      setBounceSlots((prev) => {
        const arr = [...prev];
        arr[idx] = false;
        return arr;
      });
    }, 400); // slightly longer than animation duration
  };
  const selectToneForSlot = (tone) => {
    const updated = [...userTones];
    updated[currentSlot] = tone;
    setUserTones(updated);

    // trigger bounce animation on this slot
    animateSlot(currentSlot);

    // advance slot automatically
    setCurrentSlot((prev) =>
      Math.min(prev + 1, problem.syllables.length - 1)
    );
  };

  // deletion animation: fade previous slot then clear value
  const animateRemoval = (idx) => {
    setFadeSlots((prev) => {
      const arr = [...prev];
      arr[idx] = false;
      return arr;
    });
    requestAnimationFrame(() => {
      setFadeSlots((prev) => {
        const arr = [...prev];
        arr[idx] = true;
        return arr;
      });
    });
    setTimeout(() => {
      setFadeSlots((prev) => {
        const arr = [...prev];
        arr[idx] = false;
        return arr;
      });
      setUserTones((prev) => {
        const arr = [...prev];
        arr[idx] = null;
        return arr;
      });
    }, 300); // duration matches CSS animation
  };

  const handleKeyDown = (e) => {
    if (!problem) return;
    switch (e.key) {
      case "ArrowDown":
        selectToneForSlot(1);
        break;
      case "ArrowRight":
        selectToneForSlot(2);
        break;
      case "ArrowUp":
        selectToneForSlot(3);
        break;
      case "ArrowLeft":
        // behave like a backspace: remove tone at cursor first
        if (userTones[currentSlot] != null) {
          // delete current tone and move back if possible
          animateRemoval(currentSlot);
          setCurrentSlot((prev) => Math.max(prev - 1, 0));
        } else if (currentSlot > 0) {
          // nothing here, remove previous slot
          const prevIdx = currentSlot - 1;
          if (userTones[prevIdx] != null) {
            animateRemoval(prevIdx);
          }
          setCurrentSlot(prevIdx);
        }
        break;
      case "Enter":
      case " ":
        checkAnswer();
        break;
      default:
        break;
    }
  };

  // attach listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, problem, currentSlot, userTones]);

  const checkAnswer = () => {
    const isCorrect = userTones.every(
      (tone, i) => tone === problem.tones[i]
    );

    if (isCorrect) {
      setScore((prev) => prev + 100);
      alert("정답!");
    } else {
      setScore((prev) => prev - 50);
      alert("틀림!");
    }

    loadRandomProblem();
  };

  if (!problem) return null;

  const toneColors = {
    1: "#4CAF50",
    2: "#2196F3",
    3: "#f44336"
  };

  return (
    <div className="container">
      <h2>점수: {score}</h2>
      <h3>남은 시간: {timeLeft}</h3>

      <h1 className="sentence">{problem.sentence}</h1>
      {problem.meaning && (
        <div className="meaning">{problem.meaning}</div>
      )}
      <div className="instructions">
        방향키 ↓→↑ 로 톤 입력, Enter/Space 로 제출
      </div>

      <div className="slots">
        {problem.syllables.map((syllable, index) => (
          <div
            key={index}
            className={`slot${index === currentSlot ? " current" : ""}`}
          >
            <div className="syllable">{syllable}</div>
            <div
              className={`tone-slot${bounceSlots[index] ? " bounce" : ""}${
                fadeSlots[index] ? " fade" : ""
              }`}
              style={{
                backgroundColor:
                  toneColors[userTones[index]] || "white"
              }}
            >
              {userTones[index] ?? "_"}
            </div>
          </div>
        ))}
      </div>

      <button onClick={checkAnswer}>정답 확인 (또는 Enter/Space)</button>
    </div>
  );
}

export default App;