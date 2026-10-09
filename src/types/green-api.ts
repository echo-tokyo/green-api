export interface Credentials {
  idInstance: string
  apiTokenInstance: string
}

export interface StateInstanceResponse {
  stateInstance: string
}

export interface SendMessageResponse {
  idMessage: string
}

export interface NotificationBody {
  typeWebhook: string
  timestamp: number
  idMessage?: string
  senderData?: {
    chatId: string
    senderName?: string
    senderPhoneNumber?: number
  }
  messageData?: {
    typeMessage: string
    textMessageData?: {
      textMessage: string
    }
  }
}

export interface Notification {
  receiptId: number
  body: NotificationBody
}
