import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [offline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const onPrompt = (incoming: Event) => {
      incoming.preventDefault();
      setEvent(incoming as BeforeInstallPromptEvent);
    };
    const onOnline = () => setOffline(false);
    const onOffline = () => setOffline(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  if (!event && !offline) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 shadow-[var(--shadow)]">
      {offline ? (
        <p className="text-sm">You're offline. Cached lessons and exercises still work.</p>
      ) : null}
      {event ? (
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm">Install the handbook for offline learning.</p>
          <Button
            size="sm"
            variant="primary"
            onClick={async () => {
              await event.prompt();
              setEvent(null);
            }}
          >
            <Download className="size-3.5" />
            Install
          </Button>
        </div>
      ) : null}
    </div>
  );
}
