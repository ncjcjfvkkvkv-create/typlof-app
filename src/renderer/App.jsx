import React, { useState, useEffect } from 'react';
import './styles/app.css';
import faLessons from '../languages/fa_lessons.json';
import enLessons from '../languages/en_lessons.json';

const App = () => {
  const [lang, setLang] = useState('fa');
  const [lessons, setLessons] = useState(faLessons.lessons);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [typed, setTyped] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [startTime, setStartTime] = useState(null);
  const [errors, setErrors] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentWords = lessons[currentLesson]?.words || [];
  const currentWord = currentWords[wordIndex] || '';

  const changeLanguage = (newLang) => {
    setLang(newLang);
    setLessons(newLang === 'fa' ? faLessons.lessons : enLessons.lessons);
    setCurrentLesson(0);
    setWordIndex(0);
    setTyped('');
    setCompleted(false);
    setErrors(0);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
  };

  const handleKeyPress = (key) => {
    if (completed) return;
    if (!startTime) setStartTime(Date.now());

    if (key === 'Backspace') {
      setTyped(prev => prev.slice(0, -1));
      return;
    }

    if (key === ' ') {
      if (typed === currentWord) {
        setWordIndex(prev => prev + 1);
        setTyped('');
        if (wordIndex + 1 >= currentWords.length) {
          setCompleted(true);
        }
      } else {
        setErrors(prev => prev + 1);
        setTyped('');
      }
      return;
    }

    setTyped(prev => prev + key);
  };

  useEffect(() => {
    if (startTime && wordIndex > 0) {
      const elapsed = (Date.now() - startTime) / 60000;
      const chars = currentWords.slice(0, wordIndex).join(' ').length;
      const wpm = Math.round((chars / 5) / elapsed);
      setWpm(wpm || 0);
    }

    const total = wordIndex + (typed.length > 0 ? 1 : 0);
    const acc = total > 0 ? Math.round(((total - errors) / total) * 100) : 100;
    setAccuracy(Math.max(0, acc));
  }, [wordIndex, typed, errors, startTime, currentWords]);

  const nextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(prev => prev + 1);
      setWordIndex(0);
      setTyped('');
      setCompleted(false);
      setErrors(0);
      setStartTime(null);
      setWpm(0);
      setAccuracy(100);
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(prev => prev - 1);
      setWordIndex(0);
      setTyped('');
      setCompleted(false);
      setErrors(0);
      setStartTime(null);
      setWpm(0);
      setAccuracy(100);
    }
  };

  const keyboard = lang === 'fa' ? {
    rows: [
      ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح'],
      ['ش', 'س', 'ی', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ک'],
      ['ظ', 'ط', 'ز', 'ر', 'ذ', 'د', 'پ']
    ]
  } : {
    rows: [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ]
  };

  const totalLessons = lessons.length;

  return (
    <div className="app">
      <div className="bg-glow"></div>
      
      <header className="header">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">Typlof</span>
          <span className="logo-badge">{lang === 'fa' ? 'فارسی' : 'English'}</span>
        </div>
        <div className="header-controls">
          <button className="nav-btn" onClick={prevLesson} disabled={currentLesson === 0}>
            ◀
          </button>
          <span className="lesson-counter">
            {currentLesson + 1} / {totalLessons}
          </span>
          <button className="nav-btn" onClick={nextLesson} disabled={currentLesson >= totalLessons - 1}>
            ▶
          </button>
          <button className="lang-btn" onClick={() => changeLanguage(lang === 'fa' ? 'en' : 'fa')}>
            {lang === 'fa' ? '🇬🇧 English' : '🇮🇷 فارسی'}
          </button>
        </div>
      </header>

      <main className="main">
        <div className="lesson-info">
          <h2>{lessons[currentLesson]?.title || ''}</h2>
          <p>{lessons[currentLesson]?.subtitle || ''}</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{width: `${(wordIndex / currentWords.length) * 100}%`}}></div>
          </div>
        </div>

        <div className="words-container">
          {currentWords.map((w, i) => (
            <span key={i} className={`word ${i < wordIndex ? 'done' : i === wordIndex ? 'current' : ''}`}>
              {w}
            </span>
          ))}
        </div>

        <div className="input-box">
          <span className="typed">{typed}</span>
          <span className="cursor">▮</span>
        </div>

        <div className="stats">
          <div className="stat">
            <span className="stat-icon">⚡</span>
            <span className="stat-value">{wpm}</span>
            <span className="stat-label">WPM</span>
          </div>
          <div className="stat">
            <span className="stat-icon">🎯</span>
            <span className="stat-value">{accuracy}%</span>
            <span className="stat-label">{lang === 'fa' ? 'دقت' : 'Accuracy'}</span>
          </div>
          <div className="stat">
            <span className="stat-icon">📝</span>
            <span className="stat-value">{wordIndex}/{currentWords.length}</span>
            <span className="stat-label">{lang === 'fa' ? 'کلمات' : 'Words'}</span>
          </div>
          <div className="stat">
            <span className="stat-icon">❌</span>
            <span className="stat-value">{errors}</span>
            <span className="stat-label">{lang === 'fa' ? 'خطا' : 'Errors'}</span>
          </div>
        </div>

        <div className="keyboard">
          {keyboard.rows.map((row, ri) => (
            <div key={ri} className="row">
              {row.map(key => (
                <div 
                  key={key} 
                  className="key"
                  onClick={() => handleKeyPress(key)}
                >
                  <span className="key-char">{key}</span>
                </div>
              ))}
            </div>
          ))}
          <div className="row special-keys">
            <div className="key space-key" onClick={() => handleKeyPress(' ')}>
              <span className="key-char">{lang === 'fa' ? 'فاصله' : 'Space'}</span>
            </div>
            <div className="key backspace-key" onClick={() => handleKeyPress('Backspace')}>
              <span className="key-char">⌫</span>
            </div>
          </div>
        </div>

        {completed && (
          <div className="completed-message">
            <span>🎉</span>
            <span>{lang === 'fa' ? 'تبریک! درس را کامل کردی!' : 'Congratulations! You completed this lesson!'}</span>
            <button className="next-btn" onClick={nextLesson}>
              {lang === 'fa' ? 'درس بعدی ▶' : 'Next Lesson ▶'}
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        <span>⚡ Typlof © 2025 — {totalLessons} {lang === 'fa' ? 'درس فارسی' : 'English Lessons'}</span>
      </footer>
    </div>
  );
};

export default App;
