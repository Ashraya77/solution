export async function sendMessage(message: string): Promise<string> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send message");
  }

  return data.message;
}