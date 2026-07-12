"use client";

import Link from "next/link";
import { Maximize2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InteractiveDiagram } from "@/components/portfolio/homelab/InteractiveDiagram";

// Homepage showcase: a framed, interactive preview of the homelab architecture.
// The full breakdown lives on the dedicated /homelab route.

export function HomelabShowcase() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="overflow-hidden rounded-xl border bg-card shadow-lg">
        {/* Window chrome header */}
        <div className="flex items-center justify-between gap-2 border-b bg-muted/50 px-3 py-2 sm:px-4">
          <div className="flex min-w-0 items-center gap-2">
            <div className="hidden gap-1 sm:flex">
              <div className="h-3 w-3 rounded-full bg-foreground/20" />
              <div className="h-3 w-3 rounded-full bg-foreground/20" />
              <div className="h-3 w-3 rounded-full bg-foreground/20" />
            </div>
            <span className="truncate font-mono text-xs text-muted-foreground sm:ml-2 sm:text-sm">
              My HomeLab
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/homelab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Open full architecture</span>
              <span className="sm:hidden">Full view</span>
            </Link>
            <Badge variant="secondary" className="text-xs">
              <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-blue-500" />
              <span className="hidden sm:inline">Self-hosted · </span>Live
            </Badge>
          </div>
        </div>

        <div className="p-3 sm:p-4">
          <InteractiveDiagram priority />
        </div>
      </div>
    </div>
  );
}
