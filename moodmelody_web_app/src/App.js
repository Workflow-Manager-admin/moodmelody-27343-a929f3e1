import React, { useState } from 'react';
import './App.css';

// ============= MoodMelody Mood Tracker & Dynamic BG Utilities =============

// Key for mood history in localStorage
const MOOD_HISTORY_KEY = 'moodmelody_mood_history_v1';

// PUBLIC_INTERFACE
// Add a mood record (with timestamp) to localStorage (keep last 7)
function storeMoodToHistory(moodName) {
  try {
    const now = Date.now();
    let history = [];
    try {
      history = JSON.parse(window.localStorage.getItem(MOOD_HISTORY_KEY) || '[]');
      if (!Array.isArray(history)) history = [];
    } catch {
      history = [];
    }
    // Add new record
    history.push({ mood: moodName, timestamp: now });
    // Keep only most recent 7
    if (history.length > 7) {
      history = history.slice(history.length - 7);
    }
    window.localStorage.setItem(MOOD_HISTORY_KEY, JSON.stringify(history));
    return history;
  } catch (e) {
    return [];
  }
}

/**
 * PUBLIC_INTERFACE
 * Get the most recent N (default 7) mood records, most recent last.
 */
function getMoodHistory(n = 7) {
  try {
    let history = JSON.parse(window.localStorage.getItem(MOOD_HISTORY_KEY) || '[]');
    if (!Array.isArray(history)) return [];
    // sort by timestamp ascending, then slice last N
    return history.sort((a, b) => a.timestamp - b.timestamp).slice(-n);
  } catch (e) {
    return [];
  }
}

// PUBLIC_INTERFACE
// Mood to background mapping util: returns gradient/image for each mood
function getBackgroundForMood(moodName) {
  switch (moodName) {
    case "Happy":
      // Sunny yellow gradient
      return "linear-gradient(135deg, #fffbb7 0%, #fbd46d 44%, #ffdf80 100%)";
    case "Sad/Angry":
      // Blueish gradient for sad/angry
      return "linear-gradient(120deg, #3a6186 0%, #89253e 100%)";
    case "Stressed":
      // Forest/calm photo using unsplash, fallback to greenish gradient
      return "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80'), linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)";
    case "Neutral":
      // Subtle stone/gray gradient
      return "linear-gradient(120deg, #cfd9df 0%, #e2ebf0 100%)";
    default:
      // fallback: dark soft
      return "linear-gradient(135deg, #232526 0%, #414345 100%)";
  }
}

// Small mood emoji
function moodToEmoji(moodName) {
  switch (moodName) {
    case "Happy": return "🌞";
    case "Neutral": return "😊";
    case "Stressed": return "🌲";
    case "Sad/Angry": return "😭";
    default: return "🙂";
  }
}

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

/*
  PUBLIC_INTERFACE
  moodData retains meta info for each mood, but songs are managed in moodToSongs.
  moodToSongs maps mood names to an array of possible YouTube song objects (id, title).
*/
const moodData = [
  {
    name: "Happy",
    range: [5, 6],
    color: "#FBD46D",
    message: "You're shining bright! Keep spreading good vibes and enjoy these happy tunes! 🎉"
  },
  {
    name: "Neutral",
    range: [1, 4],
    color: "#F76B8A",
    message: "You're feeling balanced. Here are some chill songs to keep the mood mellow!"
  },
  {
    name: "Stressed",
    range: [-3, 0],
    color: "#0c0e0e",
    message: "Life can be overwhelming. Take a breath and listen to something soothing 💛"
  },
  {
    name: "Sad/Angry",
    range: [-6, -4],
    color: "#F76B8A",
    message: "It's okay to have tough days. Music brings comfort—hope one of these songs helps you feel better."
  }
];

// PUBLIC_INTERFACE
// Mapping moods to an array of YouTube song choices. Add more as needed!
const moodToSongs = {
  Happy: [
    { youtubeId: "ZbZSe6N_BXs", title: "Pharrell Williams – Happy" },
    { youtubeId: "HgzGwKwLmgM", title: "Queen – Don’t Stop Me Now" },
    { youtubeId: "y6Sxv-sUYtM", title: "Mark Ronson ft. Bruno Mars – Uptown Funk" }
  ],
  Neutral: [
    { youtubeId: "7E9Ed9DUQoI", title: "Vance Joy – Riptide" },
    { youtubeId: "JGwWNGJdvx8", title: "Ed Sheeran – Shape Of You" },
    { youtubeId: "kXYiU_JCYtU", title: "Linkin Park – Numb" }
  ],
  Stressed: [
    { youtubeId: "vKJ7Hkrr7zQ", title: "Coldplay – Fix You" },
    { youtubeId: "bwAWN-BWRnA", title: "Lewis Capaldi – Someone You Loved" },
    { youtubeId: "hoNb6HuNmU0", title: "Adele – Someone Like You" }
  ],
  "Sad/Angry": [
    { youtubeId: "RgKAFK5djSk", title: "Wiz Khalifa ft. Charlie Puth – See You Again" },
    { youtubeId: "fJ9rUzIMcZQ", title: "Queen – Bohemian Rhapsody" },
    { youtubeId: "hLQl3WQQoQ0", title: "Adele – Someone Like You" }
  ]
};

/**
 * PUBLIC_INTERFACE
 * Given a mood string, randomly select a song from that mood's song list.
 * @param {string} mood
 * @returns {object} {youtubeId, title}
 */
function getRandomSongForMood(mood) {
  const songs = moodToSongs[mood] || [];
  if (songs.length === 0) return null;
  const idx = Math.floor(Math.random() * songs.length);
  return songs[idx];
}

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

function App() {
  // State for 3 randomized questions, answers, UI step, score, and chosen song.
  const [questions, setQuestions] = useState(shuffleArray(questionPool).slice(0, 3));
  const [answers, setAnswers] = useState([null, null, null]);
  const [step, setStep] = useState(0); // 0=quiz, 1=results
  const [score, setScore] = useState(null);
  const [resultMood, setResultMood] = useState(null); // The detected mood object after quiz
  const [resultSong, setResultSong] = useState(null); // Randomly chosen song for mood

  // State for mood history for rendering, array of {mood, timestamp}
  const [moodHistory, setMoodHistory] = useState([]);

  // State for current background CSS (dynamic)
  const [bgStyle, setBgStyle] = useState({ background: 'var(--moodmelody-primary)' });

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
    const mood = detectMood(totalScore);
    const song = getRandomSongForMood(mood.name);
    setScore(totalScore);
    setResultMood(mood);
    setResultSong(song);

    // Store mood in localStorage & refresh mood history
    const updatedHistory = storeMoodToHistory(mood.name);
    setMoodHistory(updatedHistory);

    // Change background to match mood
    const bg = getBackgroundForMood(mood.name);
    setBgStyle({ background: bg, transition: "background 0.8s" });
    document.body.style.background = bg;
    setStep(1);
  }

  // PUBLIC_INTERFACE
  // Reset the quiz (reshuffle)
  function handleRetry() {
    setQuestions(shuffleArray(questionPool).slice(0, 3));
    setAnswers([null, null, null]);
    setStep(0);
    setScore(null);
    setResultMood(null);
    setResultSong(null);

    // On retry, reset bg to most recent mood if available (else default)
    if (moodHistory.length > 0) {
      const latestMood = moodHistory[moodHistory.length - 1]?.mood;
      if (latestMood) {
        const bg = getBackgroundForMood(latestMood);
        setBgStyle({ background: bg, transition: "background 0.8s" });
        document.body.style.background = bg;
      }
    } else {
      setBgStyle({ background: 'var(--moodmelody-primary)' });
      document.body.style.background = 'var(--moodmelody-primary)';
    }
  }

  // On initial mount: load last 7 moods and set background accordingly
  React.useEffect(() => {
    // Override CSS variables for theme system-wide
    document.documentElement.style.setProperty('--moodmelody-primary', '#0c0e0e');
    document.documentElement.style.setProperty('--moodmelody-secondary', '#FBD46D');
    document.documentElement.style.setProperty('--moodmelody-accent', '#F76B8A');

    // Load and set mood history (if any)
    const stored = getMoodHistory();
    setMoodHistory(stored);
    // Set initial background based on last known mood, else default
    if (stored.length > 0) {
      const lastMood = stored[stored.length - 1]?.mood;
      const bg = getBackgroundForMood(lastMood);
      setBgStyle({ background: bg, transition: "background 0.8s" });
      document.body.style.background = bg;
    } else {
      setBgStyle({ background: 'var(--moodmelody-primary)' });
      document.body.style.background = 'var(--moodmelody-primary)';
    }
    // Cleanup: on unmount, reset bg
    return () => {
      document.body.style.background = 'var(--moodmelody-primary)';
    };
  }, []);

  // MAIN RENDER
  return (
    <div className="app" style={{ minHeight: "100vh", ...bgStyle }}>
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
                // Already selected mood and song (from handleSubmit)
                const mood = resultMood;
                const song = resultSong;
                return (
                  <div style={{ width: "100%" }}>
                    <div
                      style={{
                        textAlign: "center",
                        marginBottom: 8,
                        fontSize: "1.14rem",
                        color: mood?.color,
                        fontWeight: 600,
                        letterSpacing: ".18rem"
                      }}
                    >
                      {mood?.name === "Happy" && "🌞"}
                      {mood?.name === "Neutral" && "😊"}
                      {mood?.name === "Stressed" && "😓"}
                      {mood?.name === "Sad/Angry" && "😭"}
                      &nbsp;Your Mood:&nbsp;
                      <span style={{
                        background: `linear-gradient(99deg, ${mood?.color} 40%, #fff 100%)`,
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 700,
                        fontSize: "1.13em"
                      }}>{mood?.name}</span>
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
                      {mood?.message}
                    </div>
                    <div style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', margin: "18px auto 12px auto"
                    }}>
                      {/* YouTube video embed */}
                      {song ? (
                        <>
                          <iframe
                            title={`YouTube player ${song.youtubeId}`}
                            width="94%"
                            height="210"
                            style={{ maxWidth: 350, borderRadius: 12, border: "1.5px solid #FBD46D", boxShadow: "0 2px 8px #0c0e0e30" }}
                            src={`https://www.youtube.com/embed/${song.youtubeId}?autoplay=1&rel=0`}
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
                            <span style={{ color: "#F76B8A", fontWeight: 700 }}>
                              {song.title}
                            </span>
                            {" "}
                            <a
                              href={`https://youtu.be/${song.youtubeId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#F76B8A", textDecoration: "underline", fontWeight: 700, marginLeft: 6 }}
                            >
                              YouTube
                            </a>
                          </div>
                        </>
                      ) : (
                        <div style={{ color: "#FF8B4D", fontWeight: 500, margin: "20px 0" }}>
                          No song found for this mood.
                        </div>
                      )}
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
