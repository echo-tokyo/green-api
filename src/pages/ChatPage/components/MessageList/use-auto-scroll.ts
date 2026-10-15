import { useLayoutEffect, useRef } from 'react'
import type { Message } from '@/types/message'

const BOTTOM_THRESHOLD_PX = 80

export function useAutoScroll(messages: Message[]) {
  const listRef = useRef<HTMLDivElement>(null)
  const isAtBottomRef = useRef(true)

  const messageCount = messages.length
  const isLastOutgoing = messages.at(-1)?.direction === 'outgoing'

  function handleScroll() {
    const list = listRef.current

    if (!list) return

    const distanceToBottom =
      list.scrollHeight - list.scrollTop - list.clientHeight

    isAtBottomRef.current = distanceToBottom < BOTTOM_THRESHOLD_PX
  }

  useLayoutEffect(() => {
    const list = listRef.current
    const shouldScroll = isAtBottomRef.current || isLastOutgoing

    if (list && shouldScroll) list.scrollTop = list.scrollHeight
  }, [messageCount, isLastOutgoing])

  return { listRef, handleScroll }
}
