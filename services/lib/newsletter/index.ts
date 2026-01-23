// Newsletter Module - KynguyenAI v3.0
// Export all newsletter-related functions

// Gmail integration
export {
  getGmailClient,
  fetchUnreadNewsletters,
  markAsProcessed,
  addLabel,
  isGmailConfigured,
  testConnection as testGmailConnection,
  type GmailMessage,
} from "./gmail";

// Email parsing
export {
  parseNewsletterEmail,
  generateUrlHash,
  resolveRedirectLink,
  extractAllLinks,
  detectNewsletterSource,
} from "./email-parser";

// Perplexity AI
export {
  translateToVietnamese,
  categorizeNews,
  translateAndCategorize,
  processNewsItem,
  processNewsItems,
  isPerplexityConfigured,
  testPerplexityConnection,
  NEWS_CATEGORIES,
} from "./perplexity";

// Data access
export {
  // Sources
  getNewsletterSources,
  getSourceBySlug,
  matchSourceByEmail,
  // Categories
  getNewsletterCategories,
  getCategoryBySlug,
  // News
  getNewsletterNews,
  getNewsletterNewsById,
  getFeaturedNewsletterNews,
  getLatestNewsletterNews,
  createNewsletterNews,
  checkDuplicate,
  batchCreateNewsletterNews,
  // Queue
  addToProcessingQueue,
  updateQueueStatus,
  getQueueItem,
  getPendingQueueItems,
  incrementRetryCount,
} from "./data";
