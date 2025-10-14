// DOM augmentations for requestIdleCallback
// Ensures TypeScript recognizes window.requestIdleCallback without using 'any'

interface IdleDeadline {
  readonly didTimeout: boolean;
  timeRemaining(): number;
}

type RequestIdleCallbackHandle = number;
type RequestIdleCallbackOptions = { timeout?: number };

interface Window {
  requestIdleCallback(
    callback: (deadline: IdleDeadline) => void,
    options?: RequestIdleCallbackOptions
  ): RequestIdleCallbackHandle;
  cancelIdleCallback(handle: RequestIdleCallbackHandle): void;
}