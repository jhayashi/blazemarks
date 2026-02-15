import { EditableTitle as BaseEditableTitle } from "elf-components/editable-title";
import type { SettingsId } from "../lib/Db";
import { createSettings, updatePageTitle } from "../lib/mutations";

export function EditableTitle({
  settingsId,
  currentTitle,
}: {
  settingsId: SettingsId | null;
  currentTitle: string | null;
}) {
  return (
    <BaseEditableTitle
      currentTitle={currentTitle}
      defaultTitle="BlazeMarks"
      onSave={(title) => {
        if (settingsId) updatePageTitle(settingsId, title);
        else createSettings({ pageTitle: title });
      }}
    />
  );
}
