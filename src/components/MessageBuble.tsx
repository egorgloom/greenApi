import type { Message } from "../types";

type Props = { message: Message };

export function MessageBubble({ message }: Props) {
  const isOut = message.isOutgoing;

  return (
    <div className={`flex ${isOut ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
          isOut
            ? "bg-green-600 text-white rounded-br-sm"
            : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
