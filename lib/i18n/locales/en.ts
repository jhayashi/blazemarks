import type { Translations } from "../types";

const en: Translations = {
  // Navigation
  "nav.home": "Home",
  "nav.readingMode": "Reading Mode",
  "nav.importExport": "Import / Export",
  "nav.tags": "Tags",
  "nav.settings": "Settings",
  "nav.help": "Help",
  "nav.about": "About",
  "nav.menu": "Menu",

  // Home page
  "home.searchPlaceholder": "Search bookmarks...",
  "home.clearSearch": "Clear search",
  "home.search": "Search",
  "home.chat": "Chat",
  "home.emptyState":
    "No bookmarks yet. Add your first one or use the bookmarklet from Settings.",

  // Reading page
  "reading.title": "Reading",
  "reading.searchPlaceholder": "Search reading list...",
  "reading.clearSearch": "Clear search",

  // Add page
  "add.saving": "Saving bookmark...",
  "add.error": "Failed to save bookmark.",
  "add.saved": "Bookmark saved!",
  "add.updated": "Bookmark updated!",

  // Bookmark card
  "bookmark.edit": "Edit bookmark",
  "bookmark.markUnread": "Mark unread",
  "bookmark.markRead": "Mark read",
  "bookmark.delete": "Delete",
  "bookmark.unstar": "Unstar",
  "bookmark.star": "Star",
  "bookmark.visit": "visit",
  "bookmark.visits": "visits",
  "bookmark.confirmDelete": "Delete this bookmark?",

  // Bookmark form
  "form.editBookmark": "Edit Bookmark",
  "form.addBookmark": "Add Bookmark",
  "form.urlPlaceholder": "URL (required)",
  "form.urlDuplicate": "This URL already exists in your bookmarks.",
  "form.titlePlaceholder": "Title",
  "form.descriptionPlaceholder": "Description",
  "form.tagsPlaceholder": "Tags (comma or enter to add)",
  "form.toggleOn": "On",
  "form.toggleOff": "Off",
  "form.showInReading": "Show in Reading",
  "form.cancel": "Cancel",
  "form.save": "Save",
  "form.add": "Add",
  "form.toastUpdated": "Bookmark updated",
  "form.toastCreateError": "Failed to create bookmark",
  "form.toastAdded": "Bookmark added",

  // Bookmark list
  "list.emptyReading":
    "No reading list items. Bookmarks from news sites will appear here automatically.",
  "list.emptySearch": "No bookmarks match your search.",

  // Filter bar
  "filter.dateAdded": "Date added",
  "filter.lastVisited": "Last visited",
  "filter.visitCount": "Visit count",
  "filter.sortAscending": "Sort ascending",
  "filter.sortDescending": "Sort descending",

  // Tag chip
  "tag.remove": "Remove tag {name}",

  // Tags page
  "tags.title": "Tags",
  "tags.empty": "No tags yet.",
  "tags.deleteTag": "Delete tag {name}",
  "tags.confirmDelete": "Delete this tag?",
  "tags.toastDeleted": "Tag deleted",

  // Settings / Preferences
  "settings.title": "Settings",
  "settings.bookmarklet": "Bookmarklet",
  "settings.bookmarkletHelp":
    "Drag this link to your bookmarks bar, or copy the code below:",
  "settings.copy": "Copy",
  "settings.searchChat": "Search & Chat",
  "settings.showSearchChat": "Show search and chat buttons on home page",
  "settings.searchProvider": "Search provider",
  "settings.chatProvider": "Chat provider",
  "settings.theme": "Theme",
  "settings.language": "Language",
  "settings.account": "Account",
  "settings.showMnemonic": "Show Mnemonic",
  "settings.hideMnemonic": "Hide Mnemonic",
  "settings.restoreOwner": "Restore Owner",
  "settings.resetOwner": "Reset Owner",
  "settings.toastBookmarkletCopied": "Bookmarklet code copied!",
  "settings.confirmReset":
    "Are you sure? This will delete all your local data.",
  "settings.invalidMnemonic": "Invalid mnemonic. Please check and try again.",
  "settings.enterMnemonic": "Enter your mnemonic:",
  "settings.sync": "Sync",
  "settings.syncEnabled": "Sync enabled",
  "settings.syncDisabled": "Local only",
  "settings.syncHelp":
    "When enabled, bookmarks sync across devices. When disabled, data stays on this device only. Changing this reloads the page.",
  "settings.syncConfirmDisable":
    "Disable sync? Data will only be stored on this device. The page will reload.",
  "settings.syncConfirmEnable":
    "Enable sync? Data will sync across devices. The page will reload.",

  // Import / Export
  "importExport.title": "Import / Export",
  "importExport.importTitle": "Import Bookmarks",
  "importExport.importHelp":
    "Import bookmarks from a browser export (Netscape HTML format).",
  "importExport.chooseFile": "Choose File",
  "importExport.newBookmarks": "{count} new bookmarks",
  "importExport.duplicatesSkipped": "{count} duplicates skipped",
  "importExport.newTags": "{count} new tags",
  "importExport.import": "Import",
  "importExport.cancel": "Cancel",
  "importExport.importing": "Importing...",
  "importExport.exportTitle": "Export Bookmarks",
  "importExport.exportButton": "Export {count} bookmarks",
  "importExport.addMissingFavicons": "Add missing favicons",
  "importExport.freshTags": "Start fresh with new tags",
  "importExport.aiOrganize": "AI Organize",
  "importExport.aiOrganizeHelp":
    "Generate a prompt with your bookmarks, paste it into any LLM, then import the JSON response to auto-tag your bookmarks.",
  "importExport.copyAiPrompt": "Copy AI Prompt ({count} bookmarks)",
  "importExport.importAiResponse": "Import AI Response",
  "importExport.bookmarksWithSuggestions":
    "{count} bookmarks with tag suggestions",
  "importExport.newAndExistingTags":
    "{newCount} new tags, {existingCount} existing tags",
  "importExport.apply": "Apply",
  "importExport.toastParseWarnings": "Parse warnings: {count}",
  "importExport.toastPromptCopied": "Prompt copied!",
  "importExport.toastImported": "Imported {count} bookmarks",
  "importExport.toastExported": "Bookmarks exported",
  "importExport.toastAppliedTags": "Applied tags to {count} bookmarks",

  // About
  "about.title": "About",
  "about.appName": "BlazeMarks",
  "about.version": "Version 0.5",
  "about.description":
    "A free, local-first bookmark manager built with Evolu and Next.js.",
};

export default en;
