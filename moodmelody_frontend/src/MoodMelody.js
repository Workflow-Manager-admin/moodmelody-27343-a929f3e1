import React, { useState } from "react";

// PUBLIC_INTERFACE
// The main MoodMelody component for the emotional mood quiz and music suggestion app.
function MoodMelody() {
  // Define the 5 emotional questions with options and associated scores
  const QUESTION_POOL = [
    {
      question: "How do you feel when you wake up today?",
      options: [
        { label: "Refreshed and optimistic", score: 2 },
        { label: "Okay, just another day", score: 1 },
        { label: "Tired and unmotivated", score: 0 },
      ],
    },
    {
      question: "What's your current energy level?",
      options: [
        { label: "Full of energy", score: 2 },
        { label: "Somewhat energetic", score: 1 },
        { label: "Drained or lethargic", score: 0 },
      ],
    },
    {
      question: "Which best describes your mood right now?",
      options: [
        { label: "Happy/Excited", score: 2 },
        { label: "Calm/Neutral", score: 1 },
        { label: "Sad/Angry/Stressed", score: 0 },
      ],
    },
    {
      question: "How are you reacting to challenges today?",
      options: [
        { label: "Confidently handling everything", score: 2 },
        { label: "Managing, but it’s tough", score: 1 },
        { label: "Struggling with most things", score: 0 },
      ],
    },
    {
      question: "How connected do you feel with others today?",
      options: [
        { label: "Very connected & supported", score: 2 },
        { label: "Somewhat connected", score: 1 },
        { label: "Isolated or misunderstood", score: 0 },
      ],
    },
  ];

  // Mood categories based on total score
  const MOOD_PROFILES = [
    {
      name: "Happy",
      minScore: 5,
      message: "You're radiating positivity! Keep it up and spread your good vibes.",
      youtube: {
        title: "Pharrell Williams - Happy",
        url: "https://www.youtube.com/embed/ZbZSe6N_BXs",
      },
      accent: "#FBD46D", // Yellow
    },
    {
      name: "Neutral",
      minScore: 3,
      message: "You seem balanced and calm. Enjoy the moment and take it easy.",
      youtube: {
        title: "Jack Johnson - Banana Pancakes",
        url: "https://www.youtube.com/embed/6Graa_Vm5eA",
      },
      accent: "#F76B8A", // Pink
    },
    {
      name: "Stressed",
      minScore: 1,
      message: "Feeling tense? Remember to breathe and take some time for yourself.",
      youtube: {
        title: "Coldplay - Fix You",
        url: "https://www.youtube.com/embed/k4V3Mo61fJM",
      },
      accent: "#F76B8A", // Pink
    },
    {
      name: "Sad/Angry",
      minScore: 0,
      message: "It's okay to feel down. Tomorrow is a fresh start. Here’s some music to comfort you.",
      youtube: {
        title: "Lewis Capaldi - Someone You Loved",
        url: "https://www.youtube.com/embed/bCuhuePlP8o",
      },
      accent: "#F76B8A", // Pink
    },
  ];

  // Shuffle and pick 3 questions from the pool
  function getRandomQuestions() {
    const arr = [...QUESTION_POOL];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, 3);
  }

  // State for quiz progression
  const [quizState, setQuizState] = useState({
    step: "quiz", // "quiz" or "result"
    selectedQuestions: getRandomQuestions(),
    answers: [null, null, null], // User choices per question
    totalScore: 0,
    detectedMood: null,
  });

  // Handle answer selection (all at once style)
  const handleSelect = (qIdx, optionIdx) => {
    setQuizState((prev) => {
      const newAnswers = prev.answers.slice();
      newAnswers[qIdx] = optionIdx;
      return { ...prev, answers: newAnswers };
    });
  };

  // Calculate mood and show result
  const handleSubmit = (e) => {
    e.preventDefault();
    const score = quizState.selectedQuestions.reduce(
      (total, q, idx) => {
        const ansIdx = quizState.answers[idx];
        return total + (ansIdx !== null ? q.options[ansIdx].score : 0);
      }, 0);

    // Find the matching mood, in order (from highest to lowest minScore)
    let detected = MOOD_PROFILES.find((mood) => score >= mood.minScore);
    if (!detected) detected = MOOD_PROFILES[MOOD_PROFILES.length - 1];

    setQuizState((prev) => ({
      ...prev,
      step: "result",
      totalScore: score,
      detectedMood: detected,
    }));
  };

  // Restart the quiz
  const handleRetry = () => {
    setQuizState({
      step: "quiz",
      selectedQuestions: getRandomQuestions(),
      answers: [null, null, null],
      totalScore: 0,
      detectedMood: null,
    });
  };

  // Derived: are all questions answered?
  const allAnswered = quizState.answers.every((a) => a !== null);

  // Colors from the design system
  const COLOR_PRIMARY = "#0c0e0e";
  const COLOR_SECONDARY = "#FBD46D";
  const COLOR_ACCENT = "#F76B8A";

  return (
    <div style={{
      minHeight: "100vh",
      background: COLOR_PRIMARY,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div className="mm-card" style={{
        background: "#141515",
        borderRadius: 18,
        boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
        padding: "36px 32px",
        maxWidth: 420,
        width: "100%",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        {/* Header */}
        <div style={{
          marginBottom: 20,
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}>
          <span style={{
            fontSize: 32,
            color: COLOR_SECONDARY,
            fontWeight: "bold",
            letterSpacing: 1,
            marginRight: 6,
          }}>♪</span>
          <h1 style={{
            margin: 0,
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: 1,
            letterSpacing: "0.03em",
            color: COLOR_SECONDARY,
          }}>MoodMelody</h1>
        </div>
        {/* Subtitle */}
        <div style={{
          color: "#aaa",
          fontSize: 15,
          textAlign: "center",
          marginBottom: 15,
        }}>
          Discover your mood &amp; get a perfect song suggestion!
        </div>
        {quizState.step === "quiz" ? (
          <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {quizState.selectedQuestions.map((q, qIdx) => (
                <QuestionBlock
                  key={qIdx}
                  question={q.question}
                  options={q.options}
                  selected={quizState.answers[qIdx]}
                  qIdx={qIdx}
                  colorAccent={COLOR_ACCENT}
                  colorSecondary={COLOR_SECONDARY}
                  onSelect={handleSelect}
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={!allAnswered}
              style={{
                marginTop: 32,
                width: "100%",
                padding: "12px 0",
                border: "none",
                borderRadius: 5,
                fontSize: 18,
                fontWeight: 600,
                background: allAnswered ? COLOR_SECONDARY : "#444",
                color: COLOR_PRIMARY,
                cursor: allAnswered ? "pointer" : "default",
                transition: "background 0.18s"
              }}
            >
              See My Mood & Song
            </button>
          </form>
        ) : (
          <ResultBlock
            mood={quizState.detectedMood}
            onRetry={handleRetry}
            colorPrimary={COLOR_PRIMARY}
            colorAccent={quizState.detectedMood?.accent || COLOR_ACCENT}
            colorSecondary={COLOR_SECONDARY}
          />
        )}
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
// Renders a single question/answer block
function QuestionBlock({ question, options, selected, qIdx, onSelect, colorAccent, colorSecondary }) {
  return (
    <div>
      <div style={{
        fontWeight: 600,
        fontSize: 17,
        marginBottom: 10,
        color: colorSecondary,
        letterSpacing: "0.02em",
      }}>
        {question}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {options.map((opt, idx) => (
          <label key={idx}>
            <input
              type="radio"
              name={`q${qIdx}`}
              value={idx}
              checked={selected === idx}
              onChange={() => onSelect(qIdx, idx)}
              style={{ display: "none" }}
            />
            <div style={{
              border: `2px solid ${selected === idx ? colorAccent : "#333"}`,
              background: selected === idx ? colorAccent : "#232325",
              color: selected === idx ? "#fff" : "#efefef",
              padding: "10px 18px",
              borderRadius: 7,
              fontWeight: 500,
              fontSize: 15,
              marginBottom: 0,
              transition: "all 0.16s",
              cursor: "pointer",
              boxShadow: selected === idx ? "0 2px 10px rgba(245,107,138,0.12)" : "none",
              outline: selected === idx ? `2px solid ${colorSecondary}` : "none",
            }}>
              {opt.label}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
// Renders the result: mood, message, and YouTube embed
function ResultBlock({ mood, onRetry, colorPrimary, colorAccent, colorSecondary }) {
  return (
    <div style={{
      width: "100%",
      minHeight: 250,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 24,
      marginTop: 10,
    }}>
      <div style={{
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: "0.02em",
        color: colorAccent,
        textAlign: "center",
        marginBottom: 5,
      }}>
        {mood.name === "Sad/Angry" ? "Cheer Up! 💟" : mood.name === "Stressed" ? "Take a Breath 🌱" : mood.name === "Happy" ? "Happy Vibes! 😊" : "Stay Chill 😌"}
      </div>
      <div style={{
        color: "#fff",
        textAlign: "center",
        fontSize: 16.5,
        lineHeight: 1.55,
        maxWidth: 320,
        marginBottom: 10,
      }}>{mood.message}</div>
      <div style={{
        borderRadius: 9,
        overflow: "hidden",
        width: "100%",
        maxWidth: 315,
        boxShadow: "0 2px 14px rgba(247,107,138,0.18)",
        marginBottom: 16,
      }}>
        <iframe
          width="315"
          height="182"
          src={mood.youtube.url}
          title={mood.youtube.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="0"
          style={{ display: "block", background: "#222" }}
        />
      </div>
      <button
        onClick={onRetry}
        style={{
          background: colorSecondary,
          color: colorPrimary,
          border: "none",
          fontSize: 16,
          fontWeight: 600,
          borderRadius: 6,
          padding: "11px 26px",
          marginTop: 4,
          boxShadow: "0 2px 12px rgba(251,212,109,0.10)",
          cursor: "pointer",
          transition: "background 0.15s",
        }}
      >
        Try Again
      </button>
    </div>
  );
}

export default MoodMelody;
