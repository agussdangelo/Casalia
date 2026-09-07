import { useEffect, useState } from "react";
import "./chat.css";

export function ChatPanel({ connection, userName }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!connection) return;

    const handleReceive = (user, message) => {
      setMessages((prev) => [...prev, { user, message }]);
    };

    connection.on("ReceiveMessage", handleReceive);
    return () => connection.off("ReceiveMessage", handleReceive);
  }, [connection]);

  const sendMessage = async () => {
    if (!connection || !text.trim()) return;
    await connection.invoke("SendMessage", userName, text);
    setText("");
  };

  return (
    <div className="chatPanel">
      <h3 style={{ margin: "0 0 8px" }}>Chat en vivo</h3>
      <p style={{ fontSize: 12, color: "#666", marginTop: 0 }}>
        Abrí esta página en otra pestaña para probar el tiempo real.
      </p>
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i} className="message">
            <strong>{m.user}:</strong> {m.message}
          </div>
        ))}
      </div>
      <div className="inputArea">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Escribí un mensaje..."
          style={{ flex: 1, padding: 6 }}
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
}