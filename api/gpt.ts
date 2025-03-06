

export const query = async (chatItems: Array<{ q: string; a: string }>, userInfo: { nickname: string; OpenRouterAPIkey: string }) => {
  try {
    if (!userInfo) {
      return;
    }
    const apk_key = userInfo.OpenRouterAPIkey;
    if (!apk_key) {
      return;
    }
    const messages: Array<{ role: string; content: string }> = [];
    chatItems.map((item) => {
      messages.push({
        role: "user",
        content: item.q,
      });
      item.a &&
        messages.push({
          role: "assistant",
          content: item.a,
        });
    });
    const resultObj = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apk_key}`, // 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
          "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
          "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
          "Content-Type": "text/event-stream",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct:free",
          messages: messages,
          top_p: 1,
          temperature: 1,
          repetition_penalty: 1,
        }),
      }
    );

    const result = await resultObj.json();
    const answer = result.choices[0].message.content;
    console.log(answer);
    return answer;
  } catch (error) {
    return;
  }
};
