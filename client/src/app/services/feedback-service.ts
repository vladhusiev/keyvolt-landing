
interface FeedBackProps {
  firstName: string;
  lastName: string;
  phone: string;
  company: string;
  message: string;
}

export async function registerFeedbackService(feedbackData: FeedBackProps) {
  const baseUrl = 'http://localhost:1337';
  const url = new URL("/api/feedbacks", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: { ...feedbackData } }),
    });

    return await response.json();
  } catch (error) {
    console.error("Feedback Service Error:", error);
    return { error: "Failed to send feedback" };
  }
}