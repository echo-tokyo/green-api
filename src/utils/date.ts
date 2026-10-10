const MS_IN_DAY = 86_400_000

const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
  hour: '2-digit',
  minute: '2-digit',
})

const dayFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
})

export function getStartOfDay(timestamp: number): number {
  const date = new Date(timestamp)
  date.setHours(0, 0, 0, 0)
  return date.getTime()
}

export function formatTime(timestamp: number): string {
  return timeFormatter.format(timestamp)
}

export function formatDay(timestamp: number): string {
  const today = getStartOfDay(Date.now())
  const day = getStartOfDay(timestamp)
  const daysAgo = Math.round((today - day) / MS_IN_DAY)

  if (daysAgo === 0) return 'Сегодня'
  if (daysAgo === 1) return 'Вчера'

  return dayFormatter.format(timestamp)
}
