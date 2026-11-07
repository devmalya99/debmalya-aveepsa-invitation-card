import { WEDDING } from "@/config/wedding";

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  complete: boolean;
};

const ceremonyMs = Date.parse(WEDDING.ceremonyStartsAt);

export function getCountdownParts(now = Date.now()): CountdownParts {
  const diff = ceremonyMs - now;

  if (Number.isNaN(ceremonyMs) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, complete: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, complete: false };
}
