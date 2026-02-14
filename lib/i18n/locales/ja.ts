import type { Translations } from "../types";

const ja: Translations = {
  // Navigation
  "nav.home": "ホーム",
  "nav.readingMode": "リーディングモード",
  "nav.importExport": "インポート / エクスポート",
  "nav.tags": "タグ",
  "nav.settings": "設定",
  "nav.help": "ヘルプ",
  "nav.about": "このアプリについて",
  "nav.menu": "メニュー",

  // Home page
  "home.searchPlaceholder": "ブックマークを検索...",
  "home.clearSearch": "検索をクリア",
  "home.search": "検索",
  "home.chat": "チャット",
  "home.emptyState":
    "ブックマークがまだありません。最初のブックマークを追加するか、設定からブックマークレットをご利用ください。",

  // Reading page
  "reading.title": "リーディング",
  "reading.searchPlaceholder": "リーディングリストを検索...",
  "reading.clearSearch": "検索をクリア",

  // Add page
  "add.saving": "ブックマークを保存中...",
  "add.error": "ブックマークの保存に失敗しました。",
  "add.saved": "ブックマークを保存しました！",
  "add.updated": "ブックマークを更新しました！",

  // Bookmark card
  "bookmark.edit": "ブックマークを編集",
  "bookmark.markUnread": "未読にする",
  "bookmark.markRead": "既読にする",
  "bookmark.delete": "削除",
  "bookmark.unstar": "スターを外す",
  "bookmark.star": "スターを付ける",
  "bookmark.visit": "回訪問",
  "bookmark.visits": "回訪問",
  "bookmark.confirmDelete": "このブックマークを削除しますか？",

  // Bookmark form
  "form.editBookmark": "ブックマークを編集",
  "form.addBookmark": "ブックマークを追加",
  "form.urlPlaceholder": "URL（必須）",
  "form.urlDuplicate": "このURLは既にブックマークに存在します。",
  "form.titlePlaceholder": "タイトル",
  "form.descriptionPlaceholder": "説明",
  "form.tagsPlaceholder": "タグ（カンマまたはEnterで追加）",
  "form.toggleOn": "オン",
  "form.toggleOff": "オフ",
  "form.showInReading": "リーディングに表示",
  "form.cancel": "キャンセル",
  "form.save": "保存",
  "form.add": "追加",
  "form.toastUpdated": "ブックマークを更新しました",
  "form.toastCreateError": "ブックマークの作成に失敗しました",
  "form.toastAdded": "ブックマークを追加しました",

  // Bookmark list
  "list.emptyReading":
    "リーディングリストにアイテムがありません。ニュースサイトのブックマークは自動的にここに表示されます。",
  "list.emptySearch": "検索に一致するブックマークはありません。",

  // Filter bar
  "filter.dateAdded": "追加日",
  "filter.lastVisited": "最終訪問日",
  "filter.visitCount": "訪問回数",
  "filter.sortAscending": "昇順",
  "filter.sortDescending": "降順",

  // Tag chip
  "tag.remove": "タグ {name} を削除",

  // Tags page
  "tags.title": "タグ",
  "tags.empty": "タグがまだありません。",
  "tags.deleteTag": "タグ {name} を削除",
  "tags.confirmDelete": "このタグを削除しますか？",
  "tags.toastDeleted": "タグを削除しました",

  // Settings / Preferences
  "settings.title": "設定",
  "settings.bookmarklet": "ブックマークレット",
  "settings.bookmarkletHelp":
    "このリンクをブックマークバーにドラッグするか、下のコードをコピーしてください：",
  "settings.copy": "コピー",
  "settings.searchChat": "検索とチャット",
  "settings.showSearchChat": "ホームページに検索とチャットボタンを表示",
  "settings.searchProvider": "検索プロバイダー",
  "settings.chatProvider": "チャットプロバイダー",
  "settings.theme": "テーマ",
  "settings.language": "言語",
  "settings.account": "アカウント",
  "settings.showMnemonic": "ニーモニックを表示",
  "settings.hideMnemonic": "ニーモニックを非表示",
  "settings.restoreOwner": "オーナーを復元",
  "settings.resetOwner": "オーナーをリセット",
  "settings.toastBookmarkletCopied": "ブックマークレットのコードをコピーしました！",
  "settings.confirmReset":
    "本当によろしいですか？ローカルデータがすべて削除されます。",
  "settings.invalidMnemonic":
    "無効なニーモニックです。確認してもう一度お試しください。",
  "settings.enterMnemonic": "ニーモニックを入力してください：",
  "settings.sync": "同期",
  "settings.syncEnabled": "同期有効",
  "settings.syncDisabled": "ローカルのみ",
  "settings.syncHelp":
    "有効にすると、ブックマークはデバイス間で同期されます。無効にすると、データはこのデバイスにのみ保存されます。この設定を変更するとページが再読み込みされます。",
  "settings.syncConfirmDisable":
    "同期を無効にしますか？データはこのデバイスにのみ保存されます。ページが再読み込みされます。",
  "settings.syncConfirmEnable":
    "同期を有効にしますか？データはデバイス間で同期されます。ページが再読み込みされます。",

  // Import / Export
  "importExport.title": "インポート / エクスポート",
  "importExport.importTitle": "ブックマークをインポート",
  "importExport.importHelp":
    "ブラウザからエクスポートしたブックマークをインポートします（Netscape HTML形式）。",
  "importExport.chooseFile": "ファイルを選択",
  "importExport.newBookmarks": "{count} 件の新しいブックマーク",
  "importExport.duplicatesSkipped": "{count} 件の重複をスキップ",
  "importExport.newTags": "{count} 件の新しいタグ",
  "importExport.import": "インポート",
  "importExport.cancel": "キャンセル",
  "importExport.importing": "インポート中...",
  "importExport.exportTitle": "ブックマークをエクスポート",
  "importExport.exportButton": "{count} 件のブックマークをエクスポート",
  "importExport.addMissingFavicons": "不足しているファビコンを追加",
  "importExport.freshTags": "新しいタグでやり直す",
  "importExport.aiOrganize": "AI整理",
  "importExport.aiOrganizeHelp":
    "ブックマークのプロンプトを生成し、任意のLLMに貼り付けて、JSONレスポンスをインポートしてブックマークに自動タグ付けします。",
  "importExport.copyAiPrompt": "AIプロンプトをコピー（{count} 件のブックマーク）",
  "importExport.importAiResponse": "AIレスポンスをインポート",
  "importExport.bookmarksWithSuggestions":
    "{count} 件のブックマークにタグ提案あり",
  "importExport.newAndExistingTags":
    "{newCount} 件の新しいタグ、{existingCount} 件の既存タグ",
  "importExport.apply": "適用",
  "importExport.toastParseWarnings": "解析警告: {count}",
  "importExport.toastPromptCopied": "プロンプトをコピーしました！",
  "importExport.toastImported": "{count} 件のブックマークをインポートしました",
  "importExport.toastExported": "ブックマークをエクスポートしました",
  "importExport.toastAppliedTags":
    "{count} 件のブックマークにタグを適用しました",

  // About
  "about.title": "このアプリについて",
  "about.appName": "BlazeMarks",
  "about.version": "バージョン 0.5",
  "about.description":
    "EvoluとNext.jsで構築された、無料のローカルファーストブックマークマネージャーです。",
};

export default ja;
