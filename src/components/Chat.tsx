import { useCallback, useState } from "react";
import type { Credentials, Message } from "../types";
import { createApi } from "../api/greenApi";
import { usePolling } from "../hooks/usePooling";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

type Props = { credentials: Credentials };

export function Chat({ credentials }: Props) {
  const [phone, setPhone] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  const api = createApi(credentials);

  const handleIncoming = useCallback((msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  usePolling({ credentials, onMessage: handleIncoming });

  function createChat() {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Введите корректный номер телефона");
      return;
    }
    setChatId(`${digits}@c.us`);
    setError(null);
  }

  async function send(text: string) {
    if (!chatId) return;
    try {
      await api.sendMessage(chatId, text);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text,
          isOutgoing: true,
          timestamp: Date.now(),
        },
      ]);
    } catch {
      setError("Не удалось отправить сообщение");
    }
  }

  if (!chatId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Новый чат</h2>

          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Номер телефона получателя"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={createChat}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition"
          >
            Создать чат
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl h-[80vh] bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-green-600 text-white">
          <p className="font-medium">Чат с {chatId}</p>
        </div>

        <MessageList messages={messages} />
        <MessageInput onSend={send} />

        {error && <p className="text-red-500 text-sm px-4 pb-2">{error}</p>}
      </div>
    </div>
  );
}
