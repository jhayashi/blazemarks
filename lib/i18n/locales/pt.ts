import type { Translations } from "../types";

const pt: Translations = {
  // Navigation
  "nav.home": "In\u00edcio",
  "nav.readingMode": "Modo leitura",
  "nav.importExport": "Importar / Exportar",
  "nav.tags": "Tags",
  "nav.settings": "Configura\u00e7\u00f5es",
  "nav.help": "Ajuda",
  "nav.about": "Sobre",
  "nav.menu": "Menu",

  // Home page
  "home.searchPlaceholder": "Pesquisar favoritos...",
  "home.clearSearch": "Limpar pesquisa",
  "home.search": "Pesquisar",
  "home.chat": "Chat",
  "home.emptyState":
    "Nenhum favorito ainda. Adicione o primeiro ou use o bookmarklet nas Configura\u00e7\u00f5es.",

  // Reading page
  "reading.title": "Leitura",
  "reading.searchPlaceholder": "Pesquisar na lista de leitura...",
  "reading.clearSearch": "Limpar pesquisa",

  // Add page
  "add.saving": "Salvando favorito...",
  "add.error": "Falha ao salvar o favorito.",
  "add.saved": "Favorito salvo!",
  "add.updated": "Favorito atualizado!",

  // Bookmark card
  "bookmark.edit": "Editar favorito",
  "bookmark.markUnread": "Marcar como n\u00e3o lido",
  "bookmark.markRead": "Marcar como lido",
  "bookmark.delete": "Excluir",
  "bookmark.unstar": "Remover estrela",
  "bookmark.star": "Favoritar",
  "bookmark.visit": "visita",
  "bookmark.visits": "visitas",
  "bookmark.confirmDelete": "Excluir este favorito?",

  // Bookmark form
  "form.editBookmark": "Editar favorito",
  "form.addBookmark": "Adicionar favorito",
  "form.urlPlaceholder": "URL (obrigat\u00f3ria)",
  "form.urlDuplicate": "Esta URL j\u00e1 existe nos seus favoritos.",
  "form.titlePlaceholder": "T\u00edtulo",
  "form.descriptionPlaceholder": "Descri\u00e7\u00e3o",
  "form.tagsPlaceholder": "Tags (v\u00edrgula ou enter para adicionar)",
  "form.toggleOn": "Ativado",
  "form.toggleOff": "Desativado",
  "form.showInReading": "Mostrar em Leitura",
  "form.cancel": "Cancelar",
  "form.save": "Salvar",
  "form.add": "Adicionar",
  "form.toastUpdated": "Favorito atualizado",
  "form.toastCreateError": "Falha ao criar o favorito",
  "form.toastAdded": "Favorito adicionado",

  // Bookmark list
  "list.emptyReading":
    "Nenhum item na lista de leitura. Favoritos de sites de not\u00edcias aparecer\u00e3o aqui automaticamente.",
  "list.emptySearch": "Nenhum favorito corresponde \u00e0 sua pesquisa.",

  // Filter bar
  "filter.dateAdded": "Data de adi\u00e7\u00e3o",
  "filter.lastVisited": "\u00daltima visita",
  "filter.visitCount": "N\u00famero de visitas",
  "filter.sortAscending": "Ordem crescente",
  "filter.sortDescending": "Ordem decrescente",

  // Tag chip
  "tag.remove": "Remover tag {name}",

  // Tags page
  "tags.title": "Tags",
  "tags.empty": "Nenhuma tag ainda.",
  "tags.deleteTag": "Excluir tag {name}",
  "tags.confirmDelete": "Excluir esta tag?",
  "tags.toastDeleted": "Tag exclu\u00edda",

  // Settings / Preferences
  "settings.title": "Configura\u00e7\u00f5es",
  "settings.bookmarklet": "Bookmarklet",
  "settings.bookmarkletHelp":
    "Arraste este link para a barra de favoritos, ou copie o c\u00f3digo abaixo:",
  "settings.copy": "Copiar",
  "settings.searchChat": "Pesquisa e Chat",
  "settings.showSearchChat":
    "Mostrar bot\u00f5es de pesquisa e chat na p\u00e1gina inicial",
  "settings.searchProvider": "Provedor de pesquisa",
  "settings.chatProvider": "Provedor de chat",
  "settings.theme": "Tema",
  "settings.language": "Idioma",
  "settings.account": "Conta",
  "settings.showIdentityPhrase": "Mostrar frase de identidade",
  "settings.hideIdentityPhrase": "Ocultar frase de identidade",
  "settings.restoreIdentity": "Restaurar identidade",
  "settings.resetAllData": "Redefinir todos os dados",
  "settings.appearance": "Apar\u00eancia",
  "settings.toastBookmarkletCopied": "C\u00f3digo do bookmarklet copiado!",
  "settings.confirmReset":
    "Tem certeza? Isso excluir\u00e1 todos os seus dados locais.",
  "settings.invalidIdentityPhrase":
    "Frase de identidade inv\u00e1lida. Verifique e tente novamente.",
  "settings.enterIdentityPhrase": "Digite sua frase de identidade de 24 palavras:",
  "settings.sync": "Sincroniza\u00e7\u00e3o",
  "settings.syncEnabled": "Sincroniza\u00e7\u00e3o ativada",
  "settings.syncDisabled": "Apenas local",
  "settings.syncHelp":
    "Quando ativada, os favoritos sincronizam entre dispositivos. Quando desativada, os dados ficam apenas neste dispositivo. Alterar isso recarregar\u00e1 a p\u00e1gina.",
  "settings.syncConfirmDisable":
    "Desativar sincroniza\u00e7\u00e3o? Os dados ser\u00e3o armazenados apenas neste dispositivo. A p\u00e1gina ser\u00e1 recarregada.",
  "settings.syncConfirmEnable":
    "Ativar sincroniza\u00e7\u00e3o? Os dados ser\u00e3o sincronizados entre dispositivos. A p\u00e1gina ser\u00e1 recarregada.",

  // Import / Export
  "importExport.title": "Importar / Exportar",
  "importExport.importTitle": "Importar favoritos",
  "importExport.importHelp":
    "Importe favoritos de uma exporta\u00e7\u00e3o do navegador (formato HTML Netscape).",
  "importExport.chooseFile": "Escolher arquivo",
  "importExport.newBookmarks": "{count} novos favoritos",
  "importExport.duplicatesSkipped": "{count} duplicatas ignoradas",
  "importExport.newTags": "{count} novas tags",
  "importExport.import": "Importar",
  "importExport.cancel": "Cancelar",
  "importExport.importing": "Importando...",
  "importExport.exportTitle": "Exportar favoritos",
  "importExport.exportButton": "Exportar {count} favoritos",
  "importExport.addMissingFavicons": "Adicionar favicons ausentes",
  "importExport.freshTags": "Começar com novas tags",
  "importExport.aiOrganize": "Organizar com IA",
  "importExport.aiOrganizeHelp":
    "Gere um prompt com seus favoritos, cole em qualquer LLM e depois importe a resposta JSON para etiquetar automaticamente seus favoritos.",
  "importExport.copyAiPrompt": "Copiar prompt de IA ({count} favoritos)",
  "importExport.importAiResponse": "Importar resposta da IA",
  "importExport.bookmarksWithSuggestions":
    "{count} favoritos com sugest\u00f5es de tags",
  "importExport.newAndExistingTags":
    "{newCount} novas tags, {existingCount} tags existentes",
  "importExport.apply": "Aplicar",
  "importExport.toastParseWarnings": "Avisos de an\u00e1lise: {count}",
  "importExport.toastPromptCopied": "Prompt copiado!",
  "importExport.toastImported": "{count} favoritos importados",
  "importExport.toastExported": "Favoritos exportados",
  "importExport.toastAppliedTags": "Tags aplicadas a {count} favoritos",

  // About
  "about.title": "Sobre",
  "about.appName": "BlazeMarks",
  "about.version": "Vers\u00e3o 0.5",
  "about.description":
    "Um gerenciador de favoritos gratuito e local-first, constru\u00eddo com Evolu e Next.js.",
} satisfies Translations;

export default pt;
