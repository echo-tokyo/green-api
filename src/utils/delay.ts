export function delay(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    if (signal.aborted) {
      resolve()
      return
    }

    const timeoutId = setTimeout(resolve, ms)

    signal.addEventListener(
      'abort',
      () => {
        clearTimeout(timeoutId)
        resolve()
      },
      { once: true },
    )
  })
}
