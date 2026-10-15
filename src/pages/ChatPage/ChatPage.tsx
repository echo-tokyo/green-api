import { useParams } from 'react-router'
import { formatPhone, normalizePhone } from '@/utils/phone'
import { ChatHeader } from './components/ChatHeader/ChatHeader'
import { Composer } from './components/Composer/Composer'
import { MessageList } from './components/MessageList/MessageList'
import { useChatMessages } from './hooks/use-chat-messages'
import { useSendMessage } from './hooks/use-send-message'
import styles from './ChatPage.module.scss'

export function ChatPage() {
  const params = useParams()
  const phone = normalizePhone(params.phone ?? '')
  const chatName = formatPhone(phone)

  const messages = useChatMessages(phone)
  const send = useSendMessage(phone)

  return (
    <div className={styles.page}>
      <ChatHeader name={chatName} />
      <MessageList messages={messages} />
      <Composer onSend={send} />
    </div>
  )
}
