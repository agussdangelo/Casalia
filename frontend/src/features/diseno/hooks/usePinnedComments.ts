import { useEffect, useState } from "react"
import type { HubConnection } from "@microsoft/signalr"
import type { CommentsByObject } from "../types"

export function usePinnedComments(connection: HubConnection | null) {
  const [commentsByObject, setCommentsByObject] = useState<CommentsByObject>({})

  useEffect(() => {
    if (!connection) return

    const handleReceive = (objectId: string, user: string, comment: string) => {
      setCommentsByObject((prev) => {
        const existing = prev[objectId] || []
        return { ...prev, [objectId]: [...existing, { user, comment }] }
      })
    }

    connection.on("ReceivePinnedComment", handleReceive)
    return () => {
      connection.off("ReceivePinnedComment", handleReceive)
    }
  }, [connection])

  const sendPinnedComment = async (objectId: string, user: string, comment: string) => {
    if (!connection || !comment.trim()) return
    await connection.invoke("SendPinnedComment", objectId, user, comment)
  }

  return { commentsByObject, sendPinnedComment }
}