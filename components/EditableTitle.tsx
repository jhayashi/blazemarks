import { create, props } from "@stylexjs/stylex";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SettingsId } from "../lib/Db";
import { createSettings, updatePageTitle } from "../lib/mutations";
import { colors, fonts, fontSizes } from "../lib/Tokens.stylex";

interface EditableTitleProps {
  settingsId: SettingsId | null;
  currentTitle: string | null;
}

export function EditableTitle({
  settingsId,
  currentTitle,
}: EditableTitleProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [optimisticTitle, setOptimisticTitle] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const displayTitle = optimisticTitle ?? currentTitle ?? "BlazeMarks";

  // Clear optimistic value once Evolu catches up
  useEffect(() => {
    if (optimisticTitle !== null && currentTitle === optimisticTitle) {
      setOptimisticTitle(null);
    }
  }, [currentTitle, optimisticTitle]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const handleSave = useCallback(() => {
    const trimmed = draft.trim();
    setEditing(false);
    if (!trimmed || trimmed === displayTitle) return;
    setOptimisticTitle(trimmed);
    if (settingsId) {
      updatePageTitle(settingsId, trimmed);
    } else {
      createSettings({ pageTitle: trimmed });
    }
  }, [draft, displayTitle, settingsId]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSave();
      } else if (e.key === "Escape") {
        setEditing(false);
      }
    },
    [handleSave],
  );

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        {...props(styles.input)}
      />
    );
  }

  return (
    <h1
      onClick={() => {
        setDraft(displayTitle);
        setEditing(true);
      }}
      {...props(styles.title)}
    >
      {displayTitle}
    </h1>
  );
}

const styles = create({
  title: {
    fontSize: fontSizes.step2,
    fontFamily: fonts.sans,
    color: colors.primary,
    fontWeight: 700,
    cursor: "pointer",
    ":hover": {
      color: colors.accent,
    },
  },
  input: {
    fontSize: fontSizes.step2,
    fontFamily: fonts.sans,
    color: colors.primary,
    fontWeight: 700,
    backgroundColor: "transparent",
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    borderBottomColor: colors.accent,
    outline: "none",
    padding: 0,
    width: "auto",
    minWidth: "6rem",
  },
});
