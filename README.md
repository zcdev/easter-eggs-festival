# Easter Eggs Festival 🐣

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React.js](https://img.shields.io/badge/React.js-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

## 🌐 Live Demo
Pick mystery eggs here: [easter-eggs-festival.vercel.app](https://easter-eggs-festival.vercel.app/) — match the target score, but don't go over!

## Overview
**Deliverable:** A strategic number-memory game built with React.js. Features custom sound design that is both accessible and user-friendly, creating a fun and inclusive experience suitable for all ages.

**Purpose:** To give players a delightful way to practice basic math and memory skills.

## 🛠️ Tech Stack
- **Framework:** React.js
- **Language:** JavaScript / TypeScript
- **Deployment:** Vercel

## ✨ Features
- Mystery egg values change dynamically each round
- Modal feedback on win / loss with clear “Play Again” or “Try Again” options
- Scoreboard tracking wins, losses, current score, and target score
- Custom sound effects for win / loss outcomes with a mute toggle  
  → [Sound clips](https://github.com/zcdev/easter-eggs-festival/tree/main/public/assets/sounds) created in Logic Pro — free to use with metadata retained
- Mobile-first responsive layout with smooth CSS3 transitions and animations
- Fully keyboard-accessible and screen reader-friendly

## 📚 What I Learned
- Challenged myself to learn useReducer() from the React docs alone and confirmed the takeaways by ChatGPT.
- Experimented with the nullish coalescing operator (??) to default action.payload, but realized it wasn't applicable since the payload was undefined, ended up using separate dispatched actions instead.
- Gained a better understanding of useEffect(), and also clarified a misconception about useRef(): Not to use it with audio playback since referencing a persistent DOM element wasn't needed.
- Confirmed WCAG guidelines don’t require controls unless sound plays automatically for more than 3 seconds and can’t be paused or stopped.
- Explored CSS3 animations with ChatGPT, and implemented subtle modal fade/pop effects for better interaction feedback.

## ⚡ Getting Started
```
git clone https://github.com/zcdev/easter-eggs-festival.git
cd easter-eggs-festival
```

## 🙏 Credits
- **[Vecteezy](https://vecteezy.com)** – Graphic assets for the eggs and grass

Created by [Zoe Chang](https://github.com/zcdev)    
Designed, developed, and deployed with 🌸  
Inspired and informed through collaborative learning with ChatGPT. 
(Originally developed in the UCBX curriculum)

![GitHub repo size](https://img.shields.io/github/repo-size/zcdev/mytechiecookie)
![GitHub last commit](https://img.shields.io/github/last-commit/zcdev/mytechiecookie)