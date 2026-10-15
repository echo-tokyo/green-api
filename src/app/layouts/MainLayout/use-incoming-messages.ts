import { useEffect, useEffectEvent } from 'react'
import { useMatch, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { getChatRoute, ROUTES } from '@/config/routes'
import { pollNotifications } from '@/services/api/polling'
import { useMessagesStore } from '@/store/messages-store'
import type { NotificationBody } from '@/types/green-api'
import type { Message } from '@/types/message'
import { parseIncomingMessage } from '@/utils/message'
import { formatPhone, normalizePhone } from '@/utils/phone'

export function useIncomingMessages() {
  const navigate = useNavigate()
  const chatMatch = useMatch(ROUTES.chat)
  const openChatId = normalizePhone(chatMatch?.params.phone ?? '')
  const addMessage = useMessagesStore((state) => state.addMessage)

  function notifyAboutMessage(message: Message) {
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

    addMessage(message)

    if (message.chatId !== openChatId) notifyAboutMessage(message)
  })

  useEffect(() => {
    const controller = new AbortController()

    void pollNotifications(controller.signal, (body) =>
      handleNotification(body),
    )

    return () => controller.abort()
  }, [])
}
