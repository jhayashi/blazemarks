import type { Translations } from "../types";

const fr: Translations = {
  // Navigation
  "nav.home": "Accueil",
  "nav.readingMode": "Mode lecture",
  "nav.importExport": "Importer / Exporter",
  "nav.tags": "\u00c9tiquettes",
  "nav.settings": "Param\u00e8tres",
  "nav.help": "Aide",
  "nav.about": "\u00c0 propos",
  "nav.menu": "Menu",

  // Home page
  "home.searchPlaceholder": "Rechercher des marque-pages...",
  "home.clearSearch": "Effacer la recherche",
  "home.search": "Rechercher",
  "home.chat": "Chat",
  "home.emptyState":
    "Aucun marque-page pour l\u2019instant. Ajoutez le premier ou utilisez le bookmarklet depuis les Param\u00e8tres.",

  // Reading page
  "reading.title": "Lecture",
  "reading.searchPlaceholder": "Rechercher dans la liste de lecture...",
  "reading.clearSearch": "Effacer la recherche",

  // Add page
  "add.saving": "Enregistrement du marque-page...",
  "add.error": "\u00c9chec de l\u2019enregistrement du marque-page.",
  "add.saved": "Marque-page enregistr\u00e9\u00a0!",
  "add.updated": "Marque-page mis \u00e0 jour\u00a0!",

  // Bookmark card
  "bookmark.edit": "Modifier le marque-page",
  "bookmark.markUnread": "Marquer comme non lu",
  "bookmark.markRead": "Marquer comme lu",
  "bookmark.delete": "Supprimer",
  "bookmark.unstar": "Retirer l\u2019\u00e9toile",
  "bookmark.star": "Mettre en favori",
  "bookmark.visit": "visite",
  "bookmark.visits": "visites",
  "bookmark.confirmDelete": "Supprimer ce marque-page\u00a0?",

  // Bookmark form
  "form.editBookmark": "Modifier le marque-page",
  "form.addBookmark": "Ajouter un marque-page",
  "form.urlPlaceholder": "URL (obligatoire)",
  "form.urlDuplicate": "Cette URL existe d\u00e9j\u00e0 dans vos marque-pages.",
  "form.titlePlaceholder": "Titre",
  "form.descriptionPlaceholder": "Description",
  "form.tagsPlaceholder": "\u00c9tiquettes (virgule ou entr\u00e9e pour ajouter)",
  "form.toggleOn": "Activ\u00e9",
  "form.toggleOff": "D\u00e9sactiv\u00e9",
  "form.showInReading": "Afficher en Lecture",
  "form.cancel": "Annuler",
  "form.save": "Enregistrer",
  "form.add": "Ajouter",
  "form.toastUpdated": "Marque-page mis \u00e0 jour",
  "form.toastCreateError": "\u00c9chec de la cr\u00e9ation du marque-page",
  "form.toastAdded": "Marque-page ajout\u00e9",

  // Bookmark list
  "list.emptyReading":
    "Aucun \u00e9l\u00e9ment dans la liste de lecture. Les marque-pages de sites d\u2019actualit\u00e9s appara\u00eetront ici automatiquement.",
  "list.emptySearch": "Aucun marque-page ne correspond \u00e0 votre recherche.",

  // Filter bar
  "filter.dateAdded": "Date d\u2019ajout",
  "filter.lastVisited": "Derni\u00e8re visite",
  "filter.visitCount": "Nombre de visites",
  "filter.sortAscending": "Tri croissant",
  "filter.sortDescending": "Tri d\u00e9croissant",

  // Tag chip
  "tag.remove": "Supprimer l\u2019\u00e9tiquette {name}",

  // Tags page
  "tags.title": "\u00c9tiquettes",
  "tags.empty": "Aucune \u00e9tiquette pour l\u2019instant.",
  "tags.deleteTag": "Supprimer l\u2019\u00e9tiquette {name}",
  "tags.confirmDelete": "Supprimer cette \u00e9tiquette\u00a0?",
  "tags.toastDeleted": "\u00c9tiquette supprim\u00e9e",

  // Settings / Preferences
  "settings.title": "Param\u00e8tres",
  "settings.savingBookmarks": "Enregistrer des marque-pages",
  "settings.extensionHelp": "Installez l'extension de navigateur pour enregistrer des marque-pages facilement :",
  "settings.chromeExtension": "Extension Chrome",
  "settings.firefoxExtension": "Extension Firefox",
  "settings.bookmarkletSubheading": "Bookmarklet",
  "settings.bookmarkletHelp":
    "Sinon, glissez ce lien vers votre barre de marque-pages, ou copiez le code ci-dessous :",
  "settings.copy": "Copier",
  "settings.searchChat": "Recherche et Chat",
  "settings.showSearchChat":
    "Afficher les boutons de recherche et de chat sur la page d\u2019accueil",
  "settings.searchProvider": "Moteur de recherche",
  "settings.chatProvider": "Fournisseur de chat",
  "settings.theme": "Th\u00e8me",
  "settings.language": "Langue",
  "settings.account": "Compte",
  "settings.showIdentityPhrase": "Afficher la phrase d'identit\u00e9",
  "settings.hideIdentityPhrase": "Masquer la phrase d'identit\u00e9",
  "settings.restoreIdentity": "Restaurer l'identit\u00e9",
  "settings.resetAllData": "R\u00e9initialiser toutes les donn\u00e9es",
  "settings.appearance": "Apparence",
  "settings.toastBookmarkletCopied": "Code du bookmarklet copi\u00e9\u00a0!",
  "settings.confirmReset":
    "\u00cates-vous s\u00fbr\u00a0? Cela supprimera toutes vos donn\u00e9es locales.",
  "settings.invalidIdentityPhrase":
    "Phrase d'identit\u00e9 invalide. Veuillez v\u00e9rifier et r\u00e9essayer.",
  "settings.enterIdentityPhrase": "Entrez votre phrase d'identit\u00e9 de 24 mots\u00a0:",
  "settings.sync": "Synchronisation",
  "settings.syncEnabled": "Synchronisation activ\u00e9e",
  "settings.syncDisabled": "Local uniquement",
  "settings.syncHelp":
    "Lorsque activ\u00e9e, les favoris se synchronisent entre les appareils. Lorsque d\u00e9sactiv\u00e9e, les donn\u00e9es restent uniquement sur cet appareil. Ce changement rechargera la page.",
  "settings.syncConfirmDisable":
    "D\u00e9sactiver la synchronisation\u00a0? Les donn\u00e9es seront uniquement stock\u00e9es sur cet appareil. La page sera recharg\u00e9e.",
  "settings.syncConfirmEnable":
    "Activer la synchronisation\u00a0? Les donn\u00e9es seront synchronis\u00e9es entre les appareils. La page sera recharg\u00e9e.",
  "settings.customReadingDomains": "Domaines de lecture personnalis\u00e9s",
  "settings.customReadingDomainsHelp":
    "Ajoutez des domaines \u00e0 marquer automatiquement pour le mode lecture. Un domaine par ligne.",

  // Import / Export
  "importExport.title": "Importer / Exporter",
  "importExport.importTitle": "Importer des marque-pages",
  "importExport.importHelp":
    "Importez des marque-pages depuis une exportation de navigateur (format HTML Netscape).",
  "importExport.chooseFile": "Choisir un fichier",
  "importExport.newBookmarks": "{count} nouveaux marque-pages",
  "importExport.duplicatesSkipped": "{count} doublons ignor\u00e9s",
  "importExport.newTags": "{count} nouvelles \u00e9tiquettes",
  "importExport.import": "Importer",
  "importExport.cancel": "Annuler",
  "importExport.importing": "Importation...",
  "importExport.exportTitle": "Exporter les marque-pages",
  "importExport.exportButton": "Exporter {count} marque-pages",
  "importExport.addMissingFavicons": "Ajouter les favicons manquants",
  "importExport.freshTags": "Repartir avec de nouvelles étiquettes",
  "importExport.aiOrganize": "Organisation IA",
  "importExport.aiOrganizeHelp":
    "G\u00e9n\u00e9rez un prompt avec vos marque-pages, collez-le dans n\u2019importe quel LLM, puis importez la r\u00e9ponse JSON pour \u00e9tiqueter automatiquement vos marque-pages.",
  "importExport.copyAiPrompt": "Copier le prompt IA ({count} marque-pages)",
  "importExport.importAiResponse": "Importer la r\u00e9ponse IA",
  "importExport.bookmarksWithSuggestions":
    "{count} marque-pages avec suggestions d\u2019\u00e9tiquettes",
  "importExport.newAndExistingTags":
    "{newCount} nouvelles \u00e9tiquettes, {existingCount} \u00e9tiquettes existantes",
  "importExport.apply": "Appliquer",
  "importExport.toastParseWarnings": "Avertissements d\u2019analyse\u00a0: {count}",
  "importExport.toastPromptCopied": "Prompt copi\u00e9\u00a0!",
  "importExport.toastImported": "{count} marque-pages import\u00e9s",
  "importExport.toastExported": "Marque-pages export\u00e9s",
  "importExport.toastAppliedTags":
    "\u00c9tiquettes appliqu\u00e9es \u00e0 {count} marque-pages",

  // About
  "about.title": "\u00c0 propos",
  "about.appName": "BlazeMarks",
  "about.version": "Version 0.5",
  "about.description":
    "Un gestionnaire de marque-pages gratuit et local-first, construit avec Evolu et Next.js.",
} satisfies Translations;

export default fr;
