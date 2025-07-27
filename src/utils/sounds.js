let currentAudio = null

// Play a sound clip based on game outcome ('win' or 'loss')
export function playSound(status) {
  // Sound clip for win
  const winSound = '/assets/sounds/easter-eggs-festival-fx-win.mp3'
  // Sound clip for loss
  const lossSound = '/assets/sounds/easter-eggs-festival-fx-loss.mp3'
  // Choose audio source depending on the outcome
  const source = status === 'win' ? winSound : lossSound
  // Create an Audio instance for playback
  currentAudio = new Audio(source)
  // Play the sound or log any playback error
  currentAudio.play().catch((err) => console.error("Audio failed", err))
}

// Stop currently playing audio immediately
export function stopSound() {
    if (currentAudio) {
    currentAudio.pause()
    currentAudio.currentTime = 0
  }
}
