// Check if Perplexity is configured
export function isPerplexityConfigured(): boolean {
  return !!process.env.PERPLEXITY_API_KEY;
}

// Test Perplexity connection
export async function testPerplexityConnection(): Promise<boolean> {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) return false;
  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [{ role: "user", content: "Say hello" }],
        max_tokens: 10,
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

// Available categories
export const NEWS_CATEGORIES = [
  "ai-models",
  "ai-tools",
  "ai-research",
  "ai-business",
  "ai-regulation",
  "ai-tutorials",
  "ai-funding",
  "general",
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

interface ProcessedNews {
  title_vi: string;
  summary_vi: string;
  category_slug: string;
}

// Translate text to Vietnamese
export async function translateToVietnamese(text: string): Promise<string> {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) return `[EN] ${text}`;

  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          {
            role: "system",
            content:
              "Translate the following text to Vietnamese. Keep technical terms, product names, and company names in English.",
          },
          { role: "user", content: text },
        ],
        temperature: 0.1,
      }),
    });

    if (!response.ok) throw new Error("API Error");

    const data = await response.json();
    return data.choices[0]?.message?.content || text;
  } catch {
    return `[EN] ${text}`;
  }
}

// Categorize news
export async function categorizeNews(title: string, summary: string): Promise<NewsCategory> {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) return "general";

  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          {
            role: "system",
            content: `Categorize this news into one of: ${NEWS_CATEGORIES.join(", ")}. Respond with only the category slug.`,
          },
          { role: "user", content: `Title: ${title}\nSummary: ${summary}` },
        ],
        temperature: 0.1,
        max_tokens: 20,
      }),
    });

    if (!response.ok) throw new Error("API Error");

    const data = await response.json();
    const category = data.choices[0]?.message?.content?.trim().toLowerCase();
    return NEWS_CATEGORIES.includes(category as NewsCategory) ? (category as NewsCategory) : "general";
  } catch {
    return "general";
  }
}

// Combined translate and categorize
export async function translateAndCategorize(title: string, summary: string): Promise<ProcessedNews> {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) {
    return {
      title_vi: `[EN] ${title}`,
      summary_vi: `[EN] ${summary}`,
      category_slug: "general",
    };
  }

  // Build different prompts based on whether we have a summary
  const hasSummary = summary && summary.trim().length > 10;

  const prompt = hasSummary
    ? `
Dịch tin AI sau sang tiếng Việt và phân loại.
Giữ thuật ngữ kỹ thuật và tên công ty (OpenAI, Google, ChatGPT, LLM, v.v.) bằng tiếng Anh.
Bản dịch phải tự nhiên, chuyên nghiệp.

Title: ${title}
Summary: ${summary}

Categories: ${NEWS_CATEGORIES.join(", ")}

Response format (JSON only):
{
  "title_vi": "...",
  "summary_vi": "...",
  "category_slug": "..."
}
`
    : `
Đây là tiêu đề một bài báo về AI. Hãy:
1. Dịch tiêu đề sang tiếng Việt (giữ thuật ngữ kỹ thuật bằng tiếng Anh)
2. Viết một đoạn tóm tắt ngắn (2-3 câu) bằng tiếng Việt về nội dung có thể của bài viết dựa trên tiêu đề
3. Phân loại bài viết

Title: ${title}

Categories: ${NEWS_CATEGORIES.join(", ")}

Response format (JSON only):
{
  "title_vi": "...",
  "summary_vi": "...",
  "category_slug": "..."
}
`;

  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: "You are a helpful AI assistant that translates and categorizes AI news." },
          { role: "user", content: prompt },
        ],
        temperature: 0.1,
      }),
    });

    console.log(`[PERPLEXITY] Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`[PERPLEXITY] Error Body: ${errorText}`);
      throw new Error(`Perplexity API Error: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    console.log("📝 Perplexity Raw Response:", content); // Debug log

    if (!content) throw new Error("Empty response from Perplexity");

    const cleanContent = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const result = JSON.parse(cleanContent);

    return {
      title_vi: result.title_vi || title,
      summary_vi: result.summary_vi || summary,
      category_slug: NEWS_CATEGORIES.includes(result.category_slug) ? result.category_slug : "general",
    };
  } catch (error) {
    console.error("Perplexity Processing Error:", error);
    return {
      title_vi: `[EN] ${title}`,
      summary_vi: `${summary}`,
      category_slug: "general",
    };
  }
}

// Extended processed item interface
export interface ProcessedNewsItem {
  title: string;
  summary: string;
  title_vi: string;
  summary_vi: string;
  category_slug: string;
  url_hash: string;
  actual_url: string;
  thumbnail?: string;
}

// Process single news item
export async function processNewsItem(
  item: { title: string; summary: string; link: string },
  resolveUrl: (url: string) => Promise<string>,
  generateHash: (url: string) => string,
): Promise<ProcessedNewsItem> {
  const actualUrl = await resolveUrl(item.link);
  const translated = await translateAndCategorize(item.title, item.summary);

  return {
    title: item.title,
    summary: item.summary,
    title_vi: translated.title_vi,
    summary_vi: translated.summary_vi,
    category_slug: translated.category_slug,
    url_hash: generateHash(actualUrl),
    actual_url: actualUrl,
  };
}

// Process multiple items with delay
export async function processNewsItems(
  items: { title: string; summary: string; link: string }[],
  delayMs = 500,
): Promise<ProcessedNewsItem[]> {
  const { resolveRedirectLink, generateUrlHash } = await import("./email-parser");
  const results: ProcessedNewsItem[] = [];

  for (const item of items) {
    const processed = await processNewsItem(item, resolveRedirectLink, generateUrlHash);
    results.push(processed);

    // Add delay between API calls to avoid rate limiting
    if (delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return results;
}
