import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { HUB_URL } from '@/shared/config';

export function useSignalR() {

  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

  useEffect(() => {
    const conn = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL)
      .withAutomaticReconnect()
      .build();

    conn
      .start()
      .then(() => setConnection(conn))
      .catch((err) => console.error("Error conectando a SignalR:", err));

    return () => {
  conn.stop();
};
  }, []);

  return connection;
}