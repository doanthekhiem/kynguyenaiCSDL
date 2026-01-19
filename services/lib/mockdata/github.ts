// Mock Data: GitHub Trending - KynguyenAI v3.0
// 15+ trending AI repos

import type { GitHubRepo } from "@/types";

export const mockGitHubRepos: GitHubRepo[] = [
  {
    repo_name: "ollama/ollama",
    url: "https://github.com/ollama/ollama",
    description_vi: "Chạy LLMs locally trên máy tính của bạn. Hỗ trợ Llama 3, Mistral, Gemma và nhiều models khác với giao diện đơn giản.",
    stars: 98500,
    language: "Go",
    trending_date: new Date().toISOString(),
  },
  {
    repo_name: "langchain-ai/langchain",
    url: "https://github.com/langchain-ai/langchain",
    description_vi: "Framework xây dựng ứng dụng LLM với chains, agents, RAG và memory. Hỗ trợ Python và JavaScript.",
    stars: 95200,
    language: "Python",
    trending_date: new Date().toISOString(),
  },
  {
    repo_name: "AUTOMATIC1111/stable-diffusion-webui",
    url: "https://github.com/AUTOMATIC1111/stable-diffusion-webui",
    description_vi: "Web UI phổ biến nhất cho Stable Diffusion với nhiều extensions và features. Chạy local miễn phí.",
    stars: 145000,
    language: "Python",
    trending_date: new Date().toISOString(),
  },
  {
    repo_name: "openai/whisper",
    url: "https://github.com/openai/whisper",
    description_vi: "Speech-to-text model từ OpenAI. Hỗ trợ 99 ngôn ngữ bao gồm tiếng Việt với độ chính xác cao.",
    stars: 72500,
    language: "Python",
    trending_date: new Date().toISOString(),
  },
  {
    repo_name: "meta-llama/llama",
    url: "https://github.com/meta-llama/llama",
    description_vi: "Open source LLM từ Meta. Llama 3 70B cạnh tranh với GPT-4 trên nhiều benchmarks.",
    stars: 58900,
    language: "Python",
    trending_date: new Date().toISOString(),
  },
  {
    repo_name: "comfyanonymous/ComfyUI",
    url: "https://github.com/comfyanonymous/ComfyUI",
    description_vi: "Node-based UI cho Stable Diffusion. Workflow mạnh mẽ, modular và dễ customize hơn A1111.",
    stars: 56700,
    language: "Python",
    trending_date: new Date().toISOString(),
  },
  {
    repo_name: "ggerganov/llama.cpp",
    url: "https://github.com/ggerganov/llama.cpp",
    description_vi: "Inference LLM bằng C/C++ thuần. Chạy nhanh trên CPU, hỗ trợ quantization GGUF format.",
    stars: 68400,
    language: "C++",
    trending_date: new Date().toISOString(),
  },
  {
    repo_name: "microsoft/autogen",
    url: "https://github.com/microsoft/autogen",
    description_vi: "Framework multi-agent từ Microsoft Research. Xây dựng hệ thống AI agents làm việc cùng nhau.",
    stars: 35600,
    language: "Python",
    trending_date: new Date().toISOString(),
  },
  {
    repo_name: "openai/openai-python",
    url: "https://github.com/openai/openai-python",
    description_vi: "Official Python SDK cho OpenAI API. Hỗ trợ GPT-4, DALL-E 3, Whisper và Assistants API.",
    stars: 23400,
    language: "Python",
    trending_date: new Date().toISOString(),
  },
  {
    repo_name: "vllm-project/vllm",
    url: "https://github.com/vllm-project/vllm",
    description_vi: "High-throughput LLM inference engine. PagedAttention cho memory efficiency, 24x faster hơn HuggingFace.",
    stars: 31200,
    language: "Python",
    trending_date: new Date().toISOString(),
  },
  {
    repo_name: "huggingface/transformers",
    url: "https://github.com/huggingface/transformers",
    description_vi: "Library machine learning phổ biến nhất. Hỗ trợ hàng nghìn pretrained models cho NLP, CV, Audio.",
    stars: 136500,
    language: "Python",
    trending_date: new Date().toISOString(),
  },
  {
    repo_name: "Stability-AI/generative-models",
    url: "https://github.com/Stability-AI/generative-models",
    description_vi: "Official repo Stable Diffusion 3 và SDXL từ Stability AI. State-of-the-art image generation.",
    stars: 24800,
    language: "Python",
    trending_date: new Date().toISOString(),
  },
  {
    repo_name: "run-llama/llama_index",
    url: "https://github.com/run-llama/llama_index",
    description_vi: "Data framework cho LLM applications. RAG, agents, và structured data extraction dễ dàng.",
    stars: 37200,
    language: "Python",
    trending_date: new Date().toISOString(),
  },
  {
    repo_name: "anthropics/anthropic-sdk-python",
    url: "https://github.com/anthropics/anthropic-sdk-python",
    description_vi: "Official Python SDK cho Claude API. Hỗ trợ streaming, tool use và Claude 3.5 Sonnet.",
    stars: 8900,
    language: "Python",
    trending_date: new Date().toISOString(),
  },
  {
    repo_name: "gpt-engineer-org/gpt-engineer",
    url: "https://github.com/gpt-engineer-org/gpt-engineer",
    description_vi: "Tạo codebase hoàn chỉnh từ prompt. AI agent viết code, tests và documentation tự động.",
    stars: 52400,
    language: "Python",
    trending_date: new Date().toISOString(),
  },
];

// Helper function
export function getMockGitHubTrending(limit = 10): GitHubRepo[] {
  return mockGitHubRepos
    .sort((a, b) => b.stars - a.stars)
    .slice(0, limit);
}
