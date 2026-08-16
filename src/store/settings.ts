import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "dark" | "light" | "system";
export type FontSize = "sm" | "md" | "lg";

interface SettingsState {
  theme: Theme;
  fontSize: FontSize;
  editorFontSize: number;
  editorMinimap: boolean;
  editorWordWrap: boolean;
  setTheme: (theme: Theme) => void;
  setFontSize: (fontSize: FontSize) => void;
  setEditorFontSize: (size: number) => void;
  setEditorMinimap: (value: boolean) => void;
  setEditorWordWrap: (value: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "dark",
      fontSize: "md",
      editorFontSize: 14,
      editorMinimap: false,
      editorWordWrap: true,
      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
      setEditorFontSize: (editorFontSize) => set({ editorFontSize }),
      setEditorMinimap: (editorMinimap) => set({ editorMinimap }),
      setEditorWordWrap: (editorWordWrap) => set({ editorWordWrap }),
    }),
    { name: "ts-handbook-settings" },
  ),
);
