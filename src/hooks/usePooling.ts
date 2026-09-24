import { useEffect, useRef } from "react";
import type { Credentials, Message } from "../types";
import { createApi } from "../api/greenApi";

type Params = {
  credentials: Credentials | null;
  onMessage: (msg: Message) => void;
};

export function usePolling({ credentials, onMessage }: Params) {
  const stopped = useRef(false);

  useEffect(() => {
    if (!credentials) return;
    stopped.current = false;

    const api = createApi(credentials);

    async function poll() {
      while (!stopped.current) {
        try {
          const notification = await api.receiveNotification();

          if (notification?.body?.messageData) {
            const { messageData } = notification.body;

            if (
              notification.body.typeWebhook === "incomingMessageReceived" &&
              messageData.typeMessage === "textMessage"
            ) {
              onMessage({
                id: String(notification.receiptId),
                text: messageData.textMessageData?.textMessage ?? "",
                isOutgoing: false,
                timestamp: Date.now(),
              });
            }

            await api.deleteNotification(notification.receiptId);
          }
        } catch (err) {
          console.error("Polling error:", err);
          await new Promise((r) => setTimeout(r, 3000));
        }
      }
    }

    poll();

    return () => {
      stopped.current = true;
    };
  }, [credentials, onMessage]);
}
