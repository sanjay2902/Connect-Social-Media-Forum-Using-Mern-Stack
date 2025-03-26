// api/translate.js

export const translateText = async (text, targetLang) => {
    try {
      const response = await fetch("https://api.translation-service.com/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, targetLang }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Translation failed");
      return { text: data.translatedText };
    } catch (error) {
      console.error("Translation error:", error);
      return { error: error.message };
    }
  };
  