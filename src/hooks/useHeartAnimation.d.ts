import { RefObject } from "react";

export interface UseHeartAnimationReturn {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  initAnimation: () => (() => void) | null;
}

export const useHeartAnimation: () => UseHeartAnimationReturn;
