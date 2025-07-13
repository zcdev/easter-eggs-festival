// Helper function to play a sound clip base on win or loss game status
export function playSound(status) {
  // Sound clip for win
  const winSound = './assets/sounds/easter-eggs-festival-fx-win.mp3'
  // Sound clip for loss
  const lossSound = './assets/sounds/easter-eggs-festival-fx-loss.mp3'
  // select audio source depending on game outcome
  const source = status === 'win' ? winSound : lossSound
  // Create an Audio instance for playback
  const sound = new Audio(source)
  // Play the sound or log any playback error
  sound.play().catch((err) => console.error("Audio failed", err))
}
