import type { Translations } from "../types";

const it: Translations = {
  // Navigation
  "nav.home": "Home",
  "nav.readingMode": "Modalità lettura",
  "nav.importExport": "Importa / Esporta",
  "nav.tags": "Tag",
  "nav.settings": "Impostazioni",
  "nav.help": "Aiuto",
  "nav.about": "Info",
  "nav.menu": "Menu",

  // Home page
  "home.searchPlaceholder": "Cerca nei segnalibri...",
  "home.clearSearch": "Cancella ricerca",
  "home.search": "Cerca",
  "home.chat": "Chat",
  "home.emptyState":
    "Nessun segnalibro ancora. Aggiungi il primo o usa il bookmarklet dalle Impostazioni.",

  // Reading page
  "reading.title": "Lettura",
  "reading.searchPlaceholder": "Cerca nella lista di lettura...",
  "reading.clearSearch": "Cancella ricerca",

  // Add page
  "add.saving": "Salvataggio segnalibro...",
  "add.error": "Impossibile salvare il segnalibro.",
  "add.saved": "Segnalibro salvato!",
  "add.updated": "Segnalibro aggiornato!",

  // Bookmark card
  "bookmark.edit": "Modifica segnalibro",
  "bookmark.markUnread": "Segna come non letto",
  "bookmark.markRead": "Segna come letto",
  "bookmark.delete": "Elimina",
  "bookmark.unstar": "Rimuovi stella",
  "bookmark.star": "Aggiungi stella",
  "bookmark.visit": "visita",
  "bookmark.visits": "visite",
  "bookmark.confirmDelete": "Eliminare questo segnalibro?",

  // Bookmark form
  "form.editBookmark": "Modifica segnalibro",
  "form.addBookmark": "Aggiungi segnalibro",
  "form.urlPlaceholder": "URL (obbligatorio)",
  "form.urlDuplicate": "Questo URL esiste già nei tuoi segnalibri.",
  "form.titlePlaceholder": "Titolo",
  "form.descriptionPlaceholder": "Descrizione",
  "form.tagsPlaceholder": "Tag (virgola o invio per aggiungere)",
  "form.toggleOn": "Attivo",
  "form.toggleOff": "Disattivo",
  "form.showInReading": "Mostra in Lettura",
  "form.cancel": "Annulla",
  "form.save": "Salva",
  "form.add": "Aggiungi",
  "form.toastUpdated": "Segnalibro aggiornato",
  "form.toastCreateError": "Impossibile creare il segnalibro",
  "form.toastAdded": "Segnalibro aggiunto",

  // Bookmark list
  "list.emptyReading":
    "Nessun elemento nella lista di lettura. I segnalibri dai siti di notizie appariranno qui automaticamente.",
  "list.emptySearch": "Nessun segnalibro corrisponde alla ricerca.",

  // Filter bar
  "filter.dateAdded": "Data aggiunta",
  "filter.lastVisited": "Ultima visita",
  "filter.visitCount": "Numero di visite",
  "filter.sortAscending": "Ordine crescente",
  "filter.sortDescending": "Ordine decrescente",

  // Tag chip
  "tag.remove": "Rimuovi tag {name}",

  // Tags page
  "tags.title": "Tag",
  "tags.empty": "Nessun tag ancora.",
  "tags.deleteTag": "Elimina tag {name}",
  "tags.confirmDelete": "Eliminare questo tag?",
  "tags.toastDeleted": "Tag eliminato",

  // Settings / Preferences
  "settings.title": "Impostazioni",
  "settings.bookmarklet": "Bookmarklet",
  "settings.bookmarkletHelp":
    "Trascina questo link nella barra dei segnalibri, oppure copia il codice qui sotto:",
  "settings.copy": "Copia",
  "settings.searchChat": "Ricerca e Chat",
  "settings.showSearchChat":
    "Mostra i pulsanti di ricerca e chat nella home page",
  "settings.searchProvider": "Provider di ricerca",
  "settings.chatProvider": "Provider di chat",
  "settings.theme": "Tema",
  "settings.language": "Lingua",
  "settings.account": "Account",
  "settings.showMnemonic": "Mostra mnemonic",
  "settings.hideMnemonic": "Nascondi mnemonic",
  "settings.restoreOwner": "Ripristina proprietario",
  "settings.resetOwner": "Reimposta proprietario",
  "settings.toastBookmarkletCopied": "Codice bookmarklet copiato!",
  "settings.confirmReset":
    "Sei sicuro? Questo eliminerà tutti i tuoi dati locali.",
  "settings.invalidMnemonic":
    "Mnemonic non valido. Controlla e riprova.",
  "settings.enterMnemonic": "Inserisci il tuo mnemonic:",
  "settings.sync": "Sincronizzazione",
  "settings.syncEnabled": "Sincronizzazione attiva",
  "settings.syncDisabled": "Solo locale",
  "settings.syncHelp":
    "Quando attiva, i segnalibri si sincronizzano tra i dispositivi. Quando disattiva, i dati rimangono solo su questo dispositivo. La modifica ricaricher\u00e0 la pagina.",
  "settings.syncConfirmDisable":
    "Disattivare la sincronizzazione? I dati saranno memorizzati solo su questo dispositivo. La pagina verr\u00e0 ricaricata.",
  "settings.syncConfirmEnable":
    "Attivare la sincronizzazione? I dati verranno sincronizzati tra i dispositivi. La pagina verr\u00e0 ricaricata.",

  // Import / Export
  "importExport.title": "Importa / Esporta",
  "importExport.importTitle": "Importa segnalibri",
  "importExport.importHelp":
    "Importa segnalibri da un'esportazione del browser (formato HTML Netscape).",
  "importExport.chooseFile": "Scegli file",
  "importExport.newBookmarks": "{count} nuovi segnalibri",
  "importExport.duplicatesSkipped": "{count} duplicati saltati",
  "importExport.newTags": "{count} nuovi tag",
  "importExport.import": "Importa",
  "importExport.cancel": "Annulla",
  "importExport.importing": "Importazione in corso...",
  "importExport.exportTitle": "Esporta segnalibri",
  "importExport.exportButton": "Esporta {count} segnalibri",
  "importExport.addMissingFavicons": "Aggiungi favicon mancanti",
  "importExport.freshTags": "Ricomincia con nuove etichette",
  "importExport.aiOrganize": "Organizzazione IA",
  "importExport.aiOrganizeHelp":
    "Genera un prompt con i tuoi segnalibri, incollalo in qualsiasi LLM, poi importa la risposta JSON per taggare automaticamente i tuoi segnalibri.",
  "importExport.copyAiPrompt": "Copia prompt IA ({count} segnalibri)",
  "importExport.importAiResponse": "Importa risposta IA",
  "importExport.bookmarksWithSuggestions":
    "{count} segnalibri con suggerimenti di tag",
  "importExport.newAndExistingTags":
    "{newCount} nuovi tag, {existingCount} tag esistenti",
  "importExport.apply": "Applica",
  "importExport.toastParseWarnings": "Avvisi di parsing: {count}",
  "importExport.toastPromptCopied": "Prompt copiato!",
  "importExport.toastImported": "{count} segnalibri importati",
  "importExport.toastExported": "Segnalibri esportati",
  "importExport.toastAppliedTags":
    "Tag applicati a {count} segnalibri",

  // About
  "about.title": "Info",
  "about.appName": "BlazeMarks",
  "about.version": "Versione 0.5",
  "about.description":
    "Un gestore di segnalibri gratuito e local-first, realizzato con Evolu e Next.js.",
};

export default it;
