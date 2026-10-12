import { delay, http, HttpResponse } from 'msw'

export const TEST_CREDENTIALS = {
  idInstance: '4100000000',
  apiTokenInstance: 'test-token',
  apiUrl: 'https://4100.api.green-api.com',
}

export function getMethodUrl(
  method: string,
  apiUrl = TEST_CREDENTIALS.apiUrl,
): string {
  return `${apiUrl}/waInstance${TEST_CREDENTIALS.idInstance}/${method}/:token`
}

export const handlers = [
  http.get(getMethodUrl('getStateInstance'), () =>
    HttpResponse.json({ stateInstance: 'authorized' }),
  ),
  http.post(getMethodUrl('sendMessage'), () =>
    HttpResponse.json({ idMessage: 'sent-message-id' }),
  ),
  http.get(getMethodUrl('receiveNotification'), async () => {
    await delay('infinite')

    return HttpResponse.json(null)
  }),
  http.delete(`${getMethodUrl('deleteNotification')}/:receiptId`, () =>
    HttpResponse.json({ result: true }),
  ),
]
