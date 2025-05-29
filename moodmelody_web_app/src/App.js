import React, { useState } from "react";
import "./App.css";

// Expanded videoMap for 10 moods with multiple YouTube IDs each
const videoMap = {
  Happy: ["ZbZSe6N_BXs", "HgzGwKwLmgM", "y6Sxv-sUYtM", "LsoLEjrDogU"],
  Sad: ["RgKAFK5djSk", "hLQl3WQQoQ0", "hoNb6HuNmU0", "bwAWN-BWRnA"],
  Angry: ["hLQl3WQQoQ0", "hTWKbfoikeg", "fJ9rUzIMcZQ", "ktvTqknDobU"],
  Relaxed: ["vKJ7Hkrr7zQ", "bwAWN-BWRnA", "JGwWNGJdvx8"],
  Stressed: ["vKJ7Hkrr7zQ", "bwAWN-BWRnA", "hoNb6HuNmU0"],
  Confused: ["kXYiU_JCYtU", "hTWKbfoikeg", "fJ9rUzIMcZQ"],
  Energetic: ["Fp8msa5uYsc", "ktvTqknDobU", "ZbZSe6N_BXs"],
  Motivated: ["d-diB65scQU", "HvWUMvFQk_s", "9bZkp7q19f0", "Fp8msa5uYsc"],
  Lonely: ["hLQl3WQQoQ0", "RgKAFK5djSk", "bwAWN-BWRnA"],
  Excited: ["fJ9rUzIMcZQ", "Fp8msa5uYsc", "ktvTqknDobU", "d-diB65scQU"],
};

// Moods, emojis, and color accents for buttons
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

// Returns a valid random YouTube ID for the given mood
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

function App() {
  // Local state: currently selected mood & picked video ID
  const [selectedMood, setSelectedMood] = useState("");
  const [currentVideoId, setCurrentVideoId] = useState("");
  const [loading, setLoading] = useState(false);

  // Button click: handle mood selection and pick video
  // PUBLIC_INTERFACE
  const handleMoodPick = (mood) => {
    setSelectedMood(mood);
    setLoading(true);
    // Simulate playful delay (feel fun, smooth)
    setTimeout(() => {
      const videoId = getRandomVideoIdForMood(mood);
      setCurrentVideoId(videoId);
      setLoading(false);
    }, 350);
  };

  // Get mood emoji for playful feedback
  function emojiForMood(mood) {
    return (MOODS.find((m) => m.name === mood) || {}).emoji || "🙂";
  }

  // Play Another! (resets video for same mood, or entire app)
  // PUBLIC_INTERFACE
  const rePickVideo = () => {
    setLoading(true);
    setTimeout(() => {
      const videoId = getRandomVideoIdForMood(selectedMood);
      setCurrentVideoId(videoId);
      setLoading(false);
    }, 300);
  };

  // Change mood (reset UI)
  // PUBLIC_INTERFACE
  const resetAll = () => {
    setSelectedMood("");
    setCurrentVideoId("");
    setLoading(false);
  };

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
          {!selectedMood && (
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
                Select your mood and we'll play a video that fits!
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
                How are you feeling?<span style={{ fontSize: "1.24em", marginLeft: 10 }}>🎵</span>
              </h1>
              <div
                className="description"
                style={{
                  textAlign: "center",
                  color: "rgba(255,255,255,0.85)",
                  marginBottom: "28px",
                  fontSize: "1.09rem",
                  fontWeight: 500,
                  lineHeight: "1.7",
                }}
              >
                Ten moods, ten vibes. Click a mood and get a musical match instantly!
              </div>
              <div
                className="mood-btns"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "13px 17px",
                  width: "100%",
                  marginBottom: 13,
                  maxWidth: 370,
                }}
              >
                {MOODS.map((mood) => (
                  <button
                    key={mood.name}
                    className="btn mood-btn"
                    type="button"
                    onClick={() => handleMoodPick(mood.name)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 13,
                      background: "linear-gradient(99deg, #FBD46D 60%, #F76B8A 100%)",
                      color: "#18191D",
                      fontWeight: 600,
                      fontSize: "1.09em",
                      padding: "16px 6px 10px 6px",
                      minWidth: 102,
                      minHeight: 64,
                      cursor: "pointer",
                      border: "none",
                      transition: "box-shadow 0.12s, background 0.1s",
                      boxShadow: "0 2px 10px #FBD46D29",
                    }}
                  >
                    <span style={{ fontSize: "1.72em", marginBottom: 2 }}>{mood.emoji}</span>
                    {mood.name}
                  </button>
                ))}
              </div>
              <div style={{ color: "#F76B8A", fontSize: "1.04rem", marginTop: 23 }}>
                Powered by YouTube. Videos open below ⬇️
              </div>
            </>
          )}

          {selectedMood && (
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
                <span style={{ fontSize: "2em" }}>{emojiForMood(selectedMood)}</span>
                <span>
                  Your Mood:{" "}
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
                    {selectedMood}
                  </span>
                </span>
              </div>
              <div
                className="video-container"
                style={{
                  marginTop: 4,
                  marginBottom: 10,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {loading ? (
                  <div style={{ color: "#FBD46D", fontWeight: 600, margin: "27px 0 24px" }}>
                    Finding a video for you...
                  </div>
                ) : isValidYouTubeId(currentVideoId) ? (
                  <>
                    <iframe
                      className="video-embed"
                      title={`YouTube player ${currentVideoId}`}
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
                      src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0`}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <div style={{ marginBottom: 12 }}>
                      <a
                        href={`https://youtu.be/${currentVideoId}`}
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
                    {currentVideoId
                      ? "This video could not be embedded. Try again!"
                      : "No video found for this mood."}
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
                  onClick={resetAll}
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
                  Choose Mood
                </button>
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
