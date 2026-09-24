import { useState } from "react";
import type { CSSProperties } from "react";

interface PinnedCommentPanelProps {
  objectId: string | null;
  comments: { user: string; comment: string }[];  
  userName: string;
  onSend: (objectId: string, user: string, comment: string) => void;
  onClose: () => void;
}


export function PinnedCommentPanel({ objectId, comments, userName, onSend, onClose }: PinnedCommentPanelProps) {
  const [text, setText] = useState("");

  if (!objectId) return null;

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(objectId, userName, text);
    setText("");
  };

  return (
    <div style={panelStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <strong>Comentarios: {objectId}</strong>
        <button onClick={onClose} style={{ cursor: "pointer" }}>✕</button>
      </div>

      <div style={{ maxHeight: 150, overflowY: "auto", marginBottom: 8 }}>
        {comments.length === 0 && (
          <p style={{ fontSize: 12, color: "#666" }}>Todavía no hay comentarios.</p>
        )}
        {comments.map((c, i) => (
          <div key={i} style={{ marginBottom: 6, fontSize: 14 }}>
            <strong>{c.user}:</strong> {c.comment}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 6 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Escribí un comentario..."
          style={{ flex: 1, padding: 6 }}
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}

const panelStyle: CSSProperties = {
  position: "absolute",
  bottom: 12,
  left: 12,
  zIndex: 10,
  background: "white",
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: 12,
  width: 260,
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
};