import React, { useState } from 'react';
import './App.css';

/*
MoodMelody (MoodTune) - Main Container Implementation

Features:
- Randomized Emotional Questions (3 from a pool of 5 per session)
- Mood Detection Logic (score-based: Happy, Neutral, Stressed, Sad/Angry)
- YouTube Song Suggestion (by mood, embedded iframe)
- Friendly Mood Message
- Try Again Button
- Styled per specified palette and layout

Color Palette:
  primary:   #0c0e0e
  secondary: #FBD46D
  accent:    #F76B8A

Card layout is centered, clean, with step-by-step flow and friendly typography.
*/

const MOOD_DATA = {
  Happy: {
    message: "You're radiating good vibes! Celebrate your happiness with this tune:",
    youtubeId: 'ZbZSe6N_BXs', // Happy - Pharrell Williams
    color: '#FBD46D'
  },
  Neutral: {
    message: "You're feeling balanced. Enjoy a mellow melody to keep things smooth:",
    youtubeId: 'wp43OdtAAkM', // Let It Be - Beatles
    color: '#7DDFFF'
  },
  Stressed: {
    message: 'It seems like things are a bit overwhelming. Relax and unwind with this chill track:',
    youtubeId: 'VPRjCeoBqrI', // Weightless - Marconi Union
    color: '#A7CEDF'
  },
  'Sad/Angry': {
    message: "It's okay to feel down or upset. Music can heal—here's something soulful for you:",
    youtubeId: 'hLQl3WQQoQ0', // Someone Like You - Adele
    color: '#F76B8A'
  }
};

// The pool of questions (5). Each answer has a score (1–4).
const QUESTIONS = [
  {
    question: "How did you feel waking up today?",
    options: [
      { text: "Energized and excited", score: 4 },
      { text: "Okay, nothing special", score: 3 },
      { text: "A bit tired or anxious", score: 2 },
      { text: "Unhappy or frustrated", score: 1 }
    ]
  },
  {
    question: "How do you handle unexpected challenges?",
    options: [
      { text: "I stay positive and adapt quickly", score: 4 },
      { text: "I try to find solutions calmly", score: 3 },
      { text: "I get a bit stressed but manage", score: 2 },
      { text: "I feel overwhelmed or upset", score: 1 }
    ]
  },
  {
    question: "How was your social interaction lately?",
    options: [
      { text: "Very uplifting and pleasant", score: 4 },
      { text: "Mostly neutral", score: 3 },
      { text: "A little isolating", score: 2 },
      { text: "Negative or confrontational", score: 1 }
    ]
  },
  {
    question: "How do you see your current workload?",
    options: [
      { text: "Easy, enjoyable pace", score: 4 },
      { text: "Manageable, nothing excessive", score: 3 },
      { text: "A bit too much at times", score: 2 },
      { text: "Very stressful or unmanageable", score: 1 }
    ]
  },
  {
    question: "What best describes your mood right now?",
    options: [
      { text: "Bright and optimistic!", score: 4 },
      { text: "All right, doing fine", score: 3 },
      { text: "Worried or distracted", score: 2 },
      { text: "Blue or irritable", score: 1 }
    ]
  }
];

// Shuffle helper
function getRandomQuestions(n, questions) {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

// Mood detection logic based on total score
function detectMood(total) {
  if (total >= 10) return 'Happy';
  if (total >= 8) return 'Neutral';
  if (total >= 6) return 'Stressed';
  return 'Sad/Angry';
}

// PUBLIC_INTERFACE
function MoodTuneApp() {
  const [quizQuestions, setQuizQuestions] = useState(getRandomQuestions(3, QUESTIONS));
  const [answers, setAnswers] = useState([null, null, null]);
  const [step, setStep] = useState(0); // 0: quiz, 1: result

  // Handler for answering questions (one by one flow)
  const handleAnswer = (qIdx, oIdx) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = oIdx;
    setAnswers(newAnswers);
  };

  const allAnswered = answers.every(a => a !== null);

  // Calculate mood/results
  let mood = null, total = null;
  if (step === 1) {
    total = answers.reduce(
      (sum, ans, idx) => sum + (quizQuestions[idx].options[ans]?.score || 0),
      0
    );
    mood = detectMood(total);
  }

  // Reset state for Try Again
  const handleTryAgain = () => {
    setQuizQuestions(getRandomQuestions(3, QUESTIONS));
    setAnswers([null, null, null]);
    setStep(0);
  };

  // Styling: palette variables inline for card and buttons
  const palette = {
    primary: '#0c0e0e',
    secondary: '#FBD46D',
    accent: '#F76B8A',
    card: 'rgba(12,14,14,0.98)',
    cardBorder: '1.5px solid #FBD46D',
    button: '#FBD46D'
  };

  return (
    <div className="app" style={{ backgroundColor: palette.primary, minHeight: '100vh' }}>
      <nav className="navbar" style={{ backgroundColor: palette.primary, borderBottom: palette.cardBorder }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol" style={{ color: palette.accent, fontSize: 26, fontWeight: 700 }}>♪</span> MoodTune
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="container" style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              maxWidth: 420,
              width: '100%',
              margin: '120px auto',
              padding: '36px 32px 32px 32px',
              borderRadius: 24,
              boxShadow: '0 6px 48px rgba(0,0,0,0.18)',
              background: palette.card,
              border: palette.cardBorder,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            {step === 0 && (
              <>
                <div style={{
                  color: palette.secondary,
                  fontWeight: 700,
                  marginBottom: 4,
                  fontSize: '1.05rem'
                }}>
                  How Are You Feeling?
                </div>
                <h1 style={{
                  fontSize: '2.2rem',
                  fontWeight: 600,
                  margin: '2px 0 12px 0',
                  letterSpacing: 0.3
                }}>Mood Melody Quiz</h1>
                <div style={{
                  fontSize: '1.06rem',
                  color: 'rgba(255,255,255,0.68)',
                  marginBottom: 12,
                  textAlign: 'center'
                }}>
                  Answer these 3 quick questions to discover your mood and get a perfect song suggestion!
                </div>
                <form style={{ width: '100%', marginTop: 12 }}>
                  {quizQuestions.map((q, qIdx) => (
                    <div key={qIdx}
                      style={{
                        marginBottom: 24,
                        padding: '12px 0 0 0',
                        borderTop: qIdx === 0 ? undefined : '1px solid rgba(255,255,255,0.09)'
                      }}>
                      <div style={{
                        fontWeight: 500,
                        fontSize: '1.06rem',
                        marginBottom: 9,
                        color: palette.secondary
                      }}>{q.question}</div>
                      <div>
                        {q.options.map((opt, oIdx) => (
                          <label key={oIdx} style={{
                            display: 'block',
                            marginBottom: 7,
                            fontWeight: answers[qIdx] === oIdx ? 600 : 400,
                            color: answers[qIdx] === oIdx ? palette.accent : 'white',
                            cursor: 'pointer',
                            borderRadius: 8,
                            padding: '3px 4px'
                          }}>
                            <input
                              name={`q-${qIdx}`}
                              type="radio"
                              checked={answers[qIdx] === oIdx}
                              onChange={() => handleAnswer(qIdx, oIdx)}
                              style={{
                                accentColor: palette.accent,
                                marginRight: 7
                              }}
                            />
                            {opt.text}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-large"
                    style={{
                      width: '100%',
                      marginTop: 10,
                      background: allAnswered ? palette.button : 'rgba(251,212,109,0.35)',
                      color: palette.primary,
                      fontWeight: 600,
                      cursor: allAnswered ? 'pointer' : 'not-allowed',
                      borderRadius: 6
                    }}
                    disabled={!allAnswered}
                    onClick={() => setStep(1)}
                  >
                    See Your Mood & Song
                  </button>
                </form>
              </>
            )}
            {step === 1 && mood && (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <div style={{
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: MOOD_DATA[mood].color,
                  marginBottom: 8,
                  letterSpacing: '0.01em'
                }}>
                  Your Mood: {mood}
                </div>
                <div style={{
                  fontWeight: 500,
                  fontSize: '1.08rem',
                  color: 'white',
                  marginBottom: 10
                }}>
                  {MOOD_DATA[mood].message}
                </div>
                <div style={{
                  borderRadius: 13,
                  overflow: 'hidden',
                  margin: '16px 0 14px 0',
                  boxShadow: '0 2px 14px rgba(247,107,138,0.12)'
                }}>
                  {/* Embedded YouTube player */}
                  <iframe
                    title="YouTube Song Suggestion"
                    width="325"
                    height="185"
                    src={`https://www.youtube.com/embed/${MOOD_DATA[mood].youtubeId}`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    style={{ border: '2px solid #FBD46D', borderRadius: 13 }}
                  ></iframe>
                </div>
                <button
                  className="btn btn-large"
                  style={{
                    background: palette.accent,
                    color: 'white',
                    marginTop: 10,
                    fontWeight: 600,
                    borderRadius: 6
                  }}
                  onClick={handleTryAgain}
                >Try Again</button>
                <div style={{ marginTop: 18, fontSize: '0.93rem', color: palette.secondary }}>
                  Music matches your mood with ❤️ from MoodTune
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MoodTuneApp;
