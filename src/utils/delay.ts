/**
 * Creates a promise that resolves after the specified number of milliseconds
 * @param ms The number of milliseconds to delay
 * @returns Promise that resolves after the delay
 */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
