import type { ZedThemeFile } from "../theme";
import catppuccin from "./catppuccin.json";
import elementsDefault from "./elements-default.json";
import flexoki from "./flexoki.json";
import github from "./github.json";
import smooth from "./smooth.json";
import xcode from "./xcode.json";

export interface ThemeEntry {
  id: string;
  name: string;
  file: ZedThemeFile;
}

export const DEFAULT_THEME_ID = "bandley";

export const bundledThemes: ThemeEntry[] = [
  { id: "bandley", name: "Bandley", file: xcode as ZedThemeFile },
  { id: "catppuccin", name: "Catppuccin", file: catppuccin as ZedThemeFile },
  { id: "flexoki", name: "Flexoki", file: flexoki as ZedThemeFile },
  { id: "github", name: "GitHub", file: github as ZedThemeFile },
  { id: "one", name: "One L/D", file: elementsDefault as ZedThemeFile },
  { id: "smooth", name: "Smooth", file: smooth as ZedThemeFile },
];
