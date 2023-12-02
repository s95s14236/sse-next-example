"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/sse");

    eventSource.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    eventSource.onerror = (error) => {
      console.error("Error occurred:", error);
      eventSource.close();
    };

    return () => {
      // Clean up event source on component unmount
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>Server-Sent Events (SSE) Example</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}
