import { useEffect, useEffectEvent } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { getChatRoute } from '@/config/routes'
import { pollNotifications } from '@/services/api/polling'
import type { NotificationBody } from '@/types/green-api'
import { formatPhone } from '@/utils/phone'
import { parseIncomingMessage } from '../lib/message'
import type { Message } from '../lib/types'

interface UseIncomingMessagesOptions {
  phone: string
  addMessage: (message: Message) => void
}

export function useIncomingMessages({
  phone,
  addMessage,
}: UseIncomingMessagesOptions) {
  const navigate = useNavigate()

  function notifyAboutOtherChat(message: Message) {
    toast(`Новое сообщение от ${formatPhone(message.chatId)}`, {
      description: message.text,
      action: {
        label: 'Открыть',
        onClick: () => void navigate(getChatRoute(message.chatId)),
      },
    })
  }

  const handleNotification = useEffectEvent((body: NotificationBody) => {
    const message = parseIncomingMessage(body)

    if (!message) return

    if (message.chatId === phone) {
      addMessage(message)
    } else {
      notifyAboutOtherChat(message)
    }
  })

  useEffect(() => {
    const controller = new AbortController()

    void pollNotifications(controller.signal, (body) =>
      handleNotification(body),
    )

    return () => controller.abort()
  }, [])
}
