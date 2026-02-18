export function buildAddUrl(
  baseUrl: string,
  params: {
    url: string;
    title?: string;
    description?: string;
    favicon?: string;
    readLater?: boolean;
  },
): string {
  const base = baseUrl.replace(/\/$/, "");
  const searchParams = new URLSearchParams();
  searchParams.set("url", params.url);
  if (params.title) searchParams.set("title", params.title);
  if (params.description) searchParams.set("description", params.description);
  if (params.favicon && !params.favicon.startsWith("data:"))
    searchParams.set("favicon", params.favicon);
  if (params.readLater === true) searchParams.set("readlater", "1");
  else if (params.readLater === false) searchParams.set("readlater", "0");
  return `${base}/add?${searchParams.toString()}`;
}
