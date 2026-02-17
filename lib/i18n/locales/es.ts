import type { Translations } from "../types";

const es: Translations = {
  // Navigation
  "nav.home": "Inicio",
  "nav.readingMode": "Modo lectura",
  "nav.importExport": "Importar / Exportar",
  "nav.tags": "Etiquetas",
  "nav.settings": "Configuraci\u00f3n",
  "nav.help": "Ayuda",
  "nav.about": "Acerca de",
  "nav.menu": "Men\u00fa",

  // Home page
  "home.searchPlaceholder": "Buscar marcadores...",
  "home.clearSearch": "Borrar b\u00fasqueda",
  "home.search": "Buscar",
  "home.chat": "Chat",
  "home.emptyState":
    "A\u00fan no hay marcadores. A\u00f1ade el primero o usa el bookmarklet desde Configuraci\u00f3n.",

  // Reading page
  "reading.title": "Lectura",
  "reading.searchPlaceholder": "Buscar en lista de lectura...",
  "reading.clearSearch": "Borrar b\u00fasqueda",

  // Add page
  "add.saving": "Guardando marcador...",
  "add.error": "Error al guardar el marcador.",
  "add.saved": "\u00a1Marcador guardado!",
  "add.updated": "\u00a1Marcador actualizado!",

  // Bookmark card
  "bookmark.edit": "Editar marcador",
  "bookmark.markUnread": "Marcar como no le\u00eddo",
  "bookmark.markRead": "Marcar como le\u00eddo",
  "bookmark.delete": "Eliminar",
  "bookmark.unstar": "Quitar estrella",
  "bookmark.star": "Destacar",
  "bookmark.visit": "visita",
  "bookmark.visits": "visitas",
  "bookmark.confirmDelete": "\u00bfEliminar este marcador?",

  // Bookmark form
  "form.editBookmark": "Editar marcador",
  "form.addBookmark": "A\u00f1adir marcador",
  "form.urlPlaceholder": "URL (obligatoria)",
  "form.urlDuplicate": "Esta URL ya existe en tus marcadores.",
  "form.titlePlaceholder": "T\u00edtulo",
  "form.descriptionPlaceholder": "Descripci\u00f3n",
  "form.tagsPlaceholder": "Etiquetas (coma o enter para a\u00f1adir)",
  "form.toggleOn": "Activado",
  "form.toggleOff": "Desactivado",
  "form.showInReading": "Mostrar en Lectura",
  "form.cancel": "Cancelar",
  "form.save": "Guardar",
  "form.add": "A\u00f1adir",
  "form.toastUpdated": "Marcador actualizado",
  "form.toastCreateError": "Error al crear el marcador",
  "form.toastAdded": "Marcador a\u00f1adido",

  // Bookmark list
  "list.emptyReading":
    "No hay elementos en la lista de lectura. Los marcadores de sitios de noticias aparecer\u00e1n aqu\u00ed autom\u00e1ticamente.",
  "list.emptySearch": "Ning\u00fan marcador coincide con tu b\u00fasqueda.",

  // Filter bar
  "filter.dateAdded": "Fecha de creaci\u00f3n",
  "filter.lastVisited": "\u00daltima visita",
  "filter.visitCount": "N\u00famero de visitas",
  "filter.sortAscending": "Orden ascendente",
  "filter.sortDescending": "Orden descendente",

  // Tag chip
  "tag.remove": "Eliminar etiqueta {name}",

  // Tags page
  "tags.title": "Etiquetas",
  "tags.empty": "A\u00fan no hay etiquetas.",
  "tags.deleteTag": "Eliminar etiqueta {name}",
  "tags.confirmDelete": "\u00bfEliminar esta etiqueta?",
  "tags.toastDeleted": "Etiqueta eliminada",

  // Settings / Preferences
  "settings.title": "Configuraci\u00f3n",
  "settings.bookmarklet": "Bookmarklet",
  "settings.bookmarkletHelp":
    "Arrastra este enlace a tu barra de marcadores, o copia el c\u00f3digo de abajo:",
  "settings.copy": "Copiar",
  "settings.searchChat": "B\u00fasqueda y Chat",
  "settings.showSearchChat":
    "Mostrar botones de b\u00fasqueda y chat en la p\u00e1gina de inicio",
  "settings.searchProvider": "Proveedor de b\u00fasqueda",
  "settings.chatProvider": "Proveedor de chat",
  "settings.theme": "Tema",
  "settings.language": "Idioma",
  "settings.account": "Cuenta",
  "settings.showIdentityPhrase": "Mostrar frase de identidad",
  "settings.hideIdentityPhrase": "Ocultar frase de identidad",
  "settings.restoreIdentity": "Restaurar identidad",
  "settings.resetAllData": "Restablecer todos los datos",
  "settings.appearance": "Apariencia",
  "settings.toastBookmarkletCopied": "\u00a1C\u00f3digo del bookmarklet copiado!",
  "settings.confirmReset":
    "\u00bfEst\u00e1s seguro? Esto eliminar\u00e1 todos tus datos locales.",
  "settings.invalidIdentityPhrase":
    "Frase de identidad no v\u00e1lida. Por favor, rev\u00edsala e int\u00e9ntalo de nuevo.",
  "settings.enterIdentityPhrase": "Introduce tu frase de identidad de 24 palabras:",
  "settings.sync": "Sincronizaci\u00f3n",
  "settings.syncEnabled": "Sincronizaci\u00f3n activada",
  "settings.syncDisabled": "Solo local",
  "settings.syncHelp":
    "Cuando est\u00e1 activada, los marcadores se sincronizan entre dispositivos. Cuando est\u00e1 desactivada, los datos permanecen solo en este dispositivo. Cambiar esto recargar\u00e1 la p\u00e1gina.",
  "settings.syncConfirmDisable":
    "\u00bfDesactivar sincronizaci\u00f3n? Los datos solo se almacenar\u00e1n en este dispositivo. La p\u00e1gina se recargar\u00e1.",
  "settings.syncConfirmEnable":
    "\u00bfActivar sincronizaci\u00f3n? Los datos se sincronizar\u00e1n entre dispositivos. La p\u00e1gina se recargar\u00e1.",
  "settings.customReadingDomains": "Dominios de lectura personalizados",
  "settings.customReadingDomainsHelp":
    "A\u00f1ade dominios que se marcar\u00e1n autom\u00e1ticamente para modo lectura. Un dominio por l\u00ednea.",

  // Import / Export
  "importExport.title": "Importar / Exportar",
  "importExport.importTitle": "Importar marcadores",
  "importExport.importHelp":
    "Importa marcadores desde una exportaci\u00f3n del navegador (formato HTML Netscape).",
  "importExport.chooseFile": "Elegir archivo",
  "importExport.newBookmarks": "{count} marcadores nuevos",
  "importExport.duplicatesSkipped": "{count} duplicados omitidos",
  "importExport.newTags": "{count} etiquetas nuevas",
  "importExport.import": "Importar",
  "importExport.cancel": "Cancelar",
  "importExport.importing": "Importando...",
  "importExport.exportTitle": "Exportar marcadores",
  "importExport.exportButton": "Exportar {count} marcadores",
  "importExport.addMissingFavicons": "Agregar favicons faltantes",
  "importExport.freshTags": "Empezar con etiquetas nuevas",
  "importExport.aiOrganize": "Organizar con IA",
  "importExport.aiOrganizeHelp":
    "Genera un prompt con tus marcadores, p\u00e9galo en cualquier LLM y luego importa la respuesta JSON para etiquetar autom\u00e1ticamente tus marcadores.",
  "importExport.copyAiPrompt": "Copiar prompt de IA ({count} marcadores)",
  "importExport.importAiResponse": "Importar respuesta de IA",
  "importExport.bookmarksWithSuggestions":
    "{count} marcadores con sugerencias de etiquetas",
  "importExport.newAndExistingTags":
    "{newCount} etiquetas nuevas, {existingCount} etiquetas existentes",
  "importExport.apply": "Aplicar",
  "importExport.toastParseWarnings": "Advertencias de an\u00e1lisis: {count}",
  "importExport.toastPromptCopied": "\u00a1Prompt copiado!",
  "importExport.toastImported": "{count} marcadores importados",
  "importExport.toastExported": "Marcadores exportados",
  "importExport.toastAppliedTags":
    "Etiquetas aplicadas a {count} marcadores",

  // About
  "about.title": "Acerca de",
  "about.appName": "BlazeMarks",
  "about.version": "Versi\u00f3n 0.5",
  "about.description":
    "Un gestor de marcadores gratuito y local-first, construido con Evolu y Next.js.",
} satisfies Translations;

export default es;
