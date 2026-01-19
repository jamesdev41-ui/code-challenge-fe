export const SIMULATED_DELAY = 500; // ms

export const MAX_TIMEOUT = 30000; // ms

export const MAX_RETRIES = 2;

export const SECOND_TO_MILLISECONDS = 1000;

export const queryConfig = {
  staleTime: SECOND_TO_MILLISECONDS * 60 * 5, // 5 minutes
  gcTime: SECOND_TO_MILLISECONDS * 60 * 30, // 30 minutes
  retry: MAX_RETRIES,
  retryDelay: (attemptIndex: number) =>
    Math.min(SECOND_TO_MILLISECONDS * MAX_RETRIES ** attemptIndex, MAX_TIMEOUT),
};
