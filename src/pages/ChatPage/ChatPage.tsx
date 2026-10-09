import { useParams } from 'react-router'

export function ChatPage() {
  const { phone } = useParams()

  return <h1>Чат {phone}</h1>
}
