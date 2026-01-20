// Supabase Database Types - Auto-generated from schema
// KynguyenAI v3.0

export type PricingType = "free" | "freemium" | "paid" | "enterprise";
export type ToolStatus = "pending" | "approved" | "rejected" | "archived";
export type ReviewStatus = "published" | "hidden" | "flagged";
export type UserRole = "user" | "admin";
export type SubscriberStatus = "pending" | "confirmed";

export interface Database {
  public: {
    Tables: {
      tool_categories: {
        Row: {
          id: string;
          slug: string;
          name: string;
          name_vi: string;
          description: string | null;
          icon: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["tool_categories"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["tool_categories"]["Insert"]>;
      };
      tools: {
        Row: {
          id: string;
          slug: string;
          name: string;
          tagline: string;
          description: string;
          logo_url: string | null;
          website_url: string;
          category_id: string | null;
          pricing_type: PricingType;
          pricing_details: string | null;
          twitter_url: string | null;
          github_url: string | null;
          discord_url: string | null;
          screenshots: string[];
          video_url: string | null;
          vote_count: number;
          review_count: number;
          average_rating: number;
          status: ToolStatus;
          featured: boolean;
          featured_date: string | null;
          created_at: string;
          updated_at: string;
          published_at: string | null;
        };
        Insert: Omit<
          Database["public"]["Tables"]["tools"]["Row"],
          "id" | "created_at" | "updated_at" | "vote_count" | "review_count" | "average_rating"
        > & {
          id?: string;
          created_at?: string;
          updated_at?: string;
          vote_count?: number;
          review_count?: number;
          average_rating?: number;
        };
        Update: Partial<Database["public"]["Tables"]["tools"]["Insert"]>;
      };
      user_profiles: {
        Row: {
          id: string;
          auth_id: string | null;
          email: string;
          display_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
          last_login: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["user_profiles"]["Row"], "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["user_profiles"]["Insert"]>;
      };
      tool_votes: {
        Row: {
          id: string;
          tool_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["tool_votes"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["tool_votes"]["Insert"]>;
      };
      tool_reviews: {
        Row: {
          id: string;
          tool_id: string;
          user_id: string;
          rating: number;
          title: string | null;
          content: string;
          status: ReviewStatus;
          helpful_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["tool_reviews"]["Row"],
          "id" | "created_at" | "updated_at" | "helpful_count"
        > & {
          id?: string;
          created_at?: string;
          updated_at?: string;
          helpful_count?: number;
        };
        Update: Partial<Database["public"]["Tables"]["tool_reviews"]["Insert"]>;
      };
      subscribers: {
        Row: {
          id: string;
          email: string;
          status: SubscriberStatus;
          subscribed_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["subscribers"]["Row"], "id" | "subscribed_at"> & {
          id?: string;
          subscribed_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["subscribers"]["Insert"]>;
      };
    };
  };
}

// Convenience type aliases
export type ToolCategory = Database["public"]["Tables"]["tool_categories"]["Row"];
export type Tool = Database["public"]["Tables"]["tools"]["Row"];
export type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"];
export type ToolVote = Database["public"]["Tables"]["tool_votes"]["Row"];
export type ToolReview = Database["public"]["Tables"]["tool_reviews"]["Row"];
export type Subscriber = Database["public"]["Tables"]["subscribers"]["Row"];

// Tool with category joined
export type ToolWithCategory = Tool & {
  category: ToolCategory | null;
};

// Review with user info
export type ReviewWithUser = ToolReview & {
  user: Pick<UserProfile, "display_name" | "avatar_url"> | null;
};
