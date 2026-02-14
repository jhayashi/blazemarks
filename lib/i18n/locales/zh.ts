import type { Translations } from "../types";

const zh: Translations = {
  // Navigation
  "nav.home": "首页",
  "nav.readingMode": "阅读模式",
  "nav.importExport": "导入 / 导出",
  "nav.tags": "标签",
  "nav.settings": "设置",
  "nav.help": "帮助",
  "nav.about": "关于",
  "nav.menu": "菜单",

  // Home page
  "home.searchPlaceholder": "搜索书签...",
  "home.clearSearch": "清除搜索",
  "home.search": "搜索",
  "home.chat": "聊天",
  "home.emptyState":
    "还没有书签。添加您的第一个书签，或从设置中使用书签工具。",

  // Reading page
  "reading.title": "阅读",
  "reading.searchPlaceholder": "搜索阅读列表...",
  "reading.clearSearch": "清除搜索",

  // Add page
  "add.saving": "正在保存书签...",
  "add.error": "保存书签失败。",
  "add.saved": "书签已保存！",
  "add.updated": "书签已更新！",

  // Bookmark card
  "bookmark.edit": "编辑书签",
  "bookmark.markUnread": "标记为未读",
  "bookmark.markRead": "标记为已读",
  "bookmark.delete": "删除",
  "bookmark.unstar": "取消收藏",
  "bookmark.star": "收藏",
  "bookmark.visit": "次访问",
  "bookmark.visits": "次访问",
  "bookmark.confirmDelete": "确定要删除此书签吗？",

  // Bookmark form
  "form.editBookmark": "编辑书签",
  "form.addBookmark": "添加书签",
  "form.urlPlaceholder": "URL（必填）",
  "form.urlDuplicate": "此URL已存在于您的书签中。",
  "form.titlePlaceholder": "标题",
  "form.descriptionPlaceholder": "描述",
  "form.tagsPlaceholder": "标签（用逗号或回车键添加）",
  "form.toggleOn": "开",
  "form.toggleOff": "关",
  "form.showInReading": "在阅读中显示",
  "form.cancel": "取消",
  "form.save": "保存",
  "form.add": "添加",
  "form.toastUpdated": "书签已更新",
  "form.toastCreateError": "创建书签失败",
  "form.toastAdded": "书签已添加",

  // Bookmark list
  "list.emptyReading":
    "阅读列表中没有项目。来自新闻网站的书签将自动显示在这里。",
  "list.emptySearch": "没有与搜索匹配的书签。",

  // Filter bar
  "filter.dateAdded": "添加日期",
  "filter.lastVisited": "最后访问",
  "filter.visitCount": "访问次数",
  "filter.sortAscending": "升序排列",
  "filter.sortDescending": "降序排列",

  // Tag chip
  "tag.remove": "移除标签 {name}",

  // Tags page
  "tags.title": "标签",
  "tags.empty": "还没有标签。",
  "tags.deleteTag": "删除标签 {name}",
  "tags.confirmDelete": "确定要删除此标签吗？",
  "tags.toastDeleted": "标签已删除",

  // Settings / Preferences
  "settings.title": "设置",
  "settings.bookmarklet": "书签工具",
  "settings.bookmarkletHelp":
    "将此链接拖到书签栏，或复制以下代码：",
  "settings.copy": "复制",
  "settings.searchChat": "搜索和聊天",
  "settings.showSearchChat": "在首页显示搜索和聊天按钮",
  "settings.searchProvider": "搜索引擎",
  "settings.chatProvider": "聊天服务",
  "settings.theme": "主题",
  "settings.language": "语言",
  "settings.account": "账户",
  "settings.showMnemonic": "显示助记词",
  "settings.hideMnemonic": "隐藏助记词",
  "settings.restoreOwner": "恢复所有者",
  "settings.resetOwner": "重置所有者",
  "settings.toastBookmarkletCopied": "书签工具代码已复制！",
  "settings.confirmReset":
    "您确定吗？这将删除您的所有本地数据。",
  "settings.invalidMnemonic":
    "助记词无效。请检查后重试。",
  "settings.enterMnemonic": "请输入您的助记词：",
  "settings.sync": "同步",
  "settings.syncEnabled": "同步已启用",
  "settings.syncDisabled": "仅本地",
  "settings.syncHelp":
    "启用后，书签将在设备间同步。禁用后，数据仅存储在此设备上。更改此设置将重新加载页面。",
  "settings.syncConfirmDisable":
    "禁用同步？数据将仅存储在此设备上。页面将重新加载。",
  "settings.syncConfirmEnable":
    "启用同步？数据将在设备间同步。页面将重新加载。",

  // Import / Export
  "importExport.title": "导入 / 导出",
  "importExport.importTitle": "导入书签",
  "importExport.importHelp":
    "从浏览器导出的文件中导入书签（Netscape HTML格式）。",
  "importExport.chooseFile": "选择文件",
  "importExport.newBookmarks": "{count} 个新书签",
  "importExport.duplicatesSkipped": "跳过 {count} 个重复项",
  "importExport.newTags": "{count} 个新标签",
  "importExport.import": "导入",
  "importExport.cancel": "取消",
  "importExport.importing": "正在导入...",
  "importExport.exportTitle": "导出书签",
  "importExport.exportButton": "导出 {count} 个书签",
  "importExport.addMissingFavicons": "添加缺失的网站图标",
  "importExport.freshTags": "使用全新标签重新开始",
  "importExport.aiOrganize": "AI整理",
  "importExport.aiOrganizeHelp":
    "生成包含您书签的提示词，粘贴到任意大语言模型中，然后导入JSON响应来自动为书签添加标签。",
  "importExport.copyAiPrompt": "复制AI提示词（{count} 个书签）",
  "importExport.importAiResponse": "导入AI响应",
  "importExport.bookmarksWithSuggestions":
    "{count} 个书签有标签建议",
  "importExport.newAndExistingTags":
    "{newCount} 个新标签，{existingCount} 个已有标签",
  "importExport.apply": "应用",
  "importExport.toastParseWarnings": "解析警告：{count}",
  "importExport.toastPromptCopied": "提示词已复制！",
  "importExport.toastImported": "已导入 {count} 个书签",
  "importExport.toastExported": "书签已导出",
  "importExport.toastAppliedTags":
    "已为 {count} 个书签应用标签",

  // About
  "about.title": "关于",
  "about.appName": "BlazeMarks",
  "about.version": "版本 0.5",
  "about.description":
    "一款免费的本地优先书签管理器，基于Evolu和Next.js构建。",
};

export default zh;
