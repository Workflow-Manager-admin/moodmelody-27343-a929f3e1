import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
// Array of 5 emotional questions and options, each option has a value for scoring
const questionPool = [
  {
    question: "How did you feel when you woke up today?",
    options: [
      { text: "Energized and happy", value: 2 },
      { text: "Calm and content", value: 1 },
      { text: "Neutral", value: 0 },
      { text: "A bit stressed or tired", value: -1 },
      { text: "Upset or anxious", value: -2 }
    ]
  },
  {
    question: "Which word describes your day so far?",
    options: [
      { text: "Fantastic", value: 2 },
      { text: "Good", value: 1 },
      { text: "Okay", value: 0 },
      { text: "Rough", value: -1 },
      { text: "Awful", value: -2 }
    ]
  },
  {
    question: "How do you feel about your upcoming tasks?",
    options: [
      { text: "Excited", value: 2 },
      { text: "Optimistic", value: 1 },
      { text: "Indifferent", value: 0 },
      { text: "Worried", value: -1 },
      { text: "Overwhelmed", value: -2 }
    ]
  },
  {
    question: "How is your energy right now?",
    options: [
      { text: "Full of energy", value: 2 },
      { text: "Decent", value: 1 },
      { text: "Average", value: 0 },
      { text: "A little low", value: -1 },
      { text: "Drained", value: -2 }
    ]
  },
  {
    question: "Which best matches your current mood?",
    options: [
      { text: "Joyful", value: 2 },
      { text: "Peaceful", value: 1 },
      { text: "So-so", value: 0 },
      { text: "Disappointed", value: -1 },
      { text: "Angry/Sad", value: -2 }
    ]
  }
];

// PUBLIC_INTERFACE
// Mappings for mood categories, messages, and YouTube songs
const moodData = [
  {
    name: "Happy",
    range: [5, 6], // 3 answers, max possible is 6
    color: "#FBD46D",
    message: "You're shining bright! Keep spreading good vibes and enjoy this happy tune 🎉",
    youtubeId: "ZbZSe6N_BXs" // Happy - Pharrell Williams
  },
  {
    name: "Neutral",
    range: [1, 4],
    color: "#F76B8A",
    message: "You're feeling balanced. Here's a chill song to keep the mood mellow!",
    youtubeId: "7E9Ed9DUQoI" // Vance Joy - Riptide
  },
  {
    name: "Stressed",
    range: [-3, 0],
    color: "#0c0e0e",
    message: "Life can be overwhelming. Take a breath and listen to something soothing 💛",
    youtubeId: "vKJ7Hkrr7zQ" // Coldplay - Fix You
  },
  {
    name: "Sad/Angry",
    range: [-6, -4],
    color: "#F76B8A",
    message: "It's okay to have tough days. Music brings comfort—hope this song helps you feel a bit better.",
    youtubeId: "RgKAFK5djSk" // Wiz Khalifa - See You Again
  }
];

// Shuffle utility (Fisher-Yates)
function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// PUBLIC_INTERFACE
function detectMood(totalScore) {
  for (let mood of moodData) {
    if (totalScore >= mood.range[0] && totalScore <= mood.range[1]) {
      return mood;
    }
  }
  // Fallback: Neutral
  return moodData[1];
}

// PUBLIC_INTERFACE
function App() {
  // State for 3 randomized questions, answers, UI step, etc.
  const [questions, setQuestions] = useState(shuffleArray(questionPool).slice(0, 3));
  const [answers, setAnswers] = useState([null, null, null]);
  const [step, setStep] = useState(0); // 0=quiz, 1=results
  const [score, setScore] = useState(null);

  // PUBLIC_INTERFACE
  // Handle answer selection
  function handleSelect(qIdx, ansIdx) {
    const newAnswers = [...answers];
    newAnswers[qIdx] = ansIdx;
    setAnswers(newAnswers);
  }

  // PUBLIC_INTERFACE
  // Submit answers for results
  function handleSubmit() {
    // Sum all selected option values
    const totalScore = answers.reduce((acc, ansIdx, qIdx) =>
      acc + (questions[qIdx].options[ansIdx]?.value || 0)
    , 0);
    setScore(totalScore);
    setStep(1);
  }

  // PUBLIC_INTERFACE
  // Reset the quiz (reshuffle)
  function handleRetry() {
    setQuestions(shuffleArray(questionPool).slice(0, 3));
    setAnswers([null, null, null]);
    setStep(0);
    setScore(null);
  }

  // UI THEME: colors to CSS variables
  React.useEffect(() => {
    // Override CSS variables for theme
    document.documentElement.style.setProperty('--moodmelody-primary', '#0c0e0e');
    document.documentElement.style.setProperty('--moodmelody-secondary', '#FBD46D');
    document.documentElement.style.setProperty('--moodmelody-accent', '#F76B8A');
    // Set card bg and text contrast based on auto theme preference
    document.body.style.background = 'var(--moodmelody-primary)';
  }, []);

  // MAIN RENDER
  return (
    <div className="app" style={{ minHeight: "100vh", background: 'var(--moodmelody-primary)' }}>
      <nav className="navbar" style={{ background: 'var(--moodmelody-primary)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo" style={{ color: "#FBD46D" }}>
              <span className="logo-symbol" style={{ color: "#F76B8A", fontWeight: 'bold' }}>♪</span> MoodMelody
            </div>
          </div>
        </div>
      </nav>
      <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div
          className="mm-card"
          style={{
            background: '#191b1c',
            borderRadius: '18px',
            boxShadow: '0 6px 32px 0 rgba(26,24,38,0.2), 0 0px 1.5px 0 rgba(251, 212, 109, 0.15)',
            marginTop: 120,
            minWidth: 340,
            maxWidth: 410,
            padding: "32px 28px 34px 28px",
            width: '94vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {step === 0 ? (
            <>
              <div className="subtitle" style={{
                color: "var(--moodmelody-secondary)",
                textAlign: "center",
                fontWeight: 600,
                marginBottom: 6,
                fontSize: "1.12rem"
              }}>
                Let's tune into your mood!
              </div>
              <h1 className="title" style={{
                fontSize: "2.1rem",
                fontWeight: 700,
                lineHeight: 1.22,
                margin: "0 0 22px 0",
                color: "white"
              }}>
                Mood Quiz
              </h1>
              <div className="description" style={{
                textAlign: "center",
                color: "rgba(255,255,255,0.80)",
                marginBottom: "18px",
                fontSize: "1.07rem"
              }}>
                Answer these 3 quick questions to get a personalized song recommendation based on your emotions.
              </div>
              <form style={{ width: "100%" }} onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
                {questions.map((q, qIdx) => (
                  <div key={qIdx}
                    style={{
                      marginBottom: qIdx < 2 ? 24 : 17,
                      background: "#222326",
                      borderRadius: 8,
                      padding: 16,
                      boxShadow: "0 1px 4px 0 rgba(251,212,109,0.04)"
                    }}
                  >
                    <div style={{
                      color: "#FBD46D",
                      fontWeight: 600,
                      marginBottom: 6,
                      fontSize: "1.09rem"
                    }}>
                      {q.question}
                    </div>
                    <div>
                      {q.options.map((opt, optIdx) => (
                        <label
                          htmlFor={`q${qIdx}_opt${optIdx}`}
                          key={optIdx}
                          style={{
                            display: "block",
                            background: answers[qIdx] === optIdx ? "#F76B8A" : "#2D2F36",
                            color: answers[qIdx] === optIdx ? "#fff" : "#eee",
                            borderRadius: 6,
                            margin: "6px 0",
                            padding: "9px 13px",
                            fontWeight: answers[qIdx] === optIdx ? 700 : 400,
                            fontSize: "1rem",
                            cursor: "pointer",
                            border: answers[qIdx] === optIdx ? "2.5px solid #FBD46D" : "1px solid #232228",
                            transition: "all 0.17s"
                          }}
                        >
                          <input
                            type="radio"
                            id={`q${qIdx}_opt${optIdx}`}
                            name={`question${qIdx}`}
                            checked={answers[qIdx] === optIdx}
                            onChange={() => handleSelect(qIdx, optIdx)}
                            style={{ marginRight: 8, accentColor: "#F76B8A" }}
                          />
                          {opt.text}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  className="btn btn-large"
                  type="submit"
                  style={{
                    width: "100%",
                    background: "linear-gradient(90deg, #FBD46D 50%, #F76B8A 98%)",
                    color: "#161616",
                    fontWeight: 700,
                    letterSpacing: "1.1px",
                    fontSize: "1.09rem",
                    border: "none",
                    borderRadius: 8,
                    marginTop: 12,
                    padding: "13px 2px",
                    opacity: answers.every(a => a !== null) ? 1 : 0.5,
                    cursor: answers.every(a => a !== null) ? "pointer" : "not-allowed",
                  }}
                  disabled={!answers.every(a => a !== null)}
                >
                  See My Mood & Song 🎵
                </button>
              </form>
            </>
          ) : (
            // Result card
            <>
              {(() => {
                const mood = detectMood(score);
                return (
                  <div style={{ width: "100%" }}>
                    <div
                      style={{
                        textAlign: "center",
                        marginBottom: 8,
                        fontSize: "1.14rem",
                        color: mood.color,
                        fontWeight: 600,
                        letterSpacing: ".18rem"
                      }}
                    >
                      {mood.name === "Happy" && "🌞"}{mood.name === "Neutral" && "😊"}{mood.name === "Stressed" && "😓"}{mood.name === "Sad/Angry" && "😭"}
                      &nbsp;Your Mood:&nbsp;
                      <span style={{
                        background: `linear-gradient(99deg, ${mood.color} 40%, #fff 100%)`,
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 700,
                        fontSize: "1.13em"
                      }}>{mood.name}</span>
                    </div>
                    <div style={{
                      color: "rgba(255,255,255,0.93)",
                      fontSize: "1.03rem",
                      margin: "0 auto 18px auto",
                      textAlign: "center",
                      fontWeight: 500,
                      paddingBottom: 6,
                      minHeight: "46px"
                    }}>
                      {mood.message}
                    </div>
                    <div style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', margin: "18px auto 12px auto"
                    }}>
                      {/* YouTube video embed */}
                      <iframe
                        title={`YouTube player ${mood.youtubeId}`}
                        width="94%"
                        height="210"
                        style={{ maxWidth: 350, borderRadius: 12, border: "1.5px solid #FBD46D", boxShadow: "0 2px 8px #0c0e0e30" }}
                        src={`https://www.youtube.com/embed/${mood.youtubeId}?autoplay=1&rel=0`}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <div style={{
                        textAlign: "center",
                        color: "#FBD46D",
                        fontWeight: 600,
                        fontSize: "1rem",
                        marginTop: 10,
                        marginBottom: 7
                      }}>
                        {`Listen: `}
                        <a
                          href={`https://youtu.be/${mood.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#F76B8A", textDecoration: "underline", fontWeight: 700 }}
                        >
                          YouTube
                        </a>
                      </div>
                    </div>
                    <button
                      className="btn btn-large"
                      onClick={handleRetry}
                      style={{
                        width: "100%",
                        background: "linear-gradient(90deg, #FBD46D 50%, #F76B8A 98%)",
                        color: "#161616",
                        fontWeight: 700,
                        fontSize: "1.08rem",
                        border: "none",
                        borderRadius: 8,
                        marginTop: 7,
                        padding: "13px 2px"
                      }}
                    >
                      Try Again
                    </button>
                  </div>
                );
              })()}
            </>
          )}
        </div>
      </main>
      <footer style={{
        textAlign: "center",
        color: "#999",
        background: "var(--moodmelody-primary)",
        padding: "22px 0 0 0",
        fontSize: "0.98rem"
      }}>
        <span style={{ color: "#FBD46D" }}>MoodMelody</span> &copy; 2024
      </footer>
    </div>
  );
}

export default App;
