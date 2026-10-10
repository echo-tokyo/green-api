export function delay(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
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
