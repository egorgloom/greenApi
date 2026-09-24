export type Credentials = {
  idInstance: string;
  apiTokenInstance: string;
};

export type Message = {
  id: string;
  text: string;
  isOutgoing: boolean;
  timestamp: number;
};

export type GreenApiNotification = {
  receiptId: number;
  body: {
    typeWebhook: string;
    messageData?: {
      typeMessage: string;
      textMessageData?: {
        textMessage: string;
      };
    };
    senderData?: {
      chatId: string;
      sender: string;
    };
  };
};
