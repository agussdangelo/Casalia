import { useEffect, useState } from "react";

// Guarda los comentarios agrupados por objeto: { sofa: [{user, comment}, ...] }
export function usePinnedComments(connection) {
  const [commentsByObject, setCommentsByObject] = useState({});

  useEffect(() => {
    if (!connection) return;

    const handleReceive = (objectId, user, comment) => {
      setCommentsByObject((prev) => {
        const existing = prev[objectId] || [];
        return { ...prev, [objectId]: [...existing, { user, comment }] };
      });
    };

    connection.on("ReceivePinnedComment", handleReceive);
    return () => connection.off("ReceivePinnedComment", handleReceive);
  }, [connection]);

  const sendPinnedComment = async (objectId, user, comment) => {
    if (!connection || !comment.trim()) return;
    await connection.invoke("SendPinnedComment", objectId, user, comment);
  };

  return { commentsByObject, sendPinnedComment };
}