import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Composer } from './Composer'

function renderComposer() {
  const onSend = vi.fn()
  const user = userEvent.setup()

  render(<Composer onSend={onSend} />)

  const input = screen.getByRole('textbox', { name: 'Сообщение' })
  const sendButton = screen.getByRole('button', { name: 'Отправить' })

  return { onSend, user, input, sendButton }
}

describe('Composer', () => {
  it('отправляет сообщение по Enter и очищает поле', async () => {
    const { onSend, user, input } = renderComposer()

    await user.type(input, '  Привет  {Enter}')

    expect(onSend).toHaveBeenCalledWith('Привет')
    expect(input).toHaveValue('')
  })

  it('переносит строку по Shift+Enter, не отправляя сообщение', async () => {
    const { onSend, user, input } = renderComposer()

    await user.type(input, 'Первая{Shift>}{Enter}{/Shift}Вторая')

    expect(onSend).not.toHaveBeenCalled()
    expect(input).toHaveValue('Первая\nВторая')
  })

  it('отправляет сообщение по кнопке', async () => {
    const { onSend, user, input, sendButton } = renderComposer()

    await user.type(input, 'Привет')
    await user.click(sendButton)

    expect(onSend).toHaveBeenCalledWith('Привет')
  })

  it('не отправляет пустое сообщение', async () => {
    const { onSend, user, input, sendButton } = renderComposer()

    await user.type(input, '   {Enter}')

    expect(onSend).not.toHaveBeenCalled()
    expect(sendButton).toBeDisabled()
  })
})
