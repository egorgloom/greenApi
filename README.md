# GREEN-API Chat

Тестовое задание: чат для отправки и получения сообщений через GREEN-API.

## Стек

- React + TypeScript
- Vite
- Tailwind CSS
- Axios

## Запуск локально

```bash
git clone https://github.com/your-username/green-api-chat.git
cd green-api-chat
npm install
npm run dev
```

Откройте http://localhost:5173

## Как пользоваться

1. Введите `idInstance` и `apiTokenInstance` из личного кабинета GREEN-API.
2. Введите номер телефона получателя — создастся чат.
3. Отправляйте и получайте текстовые сообщения.

## Реализация

- Отправка: `POST /sendMessage`
- Получение: `GET /receiveNotification` (long polling)
- Удаление уведомлений: `DELETE /deleteNotification`

## Скриншоты

Надо добавить
