import {
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type SubmitEvent,
} from 'react'
import { SendHorizontal } from 'lucide-react'
import { IconButton } from '@/components/ui'
import styles from './Composer.module.scss'

interface ComposerProps {
  onSend: (text: string) => void
}

const MAX_MESSAGE_LENGTH = 4096

export function Composer({ onSend }: ComposerProps) {
  const [text, setText] = useState('')
  const trimmedText = text.trim()
  const isEmpty = trimmedText.length === 0

  function send() {
    if (isEmpty) return

    onSend(trimmedText)
    setText('')
  }

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    const isSendKey = event.key === 'Enter' && !event.shiftKey
    const isComposing = event.nativeEvent.isComposing

    if (!isSendKey || isComposing) return

    event.preventDefault()
    send()
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    send()
  }

  return (
    <form className={styles.composer} onSubmit={handleSubmit}>
      <textarea
        className={styles.input}
        rows={1}
        placeholder='Сообщение'
        aria-label='Сообщение'
        maxLength={MAX_MESSAGE_LENGTH}
        autoFocus
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <IconButton
        type='submit'
        icon={SendHorizontal}
        label='Отправить'
        variant='accent'
        size='l'
        disabled={isEmpty}
      />
    </form>
  )
}
