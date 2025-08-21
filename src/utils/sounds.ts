let currentAudio: HTMLAudioElement | null = null;

// Define the only valid statuses
type SoundStatus = "won" | "loss";

export function playSound(status: SoundStatus) {
  const winSound = "/assets/sounds/easter-eggs-festival-fx-win.mp3";
  const lossSound = "/assets/sounds/easter-eggs-festival-fx-loss.mp3";

  // Pick correct source
  const source = status === "won" ? winSound : lossSound;

  // Stop any existing audio before starting new one
  stopSound();

  currentAudio = new Audio(source);

  currentAudio
    .play()
    .catch((err: DOMException) => console.error("Audio failed", err));
}

export function stopSound() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null; // reset for cleanliness
  }
}
