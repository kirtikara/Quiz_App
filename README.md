# Quiz App (React)

A responsive quiz application built with React (functional components + hooks). It supports difficulty selection, per-question timer, progress indicator, answer review, and local high scores.

## Features

- Difficulty levels: easy, medium, hard (select on Start page)
- Questions loaded from `public/questions.json` and filtered by difficulty
- One question at a time, 4 options
- 30s timer per question; auto-lock and auto-advance when time runs out
- Progress: “Question X of Y” + progress bar with percentage
- Prevents advancing without a selection (unless time runs out)
- Results page with full summary: your answer vs correct answer, correctness chips
- High scores persisted to `localStorage` (top 5, includes difficulty and date)
- Accessible: focus management, ARIA roles/labels, keyboard-friendly buttons
- Subtle animations and a modern theme (dark UI)

## Screens

- Start: select difficulty and begin
- Quiz: question view with options, timer, Previous/Next/Finish
- Results: final score, detailed summary, high scores, restart

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```
2. Start the development server
   ```bash
   npm start
   ```
   Open `http://localhost:3000/` (or the prompted port) in your browser.

## Build

```bash
npm run build
```
Outputs an optimized production build to `build/`.

## Project Structure

```
src/
  App.js                # routing and lifted quiz state
  index.js              # app bootstrap + router
  index.css             # global theme and styles
  components/
    ProgressBar.js
    QuestionCard.js
    ResultCard.js
  pages/
    StartPage.js        # difficulty selection
    QuizPage.js         # question flow + timer + progress
    ResultPage.js       # summary + high scores
public/
  questions.json        # data source (tagged with difficulty)
```

## Configuration

- Questions: edit `public/questions.json`. Fields: `id`, `question`, `options[]`, `answerIndex`, `difficulty`.
- Number of questions: currently the app takes up to 5 per chosen difficulty (see `App.js`).

## Notes

- If port 3000 is in use, the dev server will prompt to use another port (e.g., 3001).
- To reset high scores, clear `localStorage` key `highScores` in your browser devtools.

## Future Enhancements

- Fetch from Open Trivia DB with normalization and error handling
- Light/dark theme toggle
- Per-question explanations
