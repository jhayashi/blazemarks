export type SearchProviderId = "google" | "duckduckgo";
export type ChatProviderId =
  | "google-ai"
  | "perplexity"
  | "chatgpt"
  | "claude";

interface Provider {
  label: string;
  urlTemplate: string;
}

export const searchProviders: Record<SearchProviderId, Provider> = {
  google: {
    label: "Google",
    urlTemplate: "https://www.google.com/search?q=",
  },
  duckduckgo: {
    label: "DuckDuckGo",
    urlTemplate: "https://duckduckgo.com/?q=",
  },
};

export const chatProviders: Record<ChatProviderId, Provider> = {
  "google-ai": {
    label: "Google AI Mode",
    urlTemplate: "https://www.google.com/search?q=QUERY&udm=50",
  },
  perplexity: {
    label: "Perplexity",
    urlTemplate: "https://www.perplexity.ai/search?q=",
  },
  chatgpt: {
    label: "ChatGPT",
    urlTemplate: "https://chatgpt.com/?q=",
  },
  claude: {
    label: "Claude",
    urlTemplate: "https://claude.ai/new?q=",
  },
};

const SEARCH_KEY = "blazemarks-search-provider";
const CHAT_KEY = "blazemarks-chat-provider";

export function getSearchProviderId(): SearchProviderId {
  try {
    const val = localStorage.getItem(SEARCH_KEY);
    if (val === "google" || val === "duckduckgo") return val;
  } catch {
    // ignore
  }
  return "google";
}

export function setSearchProviderId(id: SearchProviderId): void {
  localStorage.setItem(SEARCH_KEY, id);
}

export function getChatProviderId(): ChatProviderId {
  try {
    const val = localStorage.getItem(CHAT_KEY);
    if (
      val === "google-ai" ||
      val === "perplexity" ||
      val === "chatgpt" ||
      val === "claude"
    ) {
      return val;
    }
  } catch {
    // ignore
  }
  return "google-ai";
}

export function setChatProviderId(id: ChatProviderId): void {
  localStorage.setItem(CHAT_KEY, id);
}

export function buildProviderUrl(template: string, query: string): string {
  const encoded = encodeURIComponent(query);
  if (template.includes("QUERY")) {
    return template.replace("QUERY", encoded);
  }
  return template + encoded;
}
