import type { Translations } from "../types";

const ko: Translations = {
  // Navigation
  "nav.home": "홈",
  "nav.readingMode": "읽기 모드",
  "nav.importExport": "가져오기 / 내보내기",
  "nav.tags": "태그",
  "nav.settings": "설정",
  "nav.help": "도움말",
  "nav.about": "정보",
  "nav.menu": "메뉴",

  // Home page
  "home.searchPlaceholder": "북마크 검색...",
  "home.clearSearch": "검색 지우기",
  "home.search": "검색",
  "home.chat": "채팅",
  "home.emptyState":
    "아직 북마크가 없습니다. 첫 북마크를 추가하거나 설정의 북마클릿을 사용하세요.",

  // Reading page
  "reading.title": "읽기 목록",
  "reading.searchPlaceholder": "읽기 목록 검색...",
  "reading.clearSearch": "검색 지우기",

  // Add page
  "add.saving": "북마크 저장 중...",
  "add.error": "북마크를 저장하지 못했습니다.",
  "add.saved": "북마크가 저장되었습니다!",
  "add.updated": "북마크가 업데이트되었습니다!",

  // Bookmark card
  "bookmark.edit": "북마크 편집",
  "bookmark.markUnread": "읽지 않음으로 표시",
  "bookmark.markRead": "읽음으로 표시",
  "bookmark.delete": "삭제",
  "bookmark.unstar": "별표 해제",
  "bookmark.star": "별표",
  "bookmark.visit": "방문",
  "bookmark.visits": "방문",
  "bookmark.confirmDelete": "이 북마크를 삭제하시겠습니까?",

  // Bookmark form
  "form.editBookmark": "북마크 편집",
  "form.addBookmark": "북마크 추가",
  "form.urlPlaceholder": "URL (필수)",
  "form.urlDuplicate": "이 URL은 이미 북마크에 존재합니다.",
  "form.titlePlaceholder": "제목",
  "form.descriptionPlaceholder": "설명",
  "form.tagsPlaceholder": "태그 (쉼표 또는 Enter로 추가)",
  "form.toggleOn": "켜기",
  "form.toggleOff": "끄기",
  "form.showInReading": "읽기 목록에 표시",
  "form.cancel": "취소",
  "form.save": "저장",
  "form.add": "추가",
  "form.toastUpdated": "북마크가 업데이트되었습니다",
  "form.toastCreateError": "북마크를 생성하지 못했습니다",
  "form.toastAdded": "북마크가 추가되었습니다",

  // Bookmark list
  "list.emptyReading":
    "읽기 목록 항목이 없습니다. 뉴스 사이트의 북마크가 자동으로 여기에 표시됩니다.",
  "list.emptySearch": "검색과 일치하는 북마크가 없습니다.",

  // Filter bar
  "filter.dateAdded": "추가 날짜",
  "filter.lastVisited": "마지막 방문",
  "filter.visitCount": "방문 횟수",
  "filter.sortAscending": "오름차순 정렬",
  "filter.sortDescending": "내림차순 정렬",

  // Tag chip
  "tag.remove": "태그 {name} 제거",

  // Tags page
  "tags.title": "태그",
  "tags.empty": "아직 태그가 없습니다.",
  "tags.deleteTag": "태그 {name} 삭제",
  "tags.confirmDelete": "이 태그를 삭제하시겠습니까?",
  "tags.toastDeleted": "태그가 삭제되었습니다",

  // Settings / Preferences
  "settings.title": "설정",
  "settings.bookmarklet": "북마클릿",
  "settings.bookmarkletHelp":
    "이 링크를 북마크 바로 드래그하거나 아래 코드를 복사하세요:",
  "settings.copy": "복사",
  "settings.searchChat": "검색 및 채팅",
  "settings.showSearchChat": "홈 페이지에 검색 및 채팅 버튼 표시",
  "settings.searchProvider": "검색 제공자",
  "settings.chatProvider": "채팅 제공자",
  "settings.theme": "테마",
  "settings.language": "언어",
  "settings.account": "계정",
  "settings.showMnemonic": "니모닉 표시",
  "settings.hideMnemonic": "니모닉 숨기기",
  "settings.restoreOwner": "소유자 복원",
  "settings.resetOwner": "소유자 초기화",
  "settings.toastBookmarkletCopied": "북마클릿 코드가 복사되었습니다!",
  "settings.confirmReset":
    "정말로 진행하시겠습니까? 모든 로컬 데이터가 삭제됩니다.",
  "settings.invalidMnemonic":
    "유효하지 않은 니모닉입니다. 확인 후 다시 시도해 주세요.",
  "settings.enterMnemonic": "니모닉을 입력하세요:",
  "settings.sync": "동기화",
  "settings.syncEnabled": "동기화 활성화됨",
  "settings.syncDisabled": "로컬 전용",
  "settings.syncHelp":
    "활성화하면 북마크가 기기 간에 동기화됩니다. 비활성화하면 데이터가 이 기기에만 저장됩니다. 이 설정을 변경하면 페이지가 새로고침됩니다.",
  "settings.syncConfirmDisable":
    "동기화를 비활성화하시겠습니까? 데이터가 이 기기에만 저장됩니다. 페이지가 새로고침됩니다.",
  "settings.syncConfirmEnable":
    "동기화를 활성화하시겠습니까? 데이터가 기기 간에 동기화됩니다. 페이지가 새로고침됩니다.",

  // Import / Export
  "importExport.title": "가져오기 / 내보내기",
  "importExport.importTitle": "북마크 가져오기",
  "importExport.importHelp":
    "브라우저 내보내기 파일에서 북마크를 가져옵니다 (Netscape HTML 형식).",
  "importExport.chooseFile": "파일 선택",
  "importExport.newBookmarks": "새 북마크 {count}개",
  "importExport.duplicatesSkipped": "중복 {count}개 건너뜀",
  "importExport.newTags": "새 태그 {count}개",
  "importExport.import": "가져오기",
  "importExport.cancel": "취소",
  "importExport.importing": "가져오는 중...",
  "importExport.exportTitle": "북마크 내보내기",
  "importExport.exportButton": "북마크 {count}개 내보내기",
  "importExport.addMissingFavicons": "누락된 파비콘 추가",
  "importExport.freshTags": "새 태그로 새로 시작",
  "importExport.aiOrganize": "AI 정리",
  "importExport.aiOrganizeHelp":
    "북마크로 프롬프트를 생성하고, 원하는 LLM에 붙여넣은 후, JSON 응답을 가져와서 북마크에 자동으로 태그를 지정합니다.",
  "importExport.copyAiPrompt": "AI 프롬프트 복사 (북마크 {count}개)",
  "importExport.importAiResponse": "AI 응답 가져오기",
  "importExport.bookmarksWithSuggestions":
    "태그 제안이 있는 북마크 {count}개",
  "importExport.newAndExistingTags":
    "새 태그 {newCount}개, 기존 태그 {existingCount}개",
  "importExport.apply": "적용",
  "importExport.toastParseWarnings": "파싱 경고: {count}",
  "importExport.toastPromptCopied": "프롬프트가 복사되었습니다!",
  "importExport.toastImported": "북마크 {count}개를 가져왔습니다",
  "importExport.toastExported": "북마크를 내보냈습니다",
  "importExport.toastAppliedTags":
    "북마크 {count}개에 태그를 적용했습니다",

  // About
  "about.title": "정보",
  "about.appName": "BlazeMarks",
  "about.version": "버전 0.5",
  "about.description":
    "Evolu와 Next.js로 만든 무료 로컬 우선 북마크 관리자입니다.",
};

export default ko;
