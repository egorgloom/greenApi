import { useState } from "react";
import type { Credentials } from "./types";
import { AuthForm } from "./components/AuthForm";
import { Chat } from "./components/Chat";

export default function App() {
  const [credentials, setCredentials] = useState<Credentials | null>(null);

  return credentials ? (
    <Chat credentials={credentials} />
  ) : (
    <AuthForm onSubmit={setCredentials} />
  );
}
