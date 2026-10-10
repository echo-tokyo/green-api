import { useParams } from 'react-router'
import { formatPhone } from '@/utils/phone'
import { ChatHeader } from './components/ChatHeader/ChatHeader'
import { Composer } from './components/Composer/Composer'
import { MessageList } from './components/MessageList/MessageList'
import { useMessages } from './hooks/use-messages'
import { useSendMessage } from './hooks/use-send-message'
import styles from './ChatPage.module.scss'

export function ChatPage() {
  const { phone = '' } = useParams()
  const { messages, addMessage, updateMessage } = useMessages()
  const send = useSendMessage({ phone, addMessage, updateMessage })
  const chatName = formatPhone(phone)

  return (
    <div className={styles.page}>
      <ChatHeader name={chatName} />
      <MessageList messages={messages} />
      <Composer onSend={send} />
    </div>
  )
}
