// Mock Data: AI Tools - KynguyenAI v3.0
// 20+ AI Tools với đầy đủ thông tin

import type { Tool, ToolCategory, ToolReview } from "@/types";

// ============ TOOL CATEGORIES ============
export const mockToolCategories: ToolCategory[] = [
  {
    id: "cat-001",
    slug: "text-generation",
    name: "Text Generation",
    name_vi: "Tạo văn bản",
    description: "Tools for generating and editing text content",
    icon: "pen-tool",
    display_order: 1,
    is_active: true,
  },
  {
    id: "cat-002",
    slug: "image-generation",
    name: "Image Generation",
    name_vi: "Tạo hình ảnh",
    description: "AI tools for creating and editing images",
    icon: "image",
    display_order: 2,
    is_active: true,
  },
  {
    id: "cat-003",
    slug: "video-generation",
    name: "Video Generation",
    name_vi: "Tạo video",
    description: "AI-powered video creation tools",
    icon: "video",
    display_order: 3,
    is_active: true,
  },
  {
    id: "cat-004",
    slug: "audio-generation",
    name: "Audio & Music",
    name_vi: "Âm thanh & Nhạc",
    description: "AI tools for audio, music and voice",
    icon: "music",
    display_order: 4,
    is_active: true,
  },
  {
    id: "cat-005",
    slug: "code-assistant",
    name: "Code Assistant",
    name_vi: "Hỗ trợ lập trình",
    description: "AI coding assistants and IDE tools",
    icon: "code",
    display_order: 5,
    is_active: true,
  },
  {
    id: "cat-006",
    slug: "chatbot",
    name: "Chatbot & Assistant",
    name_vi: "Chatbot & Trợ lý",
    description: "Conversational AI and chat assistants",
    icon: "message-circle",
    display_order: 6,
    is_active: true,
  },
  {
    id: "cat-007",
    slug: "productivity",
    name: "Productivity",
    name_vi: "Năng suất",
    description: "AI tools to boost productivity",
    icon: "zap",
    display_order: 7,
    is_active: true,
  },
  {
    id: "cat-008",
    slug: "research",
    name: "Research & Analysis",
    name_vi: "Nghiên cứu & Phân tích",
    description: "AI research and data analysis tools",
    icon: "search",
    display_order: 8,
    is_active: true,
  },
  {
    id: "cat-009",
    slug: "marketing",
    name: "Marketing & SEO",
    name_vi: "Marketing & SEO",
    description: "AI marketing and SEO tools",
    icon: "megaphone",
    display_order: 9,
    is_active: true,
  },
  {
    id: "cat-010",
    slug: "design",
    name: "Design & Creative",
    name_vi: "Thiết kế & Sáng tạo",
    description: "AI design and creative tools",
    icon: "palette",
    display_order: 10,
    is_active: true,
  },
];

// ============ AI TOOLS ============
export const mockTools: Tool[] = [
  // ============ TEXT GENERATION ============
  {
    id: "tool-001",
    slug: "chatgpt",
    name: "ChatGPT",
    tagline: "Chatbot AI mạnh nhất thế giới từ OpenAI",
    description: `ChatGPT là mô hình ngôn ngữ lớn (LLM) tiên tiến nhất từ OpenAI, có khả năng:

- Trả lời câu hỏi và giải thích các khái niệm phức tạp
- Viết và chỉnh sửa văn bản, email, báo cáo
- Hỗ trợ coding với nhiều ngôn ngữ lập trình
- Phân tích dữ liệu và tạo biểu đồ
- Xử lý hình ảnh và tài liệu (GPT-4 Vision)

ChatGPT Plus ($20/tháng) cung cấp truy cập GPT-4, plugins và Advanced Data Analysis.`,
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    website_url: "https://chat.openai.com",
    category_id: "cat-006",
    pricing_type: "freemium",
    pricing_details: "Free tier + Plus $20/mo + Team $25/user/mo",
    twitter_url: "https://twitter.com/OpenAI",
    github_url: null,
    discord_url: null,
    screenshots: [],
    video_url: null,
    vote_count: 15234,
    review_count: 892,
    average_rating: 4.7,
    status: "approved",
    featured: true,
    featured_date: new Date().toISOString(),
    created_at: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "tool-002",
    slug: "claude",
    name: "Claude",
    tagline: "AI Assistant từ Anthropic với focus vào safety và helpfulness",
    description: `Claude là AI assistant được phát triển bởi Anthropic với các đặc điểm nổi bật:

- Context window lớn nhất (200K tokens) - đọc được cả cuốn sách
- Xuất sắc trong việc phân tích tài liệu dài
- Coding và technical writing chất lượng cao
- Honest và harmless - từ chối yêu cầu không phù hợp
- Claude 3.5 Sonnet đạt top benchmark nhiều lĩnh vực

Claude Pro ($20/tháng) cung cấp priority access và usage cao hơn.`,
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/1/17/Anthropic_logo.svg",
    website_url: "https://claude.ai",
    category_id: "cat-006",
    pricing_type: "freemium",
    pricing_details: "Free tier + Pro $20/mo + Team $25/user/mo",
    twitter_url: "https://twitter.com/AnthropicAI",
    github_url: null,
    discord_url: null,
    screenshots: [],
    video_url: null,
    vote_count: 12456,
    review_count: 654,
    average_rating: 4.8,
    status: "approved",
    featured: true,
    featured_date: new Date().toISOString(),
    created_at: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "tool-003",
    slug: "perplexity",
    name: "Perplexity AI",
    tagline: "AI Search Engine với real-time web access và citations",
    description: `Perplexity AI là công cụ tìm kiếm AI có thể:

- Tìm kiếm web real-time và tổng hợp thông tin
- Cung cấp citations cho mọi thông tin
- Deep Research cho nghiên cứu chuyên sâu
- Focus mode cho academic, YouTube, Reddit
- API cho developers ($5/1000 requests)

Perplexity Pro ($20/tháng) có GPT-4, Claude và unlimited searches.`,
    logo_url: "https://assets-global.website-files.com/6335b33630f88833a92915fc/63f1f96a2e850f0e3c3c4b41_perplexity-logo.svg",
    website_url: "https://perplexity.ai",
    category_id: "cat-008",
    pricing_type: "freemium",
    pricing_details: "Free tier + Pro $20/mo",
    twitter_url: "https://twitter.com/peraboratory",
    github_url: null,
    discord_url: "https://discord.gg/perplexity",
    screenshots: [],
    video_url: null,
    vote_count: 8923,
    review_count: 423,
    average_rating: 4.6,
    status: "approved",
    featured: true,
    featured_date: new Date().toISOString(),
    created_at: new Date(Date.now() - 250 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 250 * 24 * 60 * 60 * 1000).toISOString(),
  },

  // ============ IMAGE GENERATION ============
  {
    id: "tool-004",
    slug: "midjourney",
    name: "Midjourney",
    tagline: "Tạo hình ảnh nghệ thuật với chất lượng đỉnh cao",
    description: `Midjourney là công cụ tạo hình ảnh AI hàng đầu:

- Chất lượng hình ảnh artistic và photorealistic xuất sắc
- Character consistency giữa các generations
- Upscale lên 4K resolution
- Vary, Pan, Zoom controls
- Style tuner và personalization

Sử dụng qua Discord. Plans từ $10-120/tháng.`,
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png",
    website_url: "https://midjourney.com",
    category_id: "cat-002",
    pricing_type: "paid",
    pricing_details: "Basic $10/mo, Standard $30/mo, Pro $60/mo",
    twitter_url: "https://twitter.com/midaboratory",
    github_url: null,
    discord_url: "https://discord.gg/midjourney",
    screenshots: [],
    video_url: null,
    vote_count: 11234,
    review_count: 567,
    average_rating: 4.7,
    status: "approved",
    featured: false,
    featured_date: null,
    created_at: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "tool-005",
    slug: "dall-e-3",
    name: "DALL-E 3",
    tagline: "Image generation từ OpenAI với text understanding tốt nhất",
    description: `DALL-E 3 là model tạo hình của OpenAI:

- Hiểu prompt text cực kỳ tốt và chính xác
- Tích hợp trong ChatGPT Plus
- Tạo được text trong hình ảnh
- Nhiều style từ realistic đến artistic
- Edit và inpainting capabilities

Có trong ChatGPT Plus hoặc API ($0.04/image).`,
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    website_url: "https://openai.com/dall-e-3",
    category_id: "cat-002",
    pricing_type: "freemium",
    pricing_details: "Via ChatGPT Plus $20/mo or API",
    twitter_url: "https://twitter.com/OpenAI",
    github_url: null,
    discord_url: null,
    screenshots: [],
    video_url: null,
    vote_count: 7654,
    review_count: 345,
    average_rating: 4.5,
    status: "approved",
    featured: false,
    featured_date: null,
    created_at: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "tool-006",
    slug: "stable-diffusion",
    name: "Stable Diffusion",
    tagline: "Open source image generation - chạy local hoặc cloud",
    description: `Stable Diffusion là model tạo hình open source:

- Hoàn toàn miễn phí và open source
- Chạy được trên máy local
- Customizable với LoRA, ControlNet
- Cộng đồng lớn với nhiều fine-tuned models
- SDXL và SD3 với chất lượng cao

Sử dụng qua ComfyUI, Automatic1111 hoặc các cloud services.`,
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Stability_AI_logo.svg",
    website_url: "https://stability.ai",
    category_id: "cat-002",
    pricing_type: "free",
    pricing_details: "Free & Open Source",
    twitter_url: "https://twitter.com/StabilityAI",
    github_url: "https://github.com/Stability-AI/stablediffusion",
    discord_url: "https://discord.gg/stablediffusion",
    screenshots: [],
    video_url: null,
    vote_count: 9876,
    review_count: 456,
    average_rating: 4.4,
    status: "approved",
    featured: false,
    featured_date: null,
    created_at: new Date(Date.now() - 500 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 500 * 24 * 60 * 60 * 1000).toISOString(),
  },

  // ============ CODE ASSISTANT ============
  {
    id: "tool-007",
    slug: "github-copilot",
    name: "GitHub Copilot",
    tagline: "AI pair programmer tích hợp trực tiếp vào IDE",
    description: `GitHub Copilot là AI coding assistant phổ biến nhất:

- Autocomplete code thông minh
- Tích hợp VS Code, JetBrains, Neovim
- Copilot Chat để hỏi đáp về code
- Workspace understanding
- Test generation và documentation

Miễn phí cho students và open source maintainers.`,
    logo_url: "https://github.githubassets.com/assets/copilot-logo-icon-f9b1e2a7a7a0e6b8.png",
    website_url: "https://github.com/features/copilot",
    category_id: "cat-005",
    pricing_type: "freemium",
    pricing_details: "Individual $10/mo, Business $19/user/mo",
    twitter_url: "https://twitter.com/GitHubCopilot",
    github_url: null,
    discord_url: null,
    screenshots: [],
    video_url: null,
    vote_count: 13567,
    review_count: 723,
    average_rating: 4.6,
    status: "approved",
    featured: true,
    featured_date: new Date().toISOString(),
    created_at: new Date(Date.now() - 600 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 600 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "tool-008",
    slug: "cursor",
    name: "Cursor",
    tagline: "AI-native IDE với khả năng edit codebase lớn",
    description: `Cursor là IDE được xây dựng từ đầu với AI:

- Fork từ VS Code nên quen thuộc
- Cmd+K để AI edit code
- Tab để accept suggestions
- Hiểu toàn bộ codebase
- Multi-file edits với Composer

Pro plan $20/tháng cho unlimited premium requests.`,
    logo_url: "https://cursor.sh/favicon.ico",
    website_url: "https://cursor.sh",
    category_id: "cat-005",
    pricing_type: "freemium",
    pricing_details: "Free tier + Pro $20/mo",
    twitter_url: "https://twitter.com/cursor_ai",
    github_url: null,
    discord_url: null,
    screenshots: [],
    video_url: null,
    vote_count: 8765,
    review_count: 432,
    average_rating: 4.8,
    status: "approved",
    featured: false,
    featured_date: null,
    created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "tool-009",
    slug: "codeium",
    name: "Codeium",
    tagline: "AI code completion miễn phí cho developers",
    description: `Codeium là alternative miễn phí cho Copilot:

- Autocomplete miễn phí không giới hạn
- Hỗ trợ 70+ ngôn ngữ lập trình
- Chat trong IDE
- Tích hợp 40+ IDEs
- Enterprise plan với security features

Free tier đủ dùng cho most developers.`,
    logo_url: "https://codeium.com/logo.svg",
    website_url: "https://codeium.com",
    category_id: "cat-005",
    pricing_type: "free",
    pricing_details: "Free for individuals, Enterprise custom pricing",
    twitter_url: "https://twitter.com/caboratory",
    github_url: null,
    discord_url: "https://discord.gg/codeium",
    screenshots: [],
    video_url: null,
    vote_count: 6543,
    review_count: 321,
    average_rating: 4.5,
    status: "approved",
    featured: false,
    featured_date: null,
    created_at: new Date(Date.now() - 220 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 220 * 24 * 60 * 60 * 1000).toISOString(),
  },

  // ============ VIDEO GENERATION ============
  {
    id: "tool-010",
    slug: "runway",
    name: "Runway",
    tagline: "AI video generation và editing platform",
    description: `Runway là nền tảng video AI hàng đầu:

- Gen-3 Alpha tạo video 10 giây chất lượng cao
- Text-to-video và image-to-video
- Motion brush và camera controls
- Video-to-video style transfer
- Green screen và background removal

Được sử dụng bởi Hollywood studios và creators.`,
    logo_url: "https://runway.ml/favicon.ico",
    website_url: "https://runway.ml",
    category_id: "cat-003",
    pricing_type: "freemium",
    pricing_details: "Free trial + Standard $15/mo, Pro $35/mo",
    twitter_url: "https://twitter.com/runwayml",
    github_url: null,
    discord_url: null,
    screenshots: [],
    video_url: null,
    vote_count: 7654,
    review_count: 234,
    average_rating: 4.4,
    status: "approved",
    featured: false,
    featured_date: null,
    created_at: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "tool-011",
    slug: "pika",
    name: "Pika",
    tagline: "AI video generator với editing capabilities mạnh mẽ",
    description: `Pika là tool tạo video AI dễ sử dụng:

- Text-to-video với nhiều styles
- Image-to-video animation
- Modify region để edit parts của video
- Lip sync cho talking head
- Extend video length

Free tier generous, Pro $10/tháng.`,
    logo_url: "https://pika.art/favicon.ico",
    website_url: "https://pika.art",
    category_id: "cat-003",
    pricing_type: "freemium",
    pricing_details: "Free tier + Pro $10/mo",
    twitter_url: "https://twitter.com/paboratory",
    github_url: null,
    discord_url: "https://discord.gg/pika",
    screenshots: [],
    video_url: null,
    vote_count: 5432,
    review_count: 187,
    average_rating: 4.3,
    status: "approved",
    featured: false,
    featured_date: null,
    created_at: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
  },

  // ============ AUDIO GENERATION ============
  {
    id: "tool-012",
    slug: "elevenlabs",
    name: "ElevenLabs",
    tagline: "AI voice generation với quality như người thật",
    description: `ElevenLabs là platform text-to-speech hàng đầu:

- Giọng nói tự nhiên như người thật
- Voice cloning chỉ cần 30 giây audio
- 30+ ngôn ngữ bao gồm tiếng Việt
- Voice design tùy chỉnh
- API cho developers

Free tier 10,000 characters/tháng.`,
    logo_url: "https://elevenlabs.io/favicon.ico",
    website_url: "https://elevenlabs.io",
    category_id: "cat-004",
    pricing_type: "freemium",
    pricing_details: "Free tier + Starter $5/mo, Creator $22/mo",
    twitter_url: "https://twitter.com/elevaboratory",
    github_url: null,
    discord_url: "https://discord.gg/elevenlabs",
    screenshots: [],
    video_url: null,
    vote_count: 6789,
    review_count: 289,
    average_rating: 4.7,
    status: "approved",
    featured: false,
    featured_date: null,
    created_at: new Date(Date.now() - 280 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 280 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "tool-013",
    slug: "suno",
    name: "Suno",
    tagline: "Tạo bài hát hoàn chỉnh với AI",
    description: `Suno là tool tạo nhạc AI ấn tượng nhất:

- Tạo bài hát với vocals và instruments
- Nhiều genres từ pop đến classical
- Custom lyrics hoặc AI generated
- 2 phút songs với verse, chorus
- Extend và remix capabilities

Free tier 50 credits/ngày.`,
    logo_url: "https://suno.ai/favicon.ico",
    website_url: "https://suno.ai",
    category_id: "cat-004",
    pricing_type: "freemium",
    pricing_details: "Free tier + Pro $10/mo, Premier $30/mo",
    twitter_url: "https://twitter.com/saboratory",
    github_url: null,
    discord_url: "https://discord.gg/suno",
    screenshots: [],
    video_url: null,
    vote_count: 8901,
    review_count: 412,
    average_rating: 4.6,
    status: "approved",
    featured: false,
    featured_date: null,
    created_at: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
  },

  // ============ PRODUCTIVITY ============
  {
    id: "tool-014",
    slug: "notion-ai",
    name: "Notion AI",
    tagline: "AI assistant tích hợp trong Notion workspace",
    description: `Notion AI giúp tăng năng suất trong workspace:

- Summarize pages và databases
- Generate content và drafts
- Translate documents
- Extract action items
- Autofill properties

$10/member/tháng as add-on.`,
    logo_url: "https://notion.so/favicon.ico",
    website_url: "https://notion.so/product/ai",
    category_id: "cat-007",
    pricing_type: "paid",
    pricing_details: "$10/member/mo add-on",
    twitter_url: "https://twitter.com/NotionHQ",
    github_url: null,
    discord_url: null,
    screenshots: [],
    video_url: null,
    vote_count: 5678,
    review_count: 234,
    average_rating: 4.4,
    status: "approved",
    featured: false,
    featured_date: null,
    created_at: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "tool-015",
    slug: "otter-ai",
    name: "Otter.ai",
    tagline: "AI meeting notes và transcription tự động",
    description: `Otter.ai là tool ghi chép meeting tự động:

- Real-time transcription
- Speaker identification
- Meeting summaries và action items
- Tích hợp Zoom, Meet, Teams
- Searchable meeting archive

Free tier 300 minutes/tháng.`,
    logo_url: "https://otter.ai/favicon.ico",
    website_url: "https://otter.ai",
    category_id: "cat-007",
    pricing_type: "freemium",
    pricing_details: "Free tier + Pro $17/mo, Business $30/mo",
    twitter_url: "https://twitter.com/aboratory",
    github_url: null,
    discord_url: null,
    screenshots: [],
    video_url: null,
    vote_count: 4567,
    review_count: 198,
    average_rating: 4.3,
    status: "approved",
    featured: false,
    featured_date: null,
    created_at: new Date(Date.now() - 500 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 500 * 24 * 60 * 60 * 1000).toISOString(),
  },

  // ============ MARKETING ============
  {
    id: "tool-016",
    slug: "jasper",
    name: "Jasper",
    tagline: "AI marketing copilot cho teams",
    description: `Jasper là platform AI content cho marketing:

- Brand voice customization
- Marketing campaigns
- Social media posts
- Blog articles và ads
- Team collaboration

Enterprise-focused với pricing từ $49/tháng.`,
    logo_url: "https://jasper.ai/favicon.ico",
    website_url: "https://jasper.ai",
    category_id: "cat-009",
    pricing_type: "paid",
    pricing_details: "Creator $49/mo, Pro $69/mo, Business custom",
    twitter_url: "https://twitter.com/jasper_ai",
    github_url: null,
    discord_url: null,
    screenshots: [],
    video_url: null,
    vote_count: 4321,
    review_count: 167,
    average_rating: 4.2,
    status: "approved",
    featured: false,
    featured_date: null,
    created_at: new Date(Date.now() - 600 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 600 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "tool-017",
    slug: "copy-ai",
    name: "Copy.ai",
    tagline: "AI copywriting cho mọi loại content",
    description: `Copy.ai giúp viết content marketing nhanh:

- 90+ copywriting templates
- Blog posts và social media
- Product descriptions
- Email sequences
- Free tier generous

Free plan 2,000 words/tháng.`,
    logo_url: "https://copy.ai/favicon.ico",
    website_url: "https://copy.ai",
    category_id: "cat-009",
    pricing_type: "freemium",
    pricing_details: "Free tier + Pro $49/mo",
    twitter_url: "https://twitter.com/copy_ai",
    github_url: null,
    discord_url: null,
    screenshots: [],
    video_url: null,
    vote_count: 3456,
    review_count: 145,
    average_rating: 4.1,
    status: "approved",
    featured: false,
    featured_date: null,
    created_at: new Date(Date.now() - 550 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 550 * 24 * 60 * 60 * 1000).toISOString(),
  },

  // ============ DESIGN ============
  {
    id: "tool-018",
    slug: "canva-ai",
    name: "Canva Magic Studio",
    tagline: "AI design tools trong Canva",
    description: `Canva Magic Studio bao gồm nhiều AI tools:

- Magic Design tạo layout tự động
- Magic Write cho copywriting
- Magic Edit xóa/thêm objects
- Text to Image
- Background remover

Có trong Canva Pro $13/tháng.`,
    logo_url: "https://canva.com/favicon.ico",
    website_url: "https://canva.com/magic-studio",
    category_id: "cat-010",
    pricing_type: "freemium",
    pricing_details: "Some free + Pro $13/mo",
    twitter_url: "https://twitter.com/canva",
    github_url: null,
    discord_url: null,
    screenshots: [],
    video_url: null,
    vote_count: 6789,
    review_count: 312,
    average_rating: 4.5,
    status: "approved",
    featured: false,
    featured_date: null,
    created_at: new Date(Date.now() - 350 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 350 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "tool-019",
    slug: "figma-ai",
    name: "Figma AI",
    tagline: "AI features trong Figma design tool",
    description: `Figma AI đang beta với các features:

- Generate designs từ text
- Rename layers tự động
- Remove background
- Auto layout suggestions
- Content fill với AI

Sẽ có trong Figma plans.`,
    logo_url: "https://figma.com/favicon.ico",
    website_url: "https://figma.com/ai",
    category_id: "cat-010",
    pricing_type: "freemium",
    pricing_details: "Beta, will be in Figma plans",
    twitter_url: "https://twitter.com/figma",
    github_url: null,
    discord_url: null,
    screenshots: [],
    video_url: null,
    vote_count: 4567,
    review_count: 123,
    average_rating: 4.3,
    status: "approved",
    featured: false,
    featured_date: null,
    created_at: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
  },

  // ============ RESEARCH ============
  {
    id: "tool-020",
    slug: "elicit",
    name: "Elicit",
    tagline: "AI research assistant cho academic papers",
    description: `Elicit giúp research scientific literature:

- Tìm relevant papers
- Extract key findings
- Summarize papers
- Compare methodologies
- Citation networks

Free tier 5,000 credits/tháng.`,
    logo_url: "https://elicit.org/favicon.ico",
    website_url: "https://elicit.org",
    category_id: "cat-008",
    pricing_type: "freemium",
    pricing_details: "Free tier + Plus $10/mo",
    twitter_url: "https://twitter.com/elaboratory",
    github_url: null,
    discord_url: null,
    screenshots: [],
    video_url: null,
    vote_count: 3456,
    review_count: 156,
    average_rating: 4.4,
    status: "approved",
    featured: false,
    featured_date: null,
    created_at: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Add category to tools
export const mockToolsWithCategories: Tool[] = mockTools.map((tool) => ({
  ...tool,
  category: mockToolCategories.find((c) => c.id === tool.category_id),
}));

// ============ TOOL REVIEWS ============
export const mockToolReviews: ToolReview[] = [
  {
    id: "review-001",
    tool_id: "tool-001",
    user_id: "user-001",
    rating: 5,
    title: "ChatGPT thay đổi cách tôi làm việc",
    content: "Tôi sử dụng ChatGPT hàng ngày cho công việc. Từ viết email, brainstorm ý tưởng đến debug code. GPT-4 thực sự ấn tượng với khả năng hiểu context và đưa ra câu trả lời chất lượng. Worth every penny của subscription Plus.",
    status: "published",
    helpful_count: 45,
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    user: {
      display_name: "Minh Nguyen",
      avatar_url: "https://i.pravatar.cc/150?img=1",
    },
  },
  {
    id: "review-002",
    tool_id: "tool-001",
    user_id: "user-002",
    rating: 4,
    title: "Tốt nhưng đôi khi bịa thông tin",
    content: "ChatGPT rất hữu ích nhưng cần fact-check cẩn thận. Đã có vài lần nó đưa thông tin sai với độ tự tin cao. Ngoài ra thì excellent tool, đặc biệt cho coding và writing tasks.",
    status: "published",
    helpful_count: 32,
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    user: {
      display_name: "Lan Tran",
      avatar_url: "https://i.pravatar.cc/150?img=5",
    },
  },
  {
    id: "review-003",
    tool_id: "tool-002",
    user_id: "user-003",
    rating: 5,
    title: "Claude vượt trội cho coding và analysis",
    content: "Đã dùng cả ChatGPT và Claude, Claude 3.5 Sonnet cho coding output tốt hơn nhiều. Context window 200K tokens là game changer - có thể paste cả codebase. Highly recommend cho developers.",
    status: "published",
    helpful_count: 67,
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    user: {
      display_name: "Duc Le",
      avatar_url: "https://i.pravatar.cc/150?img=3",
    },
  },
  {
    id: "review-004",
    tool_id: "tool-008",
    user_id: "user-004",
    rating: 5,
    title: "Best IDE for AI-assisted development",
    content: "Cursor đã thay thế VS Code của tôi hoàn toàn. Cmd+K để edit code, Tab để accept, Composer cho multi-file changes. Productivity tăng ít nhất 2x. UI quen thuộc vì based on VS Code.",
    status: "published",
    helpful_count: 89,
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    user: {
      display_name: "Hung Pham",
      avatar_url: "https://i.pravatar.cc/150?img=8",
    },
  },
  {
    id: "review-005",
    tool_id: "tool-004",
    user_id: "user-005",
    rating: 5,
    title: "Midjourney v6 là đỉnh cao của AI art",
    content: "Chất lượng hình ảnh Midjourney tạo ra thực sự stunning. Đặc biệt photorealistic và character consistency đã improve rất nhiều ở v6. Worth $30/month cho Standard plan.",
    status: "published",
    helpful_count: 56,
    created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    user: {
      display_name: "Thao Nguyen",
      avatar_url: "https://i.pravatar.cc/150?img=9",
    },
  },
];

// Helper functions
export function getMockTools(options: {
  limit?: number;
  offset?: number;
  category?: string;
  search?: string;
  sort?: "votes" | "newest" | "rating";
  featured?: boolean;
} = {}): { data: Tool[]; total: number } {
  const { limit = 20, offset = 0, category, search, sort = "votes", featured } = options;

  let filtered = [...mockToolsWithCategories];

  if (category) {
    filtered = filtered.filter((t) => t.category_id === category || t.category?.slug === category);
  }

  if (featured !== undefined) {
    filtered = filtered.filter((t) => t.featured === featured);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.name.toLowerCase().includes(searchLower) ||
        t.tagline.toLowerCase().includes(searchLower)
    );
  }

  // Sort
  switch (sort) {
    case "newest":
      filtered.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      break;
    case "rating":
      filtered.sort((a, b) => b.average_rating - a.average_rating);
      break;
    default:
      filtered.sort((a, b) => b.vote_count - a.vote_count);
  }

  const total = filtered.length;
  const data = filtered.slice(offset, offset + limit);

  return { data, total };
}

export function getMockToolBySlug(slug: string): Tool | null {
  return mockToolsWithCategories.find((t) => t.slug === slug) || null;
}

export function getMockToolReviews(toolId: string): ToolReview[] {
  return mockToolReviews.filter((r) => r.tool_id === toolId);
}
