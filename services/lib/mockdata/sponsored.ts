// Mock Data: Sponsored Tiles - KynguyenAI v3.0
// Sponsored content cho monetization

export interface SponsoredTile {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  logo_url: string | null;
  target_url: string;
  cta_text: string;
  size: "standard" | "wide";
  position: number;
  status: "active" | "paused" | "ended";
  impressions: number;
  clicks: number;
  start_date: string;
  end_date: string | null;
  created_at: string;
}

export const mockSponsoredTiles: SponsoredTile[] = [
  {
    id: "sponsored-001",
    title: "Học AI cùng Coursera",
    description: "Khóa học Machine Learning từ Andrew Ng. Chứng chỉ quốc tế được công nhận. Giảm 50% cho học viên mới.",
    image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg",
    target_url: "https://coursera.org/specializations/machine-learning?ref=kynguyenai",
    cta_text: "Đăng ký ngay",
    size: "wide",
    position: 3,
    status: "active",
    impressions: 45230,
    clicks: 1234,
    start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sponsored-002",
    title: "DigitalOcean GPU Droplets",
    description: "Deploy AI models nhanh chóng với GPU instances. $200 credit miễn phí cho người dùng mới.",
    image_url: null,
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/f/ff/DigitalOcean_logo.svg",
    target_url: "https://m.do.co/c/kynguyenai",
    cta_text: "Nhận credit",
    size: "standard",
    position: 7,
    status: "active",
    impressions: 32100,
    clicks: 892,
    start_date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: null,
    created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sponsored-003",
    title: "Udemy AI Courses",
    description: "Hàng nghìn khóa học AI từ cơ bản đến nâng cao. Flash sale 85% off đang diễn ra!",
    image_url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
    target_url: "https://udemy.com/courses/ai?ref=kynguyenai",
    cta_text: "Xem khóa học",
    size: "standard",
    position: 12,
    status: "active",
    impressions: 28900,
    clicks: 756,
    start_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sponsored-004",
    title: "RunPod - GPU Cloud",
    description: "Thuê GPU giá rẻ cho AI training và inference. Từ $0.19/giờ cho RTX 4090.",
    image_url: null,
    logo_url: "https://assets-global.website-files.com/64f6f2c0e3f4c5a91c1e823a/64f9d3c8d756ff80543de0af_runpod-logo-dark.svg",
    target_url: "https://runpod.io?ref=kynguyenai",
    cta_text: "Bắt đầu",
    size: "standard",
    position: 18,
    status: "active",
    impressions: 19500,
    clicks: 423,
    start_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: null,
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Affiliate Links
export interface AffiliateLink {
  id: string;
  short_code: string;
  affiliate_url: string;
  original_url: string;
  name: string;
  category: string;
  status: "active" | "inactive";
  click_count: number;
  conversion_count: number;
  created_at: string;
}

export const mockAffiliateLinks: AffiliateLink[] = [
  {
    id: "aff-001",
    short_code: "coursera-ml",
    affiliate_url: "https://coursera.pxf.io/machine-learning",
    original_url: "https://coursera.org/specializations/machine-learning",
    name: "Coursera ML Specialization",
    category: "courses",
    status: "active",
    click_count: 4532,
    conversion_count: 89,
    created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "aff-002",
    short_code: "do-gpu",
    affiliate_url: "https://m.do.co/c/abc123kynguyenai",
    original_url: "https://digitalocean.com/products/gpu-droplets",
    name: "DigitalOcean GPU",
    category: "cloud",
    status: "active",
    click_count: 2341,
    conversion_count: 45,
    created_at: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "aff-003",
    short_code: "udemy-ai",
    affiliate_url: "https://udemy.com/course/ai-complete-guide/?couponCode=KYNGUYENAI",
    original_url: "https://udemy.com/course/ai-complete-guide",
    name: "Udemy AI Complete Guide",
    category: "courses",
    status: "active",
    click_count: 3210,
    conversion_count: 67,
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "aff-004",
    short_code: "runpod",
    affiliate_url: "https://runpod.io?ref=kynguyenai",
    original_url: "https://runpod.io",
    name: "RunPod GPU Cloud",
    category: "cloud",
    status: "active",
    click_count: 1892,
    conversion_count: 23,
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "aff-005",
    short_code: "chatgpt-plus",
    affiliate_url: "https://chat.openai.com/upgrade",
    original_url: "https://chat.openai.com",
    name: "ChatGPT Plus",
    category: "tools",
    status: "active",
    click_count: 8765,
    conversion_count: 0, // No direct tracking
    created_at: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Helper functions
export function getMockSponsoredTiles(limit = 4): SponsoredTile[] {
  return mockSponsoredTiles
    .filter((t) => t.status === "active")
    .sort((a, b) => a.position - b.position)
    .slice(0, limit);
}

export function getMockAffiliateLink(code: string): AffiliateLink | null {
  return mockAffiliateLinks.find((l) => l.short_code === code && l.status === "active") || null;
}
