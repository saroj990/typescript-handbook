import { useEffect } from "react";
import { useSettingsStore } from "@/store/settings";

function resolveTheme(theme: "dark" | "light" | "system"): "dark" | "light" {
  if (theme !== "system") return theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSettingsStore((state) => state.theme);
  const fontSize = useSettingsStore((state) => state.fontSize);

  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      const resolved = resolveTheme(theme);
      root.classList.toggle("dark", resolved === "dark");
      root.style.colorScheme = resolved;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", resolved === "dark" ? "#0b1220" : "#f6f7fb");
    };
    apply();
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme]);

  return <div className={`text-${fontSize}-size min-h-dvh`}>{children}</div>;
}
