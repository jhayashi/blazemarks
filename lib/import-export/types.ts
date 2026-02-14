export interface ParsedBookmark {
  url: string;
  title: string;
  description?: string;
  favicon?: string;
  tags: string[];
  addDate?: number;
  lastVisit?: number;
}

export interface ParseResult {
  bookmarks: ParsedBookmark[];
  errors: string[];
}

export interface ImportPreview {
  newBookmarks: ParsedBookmark[];
  skippedUrls: string[];
  newTags: string[];
  existingTags: string[];
}

export interface ExportBookmark {
  url: string;
  title: string;
  description?: string;
  favicon?: string;
  tags: string[];
  createdAt?: string;
  lastVisitedAt?: string;
}
