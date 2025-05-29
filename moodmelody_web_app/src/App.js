import React, { useState } from "react";
import "./App.css";

// Expanded videoMap for 10 moods with multiple YouTube IDs each
const videoMap = {
  Happy: [
    "ZbZSe6N_BXs", "HgzGwKwLmgM", "y6Sxv-sUYtM", "LsoLEjrDogU", "d-diB65scQU",
    "9bZkp7q19f0", "JGwWNGJdvx8", "HvWUMvFQk_s", "DUT5rEU6pqM", "CevxZvSJLk8",
    "fLexgOxsZu0", "2Vv-BfVoq4g", "5NV6Rdv1a3I", "CwfoyVa980U", "hT_nvWreIhg",
    "kXYiU_JCYtU", "vU2RkR3lbzQ", "bESGLojNYSo"
  ],
  Sad: [
    "RgKAFK5djSk", // Wiz Khalifa ft. Charlie Puth – See You Again
    "hLQl3WQQoQ0", // Adele – Someone Like You
    "hoNb6HuNmU0", // Adele – Set Fire to the Rain
    "bwAWN-BWRnA", // Lewis Capaldi – Someone You Loved
    "JGwWNGJdvx8", // Ed Sheeran – Shape Of You
    "d2PT7fB2RMc", // John Legend – All of Me
    "4N3N1MlvVc4", // Eric Clapton – Tears In Heaven
    "8UVNT4wvIGY", // Gotye – Somebody That I Used to Know
    "KYpMz9kKQk4", // Sam Smith – Too Good At Goodbyes
    "vHqpwU5liUw", // Sam Smith – Stay With Me
    "n4RjJKxsamQ", // Bonnie Tyler – Total Eclipse of the Heart
    "G7KNmW9a75Y", // The Script – Breakeven
    "i41qWJ6QjPI", // James Blunt – Goodbye My Lover
    "eVTXPUF4Oz4", // Linkin Park – Numb (sad association)
    "lcOxhH8N3Bo", // Green Day – Wake Me Up When September Ends
    "2Vv-BfVoq4g", // Ed Sheeran – Perfect
    "KRaWnd3LJfs", // Backstreet Boys – Show Me The Meaning Of Being Lonely
    "uelHwf8o7_U", // Eminem – Love The Way You Lie
    "bCjJZctBxXI", // Kodaline – All I Want
    "y6Sxv-sUYtM", // Mark Ronson - Uptown Funk (for ironic/sad cheer)
  ],
  Angry: [
    "hLQl3WQQoQ0", "hTWKbfoikeg", "fJ9rUzIMcZQ", "ktvTqknDobU", "RgKAFK5djSk",
    "7E9Ed9DUQoI", "kXYiU_JCYtU", "4N3N1MlvVc4", "G5TZ6fTYrsE", "Sb5aq5HcS1A",
    "bfqEisGgyaM", "B1wOK9yGUYM", "2vjPBrBU-TM", "u9Dg-g7t2l4", "hT_nvWreIhg",
    "hLQl3WQQoQ0", "FgG1UBr-bjs", "ZbZSe6N_BXs"
  ],
  Relaxed: ["vKJ7Hkrr7zQ", "bwAWN-BWRnA", "JGwWNGJdvx8"],
  // Expanded video list for "Stressed" (example IDs, replace/expand as needed)
  Stressed: [
    "vKJ7Hkrr7zQ",
    "bwAWN-BWRnA",
    "hoNb6HuNmU0",
    "JGwWNGJdvx8",
    "kXYiU_JCYtU",
    "7E9Ed9DUQoI",
    "fgN3CWWvGAg",
    "F4k0Rkxs4qM",
    "G5TZ6fTYrsE",
    "S2Cti12XBw4"
  ],
  Confused: ["kXYiU_JCYtU", "hTWKbfoikeg", "fJ9rUzIMcZQ"],
  Energetic: ["Fp8msa5uYsc", "ktvTqknDobU", "ZbZSe6N_BXs"],
  Motivated: ["d-diB65scQU", "HvWUMvFQk_s", "9bZkp7q19f0", "Fp8msa5uYsc"],
  // Expanded video list for "Lonely" (example IDs, replace/expand as needed)
  Lonely: [
    "hLQl3WQQoQ0",
    "RgKAFK5djSk",
    "bwAWN-BWRnA",
    "9bZkp7q19f0",
    "H4eEQT1f5YQ",
    "K5KAc5CoCuk",
    "4N3N1MlvVc4",
    "vU2RkR3lbzQ",
    "CevxZvSJLk8",
    "YqeW9_5kURI"
  ],
  Excited: ["fJ9rUzIMcZQ", "Fp8msa5uYsc", "ktvTqknDobU", "d-diB65scQU"],
};

// Expanded moods with emojis
const MOODS = [
  { name: "Happy", emoji: "🌞" },
  { name: "Sad", emoji: "😭" },
  { name: "Angry", emoji: "😡" },
  { name: "Relaxed", emoji: "🌴" },
  { name: "Stressed", emoji: "😵" },
  { name: "Confused", emoji: "🤔" },
  { name: "Energetic", emoji: "⚡" },
  { name: "Motivated", emoji: "🚀" },
  { name: "Lonely", emoji: "🥺" },
  { name: "Excited", emoji: "🤩" },
];

// Quiz questions—each question has 4 answers with scoring toward moods
const QUIZ_QUESTIONS = [
  {
    question: "How did you feel when you woke up today?",
    options: [
      { text: "Ready to conquer the world!", moods: ["Energetic", "Motivated", "Excited"] },
      { text: "Had a hard time getting up", moods: ["Sad", "Lonely", "Stressed"] },
      { text: "Calm and peaceful", moods: ["Relaxed", "Happy"] },
      { text: "Frustrated or annoyed", moods: ["Angry", "Confused"] },
    ],
  },
  {
    question: "Which describes your mood right now?",
    options: [
      { text: "Pumped and lively", moods: ["Energetic", "Excited", "Motivated"] },
      { text: "A little blue or left out", moods: ["Lonely", "Sad"] },
      { text: "Chill and easy-going", moods: ["Relaxed", "Happy"] },
      { text: "Irritated or overwhelmed", moods: ["Stressed", "Angry", "Confused"] },
    ],
  },
  {
    question: "What kind of activity sounds appealing?",
    options: [
      { text: "Dancing or working out", moods: ["Energetic", "Excited"] },
      { text: "Cuddling up with a book/movie", moods: ["Lonely", "Sad", "Relaxed"] },
      { text: "Trying something new!", moods: ["Motivated", "Happy", "Excited"] },
      { text: "Vent or break something!", moods: ["Angry", "Stressed", "Confused"] },
    ],
  },
  {
    question: "What best matches your thoughts?",
    options: [
      { text: "Life is good!", moods: ["Happy", "Motivated"] },
      { text: "Why is everything so hard today?", moods: ["Stressed", "Angry"] },
      { text: "Nothing makes sense", moods: ["Confused", "Sad"] },
      { text: "I'm relaxed and content", moods: ["Relaxed", "Energetic"] },
    ],
  },
  {
    question: "How are you handling social interactions recently?",
    options: [
      { text: "Making new connections easily!", moods: ["Excited", "Happy", "Motivated"] },
      { text: "Keeping it solo mostly", moods: ["Lonely", "Confused", "Sad"] },
      { text: "Chilling with old friends", moods: ["Relaxed", "Happy"] },
      { text: "Getting annoyed by people", moods: ["Stressed", "Angry"] },
    ],
  },
];

// PUBLIC_INTERFACE
function getRandomVideoIdForMood(mood) {
  const list = videoMap[mood] || [];
  if (!list.length) return "";
  const idx = Math.floor(Math.random() * list.length);
  return list[idx];
}

// PUBLIC_INTERFACE
function isValidYouTubeId(id) {
  return typeof id === "string" && /^[A-Za-z0-9_-]{11}$/.test(id);
}

// PUBLIC_INTERFACE: Get emoji for a mood name
function emojiForMood(mood) {
  return (MOODS.find((m) => m.name === mood) || {}).emoji || "🙂";
}

// PUBLIC_INTERFACE: Shuffle an array
function shuffle(arr) {
  let copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// PUBLIC_INTERFACE: Returns 3 random, unique questions from the pool
function getRandomQuestions() {
  return shuffle(QUIZ_QUESTIONS).slice(0, 3);
}

// PUBLIC_INTERFACE: Determine mood from answers (scoring system)
function calculateMood(selectedAnswers) {
  // selectedAnswers shape: [{ moods: ["Energetic","Excited"] }, ...]
  // Tally points per mood
  const moodTally = {};
  selectedAnswers.forEach((answer) => {
    answer.moods.forEach((m) => {
      moodTally[m] = (moodTally[m] || 0) + 1;
    });
  });
  // Get highest scoring mood(s)
  const topScore = Math.max(...Object.values(moodTally));
  const moodsWithTop = Object.entries(moodTally)
    .filter(([k, v]) => v === topScore)
    .map(([k]) => k);
  // Return a random winning mood if tie
  return moodsWithTop[Math.floor(Math.random() * moodsWithTop.length)];
}

function App() {
  // State: quiz
  const [quizQuestions, setQuizQuestions] = useState(getRandomQuestions());
  const [selectedIndexes, setSelectedIndexes] = useState(Array(3).fill(null)); // user answer index for each question, null = not picked
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [detectedMood, setDetectedMood] = useState("");
  const [videoId, setVideoId] = useState("");
  const [loading, setLoading] = useState(false);

  // Persistent Mood Log State
  const [moodLog, setMoodLog] = useState([]);

  // PUBLIC_INTERFACE: Get mood log from localStorage
  function getStoredMoodLog() {
    try {
      const json = localStorage.getItem('moodmelody_moodlog');
      if (!json) return [];
      const arr = JSON.parse(json);
      // Defensive: ensure correct format [{mood, timestamp}]
      if (Array.isArray(arr)) {
        return arr
          .filter(e => e && e.mood && e.timestamp)
          .sort((a, b) => b.timestamp - a.timestamp);
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  // PUBLIC_INTERFACE: Save mood log to localStorage (latest first, keep max 10)
  function saveMoodLog(logArr) {
    const trimmed = logArr.slice(0, 10);
    localStorage.setItem('moodmelody_moodlog', JSON.stringify(trimmed));
  }

  // On app load, fetch mood log from storage
  React.useEffect(() => {
    setMoodLog(getStoredMoodLog());
  }, []);

  // Reset quiz
  // PUBLIC_INTERFACE
  function resetQuiz() {
    setQuizQuestions(getRandomQuestions());
    setSelectedIndexes(Array(3).fill(null));
    setIsQuizComplete(false);
    setDetectedMood("");
    setVideoId("");
    setLoading(false);
  }

  // Handle choice
  // PUBLIC_INTERFACE
  function handleSelect(qIdx, answerIdx) {
    if (isQuizComplete) return;
    const next = [...selectedIndexes];
    next[qIdx] = answerIdx;
    setSelectedIndexes(next);
    // If quiz is done
    if (next.every((i) => i !== null)) {
      // Compute mood and show video
      setLoading(true);
      setTimeout(() => {
        const pickedAnswers = next.map(
          (ansIdx, i) => quizQuestions[i].options[ansIdx]
        );
        const mood = calculateMood(pickedAnswers);
        setDetectedMood(mood);
        const vid = getRandomVideoIdForMood(mood);
        setVideoId(vid);
        setIsQuizComplete(true);
        setLoading(false);

        // Save to mood log with timestamp
        const now = Date.now();
        const entry = { mood, timestamp: now };
        let previous = getStoredMoodLog();
        // If duplicate consecutive (same mood at same ms), ignore. Else append.
        if (!previous.length || previous[0].mood !== mood || Math.abs(previous[0].timestamp - now) > 1000) {
          const newLog = [entry, ...previous];
          saveMoodLog(newLog);
          setMoodLog(newLog);
        }
      }, 450);
    }
  }

  // PUBLIC_INTERFACE
  function rePickVideo() {
    if (!detectedMood) return;
    setLoading(true);
    setTimeout(() => {
      setVideoId(getRandomVideoIdForMood(detectedMood));
      setLoading(false);
    }, 330);
  }

  // Utility: format timestamp nicely
  function formatDate(ts) {
    const date = new Date(ts);
    // e.g., "2024-06-02 14:33"
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")} ${String(date.getHours()).padStart(2,"0")}:${String(date.getMinutes()).padStart(2,"0")}`;
  }

  return (
    <div
      className="app"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #232526 0%, #414345 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <nav className="navbar" style={{ background: "var(--moodmelody-primary)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div className="logo" style={{ color: "#FBD46D" }}>
              <span
                className="logo-symbol"
                style={{ color: "#F76B8A", fontWeight: "bold" }}
              >♪</span>{" "}
              MoodMelody
            </div>
          </div>
        </div>
      </nav>
      <main
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
        }}
      >
        <div
          className="mm-card"
          style={{
            background: "#191b1c",
            borderRadius: "18px",
            boxShadow: "0 6px 32px 0 rgba(26,24,38,0.2), 0 0px 1.5px 0 rgba(251, 212, 109, 0.15)",
            marginTop: 120,
            minWidth: 340,
            maxWidth: 440,
            padding: "36px 28px 34px 28px",
            width: "94vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {!isQuizComplete && (
            <>
              <div
                className="subtitle"
                style={{
                  color: "var(--moodmelody-secondary)",
                  textAlign: "center",
                  fontWeight: 600,
                  marginBottom: 6,
                  fontSize: "1.12rem",
                }}
              >
                Answer these to find your mood's melody!
              </div>
              <h1
                className="title"
                style={{
                  fontSize: "2.05rem",
                  fontWeight: 700,
                  lineHeight: 1.22,
                  margin: "0 0 24px 0",
                  color: "white",
                  letterSpacing: ".01em",
                }}
              >
                Mood Quiz <span style={{ fontSize: "1.24em", marginLeft: 10 }}>🎵</span>
              </h1>
              <div
                className="description"
                style={{
                  textAlign: "center",
                  color: "rgba(255,255,255,0.85)",
                  marginBottom: "20px",
                  fontSize: "1.09rem",
                  fontWeight: 500,
                  lineHeight: "1.56",
                }}
              >
                We'll ask you 3 quick questions to sense your vibe, then play a song that fits!
              </div>
              <form style={{ width: "100%", marginBottom: 9 }}>
                {quizQuestions.map((q, qIdx) => (
                  <div
                    key={q.question}
                    style={{
                      marginBottom: 20,
                      background: "#232527",
                      borderRadius: 10,
                      padding: "14px 10px 8px 14px",
                    }}
                  >
                    <div
                      style={{
                        color: "#FBD46D",
                        fontWeight: 700,
                        marginBottom: 8,
                        fontSize: "1.08rem",
                        textAlign: "left",
                      }}
                    >
                      Q{qIdx + 1}. {q.question}
                    </div>
                    <div style={{display:"flex", flexDirection:"column", gap:7}}>
                      {q.options.map((opt, oIdx) => (
                        <button
                          key={opt.text}
                          type="button"
                          className="btn"
                          style={{
                            background: selectedIndexes[qIdx] === oIdx
                              ? "linear-gradient(99deg, #F76B8A 0%, #FBD46D 85%)"
                              : "linear-gradient(99deg, #FBD46D 60%, #F76B8A 100%)",
                            color: "#18191D",
                            fontWeight: 600,
                            borderRadius: 8,
                            fontSize: "1.03em",
                            border: selectedIndexes[qIdx] === oIdx ? "2.5px solid #F76B8A" : "none",
                            boxShadow: selectedIndexes[qIdx] === oIdx ? "0 0px 8px #F76B8A60" : "0 2px 8px #FBD46D29",
                            opacity: loading ? 0.6 : 1,
                            pointerEvents: loading ? "none" : "auto"
                          }}
                          disabled={loading}
                          onClick={() => handleSelect(qIdx, oIdx)}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </form>
              <div style={{ color: "#F76B8A", fontSize: "1.04rem", marginTop: 13 }}>
                Powered by YouTube. Song video opens below.
              </div>
              {loading && (
                <div style={{ marginTop: 32, color: "#FBD46D", fontWeight: 600 }}>
                  Analyzing your answers...
                </div>
              )}
            </>
          )}

          {isQuizComplete && (
            <div style={{ width: "100%", textAlign: "center" }}>
              <div
                style={{
                  margin: "0 auto 10px auto",
                  fontSize: "1.26rem",
                  color: "#FBD46D",
                  fontWeight: 700,
                  letterSpacing: ".11rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <span style={{ fontSize: "2em" }}>{emojiForMood(detectedMood)}</span>
                <span>
                  You seem:{" "}
                  <span
                    style={{
                      background: "linear-gradient(97deg, #FBD46D 47%, #F76B8A 100%)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 800,
                      fontSize: "1.12em",
                      padding: "0 3px",
                    }}
                  >
                    {detectedMood}
                  </span>
                </span>
              </div>
              
              <div
                className="video-container"
                style={{
                  marginTop: 8,
                  marginBottom: 12,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {loading ? (
                  <div style={{ color: "#FBD46D", fontWeight: 600, margin: "27px 0 24px" }}>
                    Finding a new video for you...
                  </div>
                ) : isValidYouTubeId(videoId) ? (
                  <>
                    <iframe
                      className="video-embed"
                      title={`YouTube player ${videoId}`}
                      width="96%"
                      height="219"
                      style={{
                        maxWidth: 352,
                        borderRadius: 12,
                        border: "2.2px solid #FBD46D",
                        boxShadow: "0 2px 8px #0c0e0e30",
                        background: "#161718",
                        margin: "0 auto 7px auto",
                        display: "block",
                      }}
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <div style={{ marginBottom: 12 }}>
                      <a
                        href={`https://youtu.be/${videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#F76B8A",
                          textDecoration: "underline",
                          fontWeight: 700,
                          fontSize: "1.09em",
                        }}
                      >
                        Open in YouTube
                      </a>
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      color: "#F76B8A",
                      fontWeight: 500,
                      fontSize: "1.08em",
                      margin: "22px 0",
                    }}
                  >
                    {videoId
                      ? "This video could not be embedded. Try again!"
                      : "No song found for this mood."}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", gap: 9, marginTop: 8, marginBottom: 5, justifyContent: "center" }}>
                <button
                  className="btn btn-large"
                  onClick={rePickVideo}
                  style={{
                    background: "linear-gradient(90deg, #FBD46D 50%, #F76B8A 98%)",
                    color: "#161616",
                    fontWeight: 700,
                    fontSize: "1.08rem",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 14px",
                    margin: "0 2px",
                    cursor: "pointer",
                  }}
                  disabled={loading}
                >
                  {loading ? "Finding..." : "Play Another"}
                </button>
                <button
                  className="btn btn-large"
                  onClick={resetQuiz}
                  style={{
                    background: "linear-gradient(90deg, #F76B8A 45%, #FBD46D 98%)",
                    color: "#161616",
                    fontWeight: 700,
                    fontSize: "1.08rem",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 12px",
                    margin: "0 2px",
                    cursor: "pointer",
                  }}
                  disabled={loading}
                >
                  Try Again
                </button>
              </div>
              {/* Mood log display */}
              <div
                style={{
                  marginTop: 24,
                  padding: "13px 8px 6px 8px",
                  background: "#222328",
                  borderRadius: 10,
                  boxShadow: "0 2px 8px #2223281b",
                  textAlign: "left",
                  maxWidth: 350,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <div style={{
                  color: "#FBD46D",
                  fontWeight: 600,
                  fontSize: "1.03em",
                  marginBottom: 7,
                  letterSpacing: ".01em"
                }}>Your recent moods</div>
                <ul style={{
                  paddingLeft: 0,
                  margin: "0 0 2px 0",
                  listStyle: "none",
                  color: "#FFFCD3",
                  fontSize: "1em"
                }}>
                  {moodLog.length === 0 ? (
                    <li style={{color:"#F76B8A"}}>No moods logged yet.</li>
                  ) : (
                    moodLog.slice(0, 10).map((entry, idx) => (
                      <li key={entry.timestamp}
                        style={{
                          marginBottom: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          fontWeight: idx === 0 ? 700 : 450,
                          fontSize: idx === 0 ? "1.05em" : "0.99em"
                        }}>
                        <span style={{
                          marginRight: 8,
                          fontSize: "1.19em"
                        }}>{emojiForMood(entry.mood)}</span>
                        <span style={{marginRight: 8}}>{entry.mood}</span>
                        <span style={{
                          color: "#FBD46D",
                          fontSize: "0.92em",
                          fontWeight: 450,
                          marginLeft: "auto"
                        }}>{formatDate(entry.timestamp)}</span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer
        style={{
          textAlign: "center",
          color: "#999",
          background: "var(--moodmelody-primary)",
          padding: "22px 0 0 0",
          fontSize: "0.98rem",
        }}
      >
        <span style={{ color: "#FBD46D" }}>MoodMelody</span> &copy; 2024
      </footer>
    </div>
  );
}

export default App;
