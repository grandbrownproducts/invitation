let audioInstance: HTMLAudioElement | null = null;

/** Shared singleton background music element so playback state is consistent across components. */
export function getBackgroundAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;

  if (!audioInstance) {
    audioInstance = new Audio("/music/song.mp3");
    audioInstance.loop = true;
  }

  return audioInstance;
}

export async function playBackgroundAudio(): Promise<void> {
  const audio = getBackgroundAudio();
  if (!audio) return;

  try {
    await audio.play();
  } catch {
    // Autoplay restrictions — user can press the music button instead.
  }
}
