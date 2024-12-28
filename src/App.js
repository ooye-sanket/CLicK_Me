import React, { useState, useRef, useEffect } from 'react';
import './App.css';


  const handleNameChange = (e) => {
    setName(e.target.value);
    adjustInputWidth();
  };

  const adjustInputWidth = () => {
    if (inputRef.current) {
      inputRef.current.style.width = `${Math.max(150, inputRef.current.scrollWidth)}px`;
    }
  };

  useEffect(() => {
    adjustInputWidth();
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setQuestionVisible(true), 1000);
  };

  const handleAnswer = (answer) => {
    setAnswer(answer);
  };

  const moveNoButton = () => {
    if (noButtonRef.current) {
      const x = Math.random() * (window.innerWidth - 100);
      const y = Math.random() * (window.innerHeight - 40);
      noButtonRef.current.style.position = 'fixed';
      noButtonRef.current.style.left = `${x}px`;
      noButtonRef.current.style.top = `${y}px`;
    }
  };

  const numBubbles = 50;
  const bubbles = Array.from({ length: numBubbles }, (_, i) => {
    const leftPosition = Math.random() * 100;
    const animationDuration = 4 + Math.random() * 3;
    const animationDelay = Math.random() * 5;

    return (
      <div
        key={i}
        className="bubble"
        style={{
          left: `${leftPosition}%`,
          animationDuration: `${animationDuration}s`,
          animationDelay: `${animationDelay}s`,
        }}
      ></div>
    );
  });

  return (
    <div className="App">
      {bubbles}
      {!submitted && (
        <form onSubmit={handleSubmit} className="name-form">
          <label>
            What is your <span className="highlight-word">name</span>?
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              required
              ref={inputRef}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
      {submitted && questionVisible && !answer && (
        <div className="question">
          <p>Hey, {name}! Do you LOVE me!?🤭</p>
          <div className="answer-buttons">
            <button onClick={() => handleAnswer('yes')}>YES</button>
            <button 
              ref={noButtonRef} 
              onMouseEnter={moveNoButton}
              onClick={() => handleAnswer('no')}
            >
              NO
            </button>
          </div>
        </div>
      )}
{answer && (
  <div className="question">
    <p>Thanks for your honesty, {name}!</p>
    <p className="user-answer">
      Your answer: {answer === 'yes' ? (
        <>Yes, I am a <span className="highlight-word">fool</span>.</>
      ) : (
        'Nice try, but we know the truth! 😉'
      )}
    </p>
  </div>
)}
    </div>
  );
}

export default App;
