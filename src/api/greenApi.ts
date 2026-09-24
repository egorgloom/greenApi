import axios from "axios";
import type { Credentials, GreenApiNotification } from "../types";

// В dev — Vite proxy, в prod — Vercel Function
const BASE_URL = "/api/proxy";

export function createApi({ idInstance, apiTokenInstance }: Credentials) {
  // Строим URL через прокси: /api/proxy?path=/waInstance.../method/token&...
  const url = (method: string, query: Record<string, string> = {}) => {
    const params = new URLSearchParams({
      path: `/waInstance${idInstance}/${method}/${apiTokenInstance}`,
      ...query,
    });
    return `${BASE_URL}?${params.toString()}`;
  };

  return {
    // Отправка текстового сообщения
    async sendMessage(chatId: string, message: string) {
      const res = await axios.post(url("sendMessage"), {
        chatId,
        message,
      });
      return res.data;
    },

    // Получение уведомления (long polling, ждёт до 5 сек)
    async receiveNotification(): Promise<GreenApiNotification | null> {
      const res = await axios.get(url("receiveNotification"), {
        params: {},
        // receiveTimeout уже в query через url()
      });
      return res.data;
    },

    // Удаление уведомления из очереди (обязательно!)
    async deleteNotification(receiptId: number) {
      await axios.delete(url(`deleteNotification/${receiptId}`));
    },
  };
}
