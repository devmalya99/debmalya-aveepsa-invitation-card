export type OpeningBeatId = "couple" | "families" | "festivities";

type Listener = (beat: OpeningBeatId) => void;

const listeners = new Set<Listener>();

/** Push an explicit opening card (auto-play / swipe) so UI does not wait on ST lag. */
export function emitOpeningBeat(beat: OpeningBeatId) {
  listeners.forEach((listener) => listener(beat));
}

export function subscribeOpeningBeat(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
