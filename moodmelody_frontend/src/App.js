import React from 'react';
import './App.css';
import MoodMelody from './MoodMelody';

function App() {
  return (
    <div className="app">
      {/* A minimal top bar only on desktop screens */}
      <nav className="navbar" style={{ background: "#0c0e0e", borderBottom: "1px solid #222" }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol" style={{ color: "#FBD46D" }}>♪</span> MoodMelody
            </div>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                background: "#F76B8A",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>
      <main style={{ marginTop: 90, minHeight: "calc(100vh - 90px)", background: "#0c0e0e" }}>
        <MoodMelody />
      </main>
    </div>
  );
}

export default App;