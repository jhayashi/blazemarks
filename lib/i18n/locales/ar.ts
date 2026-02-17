import type { Translations } from "../types";

const ar: Translations = {
  // Navigation
  "nav.home": "الرئيسية",
  "nav.readingMode": "وضع القراءة",
  "nav.importExport": "استيراد / تصدير",
  "nav.tags": "الوسوم",
  "nav.settings": "الإعدادات",
  "nav.help": "المساعدة",
  "nav.about": "حول",
  "nav.menu": "القائمة",

  // Home page
  "home.searchPlaceholder": "البحث في الإشارات المرجعية...",
  "home.clearSearch": "مسح البحث",
  "home.search": "بحث",
  "home.chat": "محادثة",
  "home.emptyState":
    "لا توجد إشارات مرجعية بعد. أضف أول إشارة مرجعية أو استخدم أداة الإشارات المرجعية من الإعدادات.",

  // Reading page
  "reading.title": "القراءة",
  "reading.searchPlaceholder": "البحث في قائمة القراءة...",
  "reading.clearSearch": "مسح البحث",

  // Add page
  "add.saving": "جارٍ حفظ الإشارة المرجعية...",
  "add.error": "فشل حفظ الإشارة المرجعية.",
  "add.saved": "تم حفظ الإشارة المرجعية!",
  "add.updated": "تم تحديث الإشارة المرجعية!",

  // Bookmark card
  "bookmark.edit": "تعديل الإشارة المرجعية",
  "bookmark.markUnread": "تعيين كغير مقروء",
  "bookmark.markRead": "تعيين كمقروء",
  "bookmark.delete": "حذف",
  "bookmark.unstar": "إلغاء التمييز",
  "bookmark.star": "تمييز بنجمة",
  "bookmark.visit": "زيارة",
  "bookmark.visits": "زيارات",
  "bookmark.confirmDelete": "هل تريد حذف هذه الإشارة المرجعية؟",

  // Bookmark form
  "form.editBookmark": "تعديل الإشارة المرجعية",
  "form.addBookmark": "إضافة إشارة مرجعية",
  "form.urlPlaceholder": "الرابط (مطلوب)",
  "form.urlDuplicate": "هذا الرابط موجود بالفعل في إشاراتك المرجعية.",
  "form.titlePlaceholder": "العنوان",
  "form.descriptionPlaceholder": "الوصف",
  "form.tagsPlaceholder": "الوسوم (فاصلة أو Enter للإضافة)",
  "form.toggleOn": "تشغيل",
  "form.toggleOff": "إيقاف",
  "form.showInReading": "إظهار في القراءة",
  "form.cancel": "إلغاء",
  "form.save": "حفظ",
  "form.add": "إضافة",
  "form.toastUpdated": "تم تحديث الإشارة المرجعية",
  "form.toastCreateError": "فشل إنشاء الإشارة المرجعية",
  "form.toastAdded": "تمت إضافة الإشارة المرجعية",

  // Bookmark list
  "list.emptyReading":
    "لا توجد عناصر في قائمة القراءة. ستظهر الإشارات المرجعية من مواقع الأخبار هنا تلقائيًا.",
  "list.emptySearch": "لا توجد إشارات مرجعية تطابق بحثك.",

  // Filter bar
  "filter.dateAdded": "تاريخ الإضافة",
  "filter.lastVisited": "آخر زيارة",
  "filter.visitCount": "عدد الزيارات",
  "filter.sortAscending": "ترتيب تصاعدي",
  "filter.sortDescending": "ترتيب تنازلي",

  // Tag chip
  "tag.remove": "إزالة الوسم {name}",

  // Tags page
  "tags.title": "الوسوم",
  "tags.empty": "لا توجد وسوم بعد.",
  "tags.deleteTag": "حذف الوسم {name}",
  "tags.confirmDelete": "هل تريد حذف هذا الوسم؟",
  "tags.toastDeleted": "تم حذف الوسم",

  // Settings / Preferences
  "settings.title": "الإعدادات",
  "settings.bookmarklet": "أداة الإشارات المرجعية",
  "settings.bookmarkletHelp":
    "اسحب هذا الرابط إلى شريط الإشارات المرجعية، أو انسخ الكود أدناه:",
  "settings.copy": "نسخ",
  "settings.searchChat": "البحث والمحادثة",
  "settings.showSearchChat": "إظهار أزرار البحث والمحادثة في الصفحة الرئيسية",
  "settings.searchProvider": "محرك البحث",
  "settings.chatProvider": "خدمة المحادثة",
  "settings.theme": "المظهر",
  "settings.language": "اللغة",
  "settings.account": "الحساب",
  "settings.showIdentityPhrase": "إظهار عبارة الهوية",
  "settings.hideIdentityPhrase": "إخفاء عبارة الهوية",
  "settings.restoreIdentity": "استعادة الهوية",
  "settings.resetAllData": "إعادة تعيين جميع البيانات",
  "settings.appearance": "المظهر",
  "settings.toastBookmarkletCopied": "تم نسخ كود أداة الإشارات المرجعية!",
  "settings.confirmReset":
    "هل أنت متأكد؟ سيؤدي هذا إلى حذف جميع بياناتك المحلية.",
  "settings.invalidIdentityPhrase":
    "عبارة الهوية غير صالحة. يرجى التحقق والمحاولة مرة أخرى.",
  "settings.enterIdentityPhrase": "أدخل عبارة الهوية المكونة من 24 كلمة:",
  "settings.sync": "المزامنة",
  "settings.syncEnabled": "المزامنة مفعّلة",
  "settings.syncDisabled": "محلي فقط",
  "settings.syncHelp":
    "عند التفعيل، تتم مزامنة الإشارات المرجعية بين الأجهزة. عند التعطيل، تبقى البيانات على هذا الجهاز فقط. سيؤدي تغيير هذا إلى إعادة تحميل الصفحة.",
  "settings.syncConfirmDisable":
    "تعطيل المزامنة؟ سيتم تخزين البيانات على هذا الجهاز فقط. سيتم إعادة تحميل الصفحة.",
  "settings.syncConfirmEnable":
    "تفعيل المزامنة؟ ستتم مزامنة البيانات بين الأجهزة. سيتم إعادة تحميل الصفحة.",
  "settings.customReadingDomains": "نطاقات القراءة المخصصة",
  "settings.customReadingDomainsHelp":
    "أضف النطاقات التي يجب تمييزها تلقائيًا لوضع القراءة. نطاق واحد لكل سطر.",

  // Import / Export
  "importExport.title": "استيراد / تصدير",
  "importExport.importTitle": "استيراد الإشارات المرجعية",
  "importExport.importHelp":
    "استيراد الإشارات المرجعية من ملف تصدير المتصفح (تنسيق Netscape HTML).",
  "importExport.chooseFile": "اختيار ملف",
  "importExport.newBookmarks": "{count} إشارات مرجعية جديدة",
  "importExport.duplicatesSkipped": "تم تخطي {count} مكررة",
  "importExport.newTags": "{count} وسوم جديدة",
  "importExport.import": "استيراد",
  "importExport.cancel": "إلغاء",
  "importExport.importing": "جارٍ الاستيراد...",
  "importExport.exportTitle": "تصدير الإشارات المرجعية",
  "importExport.exportButton": "تصدير {count} إشارة مرجعية",
  "importExport.addMissingFavicons": "إضافة الأيقونات المفقودة",
  "importExport.freshTags": "البدء بوسوم جديدة",
  "importExport.aiOrganize": "تنظيم بالذكاء الاصطناعي",
  "importExport.aiOrganizeHelp":
    "أنشئ موجهًا يحتوي على إشاراتك المرجعية، والصقه في أي نموذج لغوي كبير، ثم استورد استجابة JSON لتوسيم إشاراتك المرجعية تلقائيًا.",
  "importExport.copyAiPrompt": "نسخ موجه الذكاء الاصطناعي ({count} إشارة مرجعية)",
  "importExport.importAiResponse": "استيراد استجابة الذكاء الاصطناعي",
  "importExport.bookmarksWithSuggestions":
    "{count} إشارة مرجعية مع اقتراحات الوسوم",
  "importExport.newAndExistingTags":
    "{newCount} وسوم جديدة، {existingCount} وسوم موجودة",
  "importExport.apply": "تطبيق",
  "importExport.toastParseWarnings": "تحذيرات التحليل: {count}",
  "importExport.toastPromptCopied": "تم نسخ الموجه!",
  "importExport.toastImported": "تم استيراد {count} إشارة مرجعية",
  "importExport.toastExported": "تم تصدير الإشارات المرجعية",
  "importExport.toastAppliedTags":
    "تم تطبيق الوسوم على {count} إشارة مرجعية",

  // About
  "about.title": "حول",
  "about.appName": "BlazeMarks",
  "about.version": "الإصدار 0.5",
  "about.description":
    "مدير إشارات مرجعية مجاني يعمل محليًا أولًا، مبني باستخدام Evolu وNext.js.",
};

export default ar;
