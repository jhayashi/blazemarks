import type { Translations } from "../types";

const de: Translations = {
  // Navigation
  "nav.home": "Startseite",
  "nav.readingMode": "Lesemodus",
  "nav.importExport": "Import / Export",
  "nav.tags": "Tags",
  "nav.settings": "Einstellungen",
  "nav.help": "Hilfe",
  "nav.about": "Info",
  "nav.menu": "Menü",

  // Home page
  "home.searchPlaceholder": "Lesezeichen durchsuchen...",
  "home.clearSearch": "Suche löschen",
  "home.search": "Suche",
  "home.chat": "Chat",
  "home.emptyState":
    "Noch keine Lesezeichen. Füge dein erstes hinzu oder verwende das Bookmarklet aus den Einstellungen.",

  // Reading page
  "reading.title": "Leseliste",
  "reading.searchPlaceholder": "Leseliste durchsuchen...",
  "reading.clearSearch": "Suche löschen",

  // Add page
  "add.saving": "Lesezeichen wird gespeichert...",
  "add.error": "Lesezeichen konnte nicht gespeichert werden.",
  "add.saved": "Lesezeichen gespeichert!",
  "add.updated": "Lesezeichen aktualisiert!",

  // Bookmark card
  "bookmark.edit": "Lesezeichen bearbeiten",
  "bookmark.markUnread": "Als ungelesen markieren",
  "bookmark.markRead": "Als gelesen markieren",
  "bookmark.delete": "Löschen",
  "bookmark.unstar": "Stern entfernen",
  "bookmark.star": "Stern vergeben",
  "bookmark.visit": "Besuch",
  "bookmark.visits": "Besuche",
  "bookmark.confirmDelete": "Dieses Lesezeichen löschen?",

  // Bookmark form
  "form.editBookmark": "Lesezeichen bearbeiten",
  "form.addBookmark": "Lesezeichen hinzufügen",
  "form.urlPlaceholder": "URL (erforderlich)",
  "form.urlDuplicate": "Diese URL existiert bereits in deinen Lesezeichen.",
  "form.titlePlaceholder": "Titel",
  "form.descriptionPlaceholder": "Beschreibung",
  "form.tagsPlaceholder": "Tags (Komma oder Enter zum Hinzufügen)",
  "form.toggleOn": "An",
  "form.toggleOff": "Aus",
  "form.showInReading": "In Leseliste anzeigen",
  "form.cancel": "Abbrechen",
  "form.save": "Speichern",
  "form.add": "Hinzufügen",
  "form.toastUpdated": "Lesezeichen aktualisiert",
  "form.toastCreateError": "Lesezeichen konnte nicht erstellt werden",
  "form.toastAdded": "Lesezeichen hinzugefügt",

  // Bookmark list
  "list.emptyReading":
    "Keine Einträge in der Leseliste. Lesezeichen von Nachrichtenseiten erscheinen hier automatisch.",
  "list.emptySearch": "Keine Lesezeichen entsprechen deiner Suche.",

  // Filter bar
  "filter.dateAdded": "Hinzugefügt am",
  "filter.lastVisited": "Zuletzt besucht",
  "filter.visitCount": "Besuchsanzahl",
  "filter.sortAscending": "Aufsteigend sortieren",
  "filter.sortDescending": "Absteigend sortieren",

  // Tag chip
  "tag.remove": "Tag {name} entfernen",

  // Tags page
  "tags.title": "Tags",
  "tags.empty": "Noch keine Tags.",
  "tags.deleteTag": "Tag {name} löschen",
  "tags.confirmDelete": "Diesen Tag löschen?",
  "tags.toastDeleted": "Tag gelöscht",

  // Settings / Preferences
  "settings.title": "Einstellungen",
  "settings.savingBookmarks": "Lesezeichen speichern",
  "settings.extensionHelp": "Installiere die Browser-Erweiterung für den einfachsten Weg, Lesezeichen zu speichern:",
  "settings.chromeExtension": "Chrome-Erweiterung",
  "settings.firefoxExtension": "Firefox-Erweiterung",
  "settings.bookmarkletSubheading": "Bookmarklet",
  "settings.bookmarkletHelp":
    "Alternativ ziehe diesen Link in deine Lesezeichenleiste oder kopiere den Code unten:",
  "settings.copy": "Kopieren",
  "settings.searchChat": "Suche & Chat",
  "settings.showSearchChat":
    "Such- und Chat-Buttons auf der Startseite anzeigen",
  "settings.searchProvider": "Suchanbieter",
  "settings.chatProvider": "Chat-Anbieter",
  "settings.theme": "Design",
  "settings.language": "Sprache",
  "settings.account": "Konto",
  "settings.showIdentityPhrase": "Identitätsphrase anzeigen",
  "settings.hideIdentityPhrase": "Identitätsphrase verbergen",
  "settings.restoreIdentity": "Identität wiederherstellen",
  "settings.resetAllData": "Alle Daten zurücksetzen",
  "settings.appearance": "Erscheinungsbild",
  "settings.toastBookmarkletCopied": "Bookmarklet-Code kopiert!",
  "settings.confirmReset":
    "Bist du sicher? Dadurch werden alle lokalen Daten gelöscht.",
  "settings.invalidIdentityPhrase":
    "Ungültige Identitätsphrase. Bitte überprüfe sie und versuche es erneut.",
  "settings.enterIdentityPhrase": "Gib deine 24-Wort-Identitätsphrase ein:",
  "settings.sync": "Synchronisierung",
  "settings.syncEnabled": "Synchronisierung aktiviert",
  "settings.syncDisabled": "Nur lokal",
  "settings.syncHelp":
    "Wenn aktiviert, werden Lesezeichen zwischen Ger\u00e4ten synchronisiert. Wenn deaktiviert, bleiben die Daten nur auf diesem Ger\u00e4t. Diese \u00c4nderung l\u00e4dt die Seite neu.",
  "settings.syncConfirmDisable":
    "Synchronisierung deaktivieren? Daten werden nur auf diesem Ger\u00e4t gespeichert. Die Seite wird neu geladen.",
  "settings.syncConfirmEnable":
    "Synchronisierung aktivieren? Daten werden zwischen Ger\u00e4ten synchronisiert. Die Seite wird neu geladen.",
  "settings.customReadingDomains": "Benutzerdefinierte Lesedomains",
  "settings.customReadingDomainsHelp":
    "Domains hinzuf\u00fcgen, die automatisch f\u00fcr den Lesemodus markiert werden. Eine Domain pro Zeile.",

  // Import / Export
  "importExport.title": "Import / Export",
  "importExport.importTitle": "Lesezeichen importieren",
  "importExport.importHelp":
    "Lesezeichen aus einem Browser-Export importieren (Netscape-HTML-Format).",
  "importExport.chooseFile": "Datei auswählen",
  "importExport.newBookmarks": "{count} neue Lesezeichen",
  "importExport.duplicatesSkipped": "{count} Duplikate übersprungen",
  "importExport.newTags": "{count} neue Tags",
  "importExport.import": "Importieren",
  "importExport.cancel": "Abbrechen",
  "importExport.importing": "Wird importiert...",
  "importExport.exportTitle": "Lesezeichen exportieren",
  "importExport.exportButton": "{count} Lesezeichen exportieren",
  "importExport.addMissingFavicons": "Fehlende Favicons hinzufügen",
  "importExport.freshTags": "Mit neuen Tags neu beginnen",
  "importExport.aiOrganize": "KI-Organisation",
  "importExport.aiOrganizeHelp":
    "Erstelle einen Prompt mit deinen Lesezeichen, füge ihn in ein beliebiges LLM ein und importiere die JSON-Antwort, um deine Lesezeichen automatisch zu taggen.",
  "importExport.copyAiPrompt": "KI-Prompt kopieren ({count} Lesezeichen)",
  "importExport.importAiResponse": "KI-Antwort importieren",
  "importExport.bookmarksWithSuggestions":
    "{count} Lesezeichen mit Tag-Vorschlägen",
  "importExport.newAndExistingTags":
    "{newCount} neue Tags, {existingCount} vorhandene Tags",
  "importExport.apply": "Anwenden",
  "importExport.toastParseWarnings": "Parse-Warnungen: {count}",
  "importExport.toastPromptCopied": "Prompt kopiert!",
  "importExport.toastImported": "{count} Lesezeichen importiert",
  "importExport.toastExported": "Lesezeichen exportiert",
  "importExport.toastAppliedTags":
    "Tags auf {count} Lesezeichen angewendet",

  // About
  "about.title": "Info",
  "about.appName": "BlazeMarks",
  "about.version": "Version 0.5",
  "about.description":
    "Ein kostenloser, lokaler Lesezeichen-Manager, erstellt mit Evolu und Next.js.",
};

export default de;
