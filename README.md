# Easter Eggs Festival 🐣

A strategic number-memory game built with React.  
Match the target score by picking mystery eggs — but don't go over!

🔗 **Live Demo:** [easter-eggs-festival.vercel.app](https://easter-eggs-festival.vercel.app/)

## Overview

**Easter Eggs Festival** is a single-page application rebuilt from jQuery  
(`jquery-3.3.1` with Bootstrap) to modern **React `v19.1.0`**.  
This project focuses on refining accessibility, interaction design, and user experience. It was rebuilt using a mobile-first approach for a simpler, friendlier layout and enhanced with custom sound effects — following modern frontend best practices.

## 🎮 Features

- 🥚 Mystery egg values change every round
- 💬 Modal feedback on win/loss with “Play Again” or “Try Again” options
- ✅ Score tracking: wins, losses, current, and target scores
- 🔈 Sound effects for win/loss outcomes with mute toggle  
  → [Sound clips](https://github.com/zcdev/easter-eggs-festival/tree/main/public/assets/sounds) created in Logic Pro — feel free to use them royalty-free (please retain metadata)
- 📱 Mobile-first responsive layout with CSS3 transitions and animations
- ♿️ Fully keyboard-accessible and screen reader–friendly
## 🛠 Tech Stackk

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- CSS Grid & Flexbox
- CSS transitions & keyframe animations
- No UI framework — custom styling only
- Deployed via Vercel

## 🚀 Run Locally

```bash
git clone https://github.com/your-username/easter-eggs-festival.git
cd easter-eggs-festival
npm install
npm run dev
```

## 🧠 Developer Notes

This project is part of my personal portfolio rebuild initiative, where I modernized the original [legacy project](https://github.com/zcdev/Unit-4-Game-old) from my bootcamp at [UCBX](https://extension.berkeley.edu/) using current React standards and accessibility principles.

### Key Takeaways

💪 I challenged myself to learn useReducer() from the React docs alone, but needed help understanding how action objects worked. I consulted ChatGPT and was happy to figure it out with some trial and error.

🌀 I experimented with the nullish coalescing operator (??) to default action.payload, but realized it wasn't applicable since the payload was undefined — I ended up using separate dispatched actions instead.

💡 I gained a better understanding of useEffect(), and also clarified a misconception about useRef(): I initially tried to use it with audio playback, but it wasn’t suited for my use case since I wasn’t referencing a persistent DOM element.

🔈 WCAG guidelines don’t require controls unless sound plays automatically for more than 3 seconds and can’t be paused or stopped — so my design complies.

🤖 I used ChatGPT to explore CSS3 animations, and implemented subtle modal fade/pop effects for better interaction feedback.

## 🙏 Acknowledgements

- **[Vecteezy](https://vecteezy.com)** – Graphic assets for the eggs and grass
- **[OpenAI's ChatGPT](https://chatgpt.com)** – Assisted with code refactoring, best practices, and content guidance

Created by ZCDEV — Designed, developed, and deployed with 🌸