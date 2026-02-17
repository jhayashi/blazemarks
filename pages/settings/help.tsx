import { create, props } from "@stylexjs/stylex";
import { type ReactNode } from "react";
import { HamburgerMenu } from "../../components/HamburgerMenu";
import { colors, fonts, fontSizes, spacing } from "../../lib/Tokens.stylex";

function renderWithLinks(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        {...props(styles.link)}
      >
        {match[1]}
      </a>,
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "How do I get started?",
    answer:
      "BlazeMarks works right out of the box with no account or setup required. Your bookmarks are stored locally in your browser. To start saving bookmarks, install the browser extension for [Chrome / Edge / Brave](https://chromewebstore.google.com/detail/blazemarks/fdcdkhejnjjdmijdnmiinfmldkmflomh) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/blazemarks/), use the bookmarklet (Settings \u2192 Saving Bookmarks), or import existing bookmarks from another browser (Import / Export).\n\nBlazeMarks syncs for free across all your devices with a web browser. It uses Evolu, a local-first sync technology built on CRDTs. You can read more about how it works at [evolu.dev](https://evolu.dev).",
  },
  {
    question: "How do I bookmark a site?",
    answer:
      "There are three ways to save a bookmark:\n\n\u2022 Browser extension \u2014 Click the BlazeMarks icon in your toolbar or press Ctrl+Shift+8 (Cmd+Shift+8 on Mac) to instantly save the current page.\n\u2022 Bookmarklet \u2014 Go to Settings, then drag the \u201c+ BlazeMarks\u201d button to your bookmarks bar. Click it on any page to save.\n\u2022 Manually \u2014 You can also import bookmarks from an HTML file via Import / Export.",
  },
  {
    question: "How do I install the extension?",
    answer:
      "The BlazeMarks browser extension is available for Chrome, Edge, Brave, Firefox, and other Chromium-based browsers.\n\nInstall for [Chrome / Edge / Brave](https://chromewebstore.google.com/detail/blazemarks/fdcdkhejnjjdmijdnmiinfmldkmflomh) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/blazemarks/). Once installed, you\u2019ll see the BlazeMarks icon in your browser toolbar.\n\nClick the icon on any page to save it as a bookmark. You can also toggle whether new tabs open BlazeMarks in the extension options.",
  },
  {
    question: "How do I import my bookmarks?",
    answer:
      "Go to Import / Export from the menu. Click \u201cChoose File\u201d and select an HTML bookmarks file exported from any browser (Chrome, Firefox, Safari, Edge all use the same format). You\u2019ll see a preview showing how many new bookmarks will be added and how many duplicates will be skipped. Click \u201cImport\u201d to confirm. Tags from bookmark folders are preserved.",
  },
  {
    question: "How do I export my bookmarks?",
    answer:
      "Go to Import / Export from the menu and click the \u201cExport\u201d button. This downloads an HTML file containing all your bookmarks with their titles, descriptions, tags, and timestamps. The file is compatible with all major browsers\u2019 import features.",
  },
  {
    question: "How do I search for bookmarks?",
    answer:
      "Use the search bar at the top of the home page. Type any words to search across bookmark titles, URLs, and descriptions. All words must match for a result to appear.\n\nTo filter by tag, type #tagname (e.g., #recipes). You can also click any tag on a bookmark to instantly filter by it.\n\nIf you\u2019ve enabled search/chat buttons in Settings, you can also send your query directly to Google, DuckDuckGo, ChatGPT, Claude, or Perplexity.",
  },
  {
    question: "What does starring a bookmark do?",
    answer:
      "Starring a bookmark adds it to the shortcuts grid at the top of the home page for quick access. You can drag and drop starred bookmarks to reorder them. Click the star icon on any bookmark to star or unstar it.",
  },
  {
    question: "How does Reading Mode work?",
    answer:
      "Reading Mode is a focused view for articles and pages you want to read later. Access it from the menu.\n\nBookmarks appear in Reading Mode when you mark them \u201cFor Reading\u201d in the edit form, or if they\u2019re from recognized news sites (like The Verge, TechCrunch, Ars Technica, etc.).\n\nUnread items appear first. Click the circular checkbox to mark items as read \u2014 read items appear dimmed. You can search and sort within Reading Mode just like the home page.",
  },
  {
    question: "How do I add a bookmark to Reading Mode?",
    answer:
      "Click the favicon button on any bookmark to open the edit form. Check the \u201cShow in Reading\u201d checkbox, then save. That bookmark will now appear in Reading Mode. Bookmarks from news domains are automatically included.",
  },
  {
    question: "How do I sync my bookmarks to my phone, tablet, or other browsers?",
    answer:
      "BlazeMarks automatically syncs across all your devices for free. Just open BlazeMarks in any web browser on your phone, tablet, or another computer and restore your identity using your identity phrase (found in Settings \u2192 Account). Your bookmarks will sync using Evolu\u2019s encrypted, peer-to-peer sync technology. No account creation or sign-up required.",
  },
  {
    question: "How do I use AI to tag my bookmarks?",
    answer:
      "Go to Import / Export and scroll to the AI Organize section.\n\n1. Click \u201cCopy AI Prompt\u201d \u2014 this copies a prompt containing all your bookmarks and existing tags to your clipboard.\n2. Paste it into any LLM (Claude, ChatGPT, etc.) and let it suggest tags for each bookmark.\n3. Save the LLM\u2019s JSON response as a file.\n4. Click \u201cImport AI Response\u201d and select that file.\n5. Review the suggestions, check the ones you want, and click \u201cApply\u201d.\n\nThe AI will reuse your existing tags where possible and suggest new ones when needed.",
  },
  {
    question: "How do I edit a bookmark?",
    answer:
      "Click the favicon icon on the left side of any bookmark to open the inline edit form. You can change the URL, title, description, tags, and reading mode status. Press Save when done, or Cancel to discard changes.",
  },
  {
    question: "How do I delete a bookmark?",
    answer:
      "Click the \u00d7 button on the right side of any bookmark. A confirmation dialog will appear \u2014 click OK to delete. This action cannot be undone.",
  },
  {
    question: "How do I add tags to a bookmark?",
    answer:
      "Open the edit form by clicking the favicon button on a bookmark. In the tags field, type a tag name and press Enter or comma to add it. As you type, suggestions from your existing tags will appear. You can also use AI Organize to bulk-add tags across all your bookmarks.",
  },
  {
    question: "How do I sort my bookmarks?",
    answer:
      "Use the sort controls at the top of the bookmark list. You can sort by date added, last visited, or visit count. Click the arrow button to toggle between ascending and descending order.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "All your data is stored locally in your browser using IndexedDB. Nothing is sent to any server. This means your bookmarks are private and work offline, but they\u2019re tied to your browser. If you clear browser data, your bookmarks will be lost unless you\u2019ve saved your identity phrase (Settings \u2192 Account section).",
  },
  {
    question: "Can I sync across devices?",
    answer:
      "Yes! BlazeMarks syncs automatically and for free across all your devices. Open BlazeMarks on any device, go to Settings \u2192 Account, and use \u201cRestore Identity\u201d with your identity phrase to access your data. Sync is powered by Evolu\u2019s encrypted CRDT technology \u2014 your data is end-to-end encrypted and no one else can read it.",
  },
  {
    question: "How do I change the theme?",
    answer:
      "Go to Settings and scroll to the Theme section. Choose from several built-in themes including Catppuccin, Cupertino, Flexoki, GitHub, One L/D, and Smooth. Each theme has light and dark variants that switch automatically based on your system\u2019s appearance setting.",
  },
  {
    question: "How do I rename the home page title?",
    answer:
      "Click the title at the top of the home page (it says \u201cBlazeMarks\u201d by default). An inline text field will appear. Type your preferred title and press Enter to save, or Escape to cancel.",
  },
  {
    question: "How do I change my search or chat provider?",
    answer:
      "Go to Settings and find the Search & Chat section. First, enable \u201cShow search and chat buttons on home page.\u201d Then choose your preferred search provider (Google or DuckDuckGo) and chat provider (Google AI Mode, Perplexity, ChatGPT, or Claude).",
  },
  {
    question: "Which browsers does the extension support?",
    answer:
      "The BlazeMarks extension supports Chrome, Edge, Brave, and other Chromium-based browsers (using Manifest V3), as well as Firefox (using Manifest V2).",
  },
  {
    question: "What is the bookmarklet and how do I use it?",
    answer:
      "A bookmarklet is a small piece of code saved as a regular browser bookmark. When you click it, it captures the current page\u2019s URL, title, description, and favicon, then sends them to BlazeMarks.\n\nTo set it up, go to Settings and either drag the \u201c+ BlazeMarks\u201d button to your bookmarks bar, or click Copy and manually create a bookmark with the copied code. The bookmarklet works in any browser, no extension required.",
  },
  {
    question: "Is BlazeMarks free?",
    answer:
      "Yes, BlazeMarks is completely free to use. There are no paid tiers, subscriptions, or in-app purchases.",
  },
  {
    question: "Is BlazeMarks open source?",
    answer:
      "Yes, BlazeMarks is open source under the MIT license. You can view the source code, contribute, or fork it on GitHub.",
  },
  {
    question: "Are there any metrics or ad trackers?",
    answer:
      "No. BlazeMarks has zero analytics, tracking, or advertising. There are no cookies, no telemetry, and no tracking data sent to any server. Everything stays in your browser.",
  },
  {
    question: "How do you make money?",
    answer:
      "We don\u2019t. BlazeMarks is a passion project \u2014 we\u2019re just giving a little bit back to the web. If you use the web, you should find a way to give back to it too!",
  },
  {
    question: "Is there a catch?",
    answer:
      "Maybe you\u2019ll use the web more?",
  },
  {
    question: "How do I send you feedback?",
    answer:
      "We\u2019d love to hear from you! Visit the BlazeMarks GitHub repository and open an issue to report bugs, request features, or just say hello.",
  },
];

export default function Help() {
  return (
    <div {...props(styles.page)}>
      <div {...props(styles.header)}>
        <h1 {...props(styles.title)}>Help</h1>
        <HamburgerMenu currentPath="/settings/help" />
      </div>

      <div {...props(styles.faqList)}>
        {faqs.map((item) => (
          <div key={item.question} {...props(styles.faqItem)}>
            <h2 {...props(styles.faqQuestion)}>{item.question}</h2>
            <div {...props(styles.faqAnswer)}>
              {item.answer.split("\n").map((line, i) => (
                <p key={i} {...props(styles.faqLine)}>
                  {renderWithLinks(line)}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = create({
  page: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    maxWidth: "48rem",
    width: "100%",
    marginInline: "auto",
    paddingBlock: spacing.m,
    paddingInline: spacing.s,
    gap: spacing.l,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: fontSizes.step2,
    fontFamily: fonts.sans,
    color: colors.primary,
    fontWeight: 700,
  },
  faqList: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.l,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.border,
    paddingBottom: spacing.l,
  },
  faqQuestion: {
    fontSize: fontSizes.step0,
    fontFamily: fonts.sans,
    fontWeight: 600,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  faqAnswer: {
    display: "flex",
    flexDirection: "column",
  },
  faqLine: {
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: colors.secondary,
    lineHeight: 1.6,
    marginBottom: spacing.xs,
  },
  link: {
    color: colors.accent,
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },
});
