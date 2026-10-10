import { useState } from 'react'
import { useParams } from 'react-router'
import type { Message } from '@/types/chat'
import { formatPhone } from '@/utils/phone'
import { ChatHeader } from './components/ChatHeader/ChatHeader'
import { Composer } from './components/Composer/Composer'
import { MessageList } from './components/MessageList/MessageList'
import { MOCK_MESSAGES } from './mock-messages'
import styles from './ChatPage.module.scss'

export function ChatPage() {
  const { phone = '' } = useParams()
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES)
  const chatName = formatPhone(phone)

  function handleSend(text: string) {
    const message: Message = {
      id: crypto.randomUUID(),
      chatId: phone,
      text,
      timestamp: Date.now(),
      direction: 'outgoing',
    }

    setMessages((prevMessages) => [...prevMessages, message])
  }

  return (
    <div className={styles.page}>
      <ChatHeader name={chatName} />
      <MessageList messages={messages} />
      <Composer onSend={handleSend} />
    </div>
  )
}
