export type Locale =
  | "en"
  | "es"
  | "ja"
  | "zh"
  | "fr"
  | "de"
  | "pt"
  | "ko"
  | "it"
  | "ar";

export const locales: Locale[] = [
  "en",
  "es",
  "ja",
  "zh",
  "fr",
  "de",
  "pt",
  "ko",
  "it",
  "ar",
];

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Espa\u00f1ol",
  ja: "\u65e5\u672c\u8a9e",
  zh: "\u4e2d\u6587",
  fr: "Fran\u00e7ais",
  de: "Deutsch",
  pt: "Portugu\u00eas",
  ko: "\ud55c\uad6d\uc5b4",
  it: "Italiano",
  ar: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
};

export const rtlLocales: ReadonlySet<Locale> = new Set<Locale>(["ar"]);

export interface Translations {
  // Navigation
  "nav.home": string;
  "nav.readingMode": string;
  "nav.importExport": string;
  "nav.tags": string;
  "nav.settings": string;
  "nav.help": string;
  "nav.about": string;
  "nav.menu": string;

  // Home page
  "home.searchPlaceholder": string;
  "home.clearSearch": string;
  "home.search": string;
  "home.chat": string;
  "home.emptyState": string;

  // Reading page
  "reading.title": string;
  "reading.searchPlaceholder": string;
  "reading.clearSearch": string;

  // Add page
  "add.saving": string;
  "add.error": string;
  "add.saved": string;
  "add.updated": string;

  // Bookmark card
  "bookmark.edit": string;
  "bookmark.markUnread": string;
  "bookmark.markRead": string;
  "bookmark.delete": string;
  "bookmark.unstar": string;
  "bookmark.star": string;
  "bookmark.visit": string;
  "bookmark.visits": string;
  "bookmark.confirmDelete": string;

  // Bookmark form
  "form.editBookmark": string;
  "form.addBookmark": string;
  "form.urlPlaceholder": string;
  "form.urlDuplicate": string;
  "form.titlePlaceholder": string;
  "form.descriptionPlaceholder": string;
  "form.tagsPlaceholder": string;
  "form.toggleOn": string;
  "form.toggleOff": string;
  "form.showInReading": string;
  "form.cancel": string;
  "form.save": string;
  "form.add": string;
  "form.toastUpdated": string;
  "form.toastCreateError": string;
  "form.toastAdded": string;

  // Bookmark list
  "list.emptyReading": string;
  "list.emptySearch": string;

  // Filter bar
  "filter.dateAdded": string;
  "filter.lastVisited": string;
  "filter.visitCount": string;
  "filter.sortAscending": string;
  "filter.sortDescending": string;

  // Tag chip
  "tag.remove": string;

  // Tags page
  "tags.title": string;
  "tags.empty": string;
  "tags.deleteTag": string;
  "tags.confirmDelete": string;
  "tags.toastDeleted": string;

  // Settings / Preferences
  "settings.title": string;
  "settings.bookmarklet": string;
  "settings.bookmarkletHelp": string;
  "settings.copy": string;
  "settings.searchChat": string;
  "settings.showSearchChat": string;
  "settings.searchProvider": string;
  "settings.chatProvider": string;
  "settings.theme": string;
  "settings.language": string;
  "settings.account": string;
  "settings.showIdentityPhrase": string;
  "settings.hideIdentityPhrase": string;
  "settings.restoreIdentity": string;
  "settings.resetAllData": string;
  "settings.toastBookmarkletCopied": string;
  "settings.confirmReset": string;
  "settings.invalidIdentityPhrase": string;
  "settings.enterIdentityPhrase": string;
  "settings.appearance": string;
  "settings.sync": string;
  "settings.syncEnabled": string;
  "settings.syncDisabled": string;
  "settings.syncHelp": string;
  "settings.syncConfirmDisable": string;
  "settings.syncConfirmEnable": string;

  // Import / Export
  "importExport.title": string;
  "importExport.importTitle": string;
  "importExport.importHelp": string;
  "importExport.chooseFile": string;
  "importExport.newBookmarks": string;
  "importExport.duplicatesSkipped": string;
  "importExport.newTags": string;
  "importExport.import": string;
  "importExport.cancel": string;
  "importExport.importing": string;
  "importExport.exportTitle": string;
  "importExport.exportButton": string;
  "importExport.addMissingFavicons": string;
  "importExport.freshTags": string;
  "importExport.aiOrganize": string;
  "importExport.aiOrganizeHelp": string;
  "importExport.copyAiPrompt": string;
  "importExport.importAiResponse": string;
  "importExport.bookmarksWithSuggestions": string;
  "importExport.newAndExistingTags": string;
  "importExport.apply": string;
  "importExport.toastParseWarnings": string;
  "importExport.toastPromptCopied": string;
  "importExport.toastImported": string;
  "importExport.toastExported": string;
  "importExport.toastAppliedTags": string;

  // About
  "about.title": string;
  "about.appName": string;
  "about.version": string;
  "about.description": string;
}
