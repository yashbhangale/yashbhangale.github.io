"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, MousePointerClick, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  NODES,
  NODE_BY_ID,
  getTooltipStyle,
  type HomelabNode,
} from "./data";

// Whether the current device supports true hover (desktop pointer).
function deviceCanHover() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

// ---- Single hotspot over the diagram --------------------------------------

function HotspotButton({
  node,
  isActive,
  showAll,
  onHover,
  onActivate,
}: {
  node: HomelabNode;
  isActive: boolean;
  showAll: boolean;
  onHover: (id: string | null) => void;
  onActivate: (node: HomelabNode) => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(node.id)}
      onBlur={() => onHover(null)}
      onClick={() => onActivate(node)}
      aria-label={`${node.name} — ${node.subtitle}${
        node.url ? " (opens live service)" : ""
      }`}
      className={`group absolute z-10 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${
        node.url ? "cursor-pointer" : "cursor-help"
      }`}
      style={{
        left: `${node.hotspot.left}%`,
        top: `${node.hotspot.top}%`,
        width: `${node.hotspot.width}%`,
        height: `${node.hotspot.height}%`,
        backgroundColor: isActive ? `${node.color}26` : "transparent",
        boxShadow: isActive
          ? `inset 0 0 0 1.5px ${node.color}, 0 8px 24px -8px ${node.color}`
          : undefined,
      }}
    >
      {/* Resting outline when "highlight zones" is on */}
      <span
        className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-200"
        style={{
          boxShadow:
            showAll && !isActive ? `inset 0 0 0 1px ${node.color}70` : "none",
        }}
      />
      {/* Hover fill + border */}
      <span
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          backgroundColor: `${node.color}24`,
          boxShadow: `inset 0 0 0 1.5px ${node.color}`,
        }}
      />
      {/* Live-service pulse indicator */}
      {node.url && (
        <span className="pointer-events-none absolute right-1 top-1 flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
            style={{ backgroundColor: node.color }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full ring-1 ring-black/20"
            style={{ backgroundColor: node.color }}
          />
        </span>
      )}
    </button>
  );
}

// ---- Interactive diagram (image + hotspots + tooltip) ---------------------

export function InteractiveDiagram({
  priority = false,
  className,
  minWidth = 680,
}: {
  priority?: boolean;
  className?: string;
  /** Min pixel width the diagram keeps before it becomes horizontally scrollable. */
  minWidth?: number;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const activeId = pinnedId ?? hoveredId;
  const active = activeId ? NODE_BY_ID[activeId] ?? null : null;
  const isPinned = pinnedId != null && active?.id === pinnedId;
  const ActiveIcon = active?.icon;

  // Desktop pointer → click opens the live service directly.
  // Touch / no-hover → click pins the tooltip so details are readable first.
  const activateNode = (node: HomelabNode) => {
    if (node.url && deviceCanHover()) {
      window.open(node.url, "_blank", "noopener,noreferrer");
      return;
    }
    setPinnedId((cur) => (cur === node.id ? null : node.id));
  };

  return (
    <div className={className}>
      {/* Toolbar */}
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground sm:text-xs">
          <MousePointerClick className="h-3.5 w-3.5" />
          Hover or tap any block for details
        </span>
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-pressed={showAll}
        >
          <MousePointerClick className="h-3.5 w-3.5" />
          {showAll ? "Hide zones" : "Highlight zones"}
        </button>
      </div>

      {/* Diagram — horizontally scrollable on small screens so it stays legible */}
      <div className="-mx-1 overflow-x-auto rounded-lg border bg-[#0b1120] px-1 [scrollbar-width:thin]">
        <div
          className="relative select-none"
          style={{ minWidth, aspectRatio: "1672 / 941" }}
        >
          <Image
            src="/imgs/arch.png"
            alt="Homelab architecture diagram: remote users reach the Cloudflare edge and tunnel into a single K3s node hosting nine self-hosted services, with admin access over Tailscale and GitOps via ArgoCD."
            fill
            priority={priority}
            sizes="(max-width: 768px) 680px, (max-width: 1280px) 100vw, 1200px"
            className="object-contain"
          />

          {/* Hotspots */}
          {NODES.map((node) => (
            <HotspotButton
              key={node.id}
              node={node}
              isActive={activeId === node.id}
              showAll={showAll}
              onHover={setHoveredId}
              onActivate={activateNode}
            />
          ))}

          {/* Click-away layer while a tooltip is pinned (touch) */}
          {isPinned && (
            <button
              type="button"
              aria-label="Close details"
              onClick={() => setPinnedId(null)}
              className="absolute inset-0 z-20 cursor-default"
            />
          )}

          {/* Floating tooltip, anchored to the active hotspot */}
          <AnimatePresence>
            {active && ActiveIcon && (
              <motion.div
                key={active.id}
                role="tooltip"
                initial={{ opacity: 0, scale: 0.96, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 4 }}
                transition={{ duration: 0.14, ease: "easeOut" }}
                className={`absolute z-30 w-[min(280px,78%)] overflow-hidden rounded-lg border bg-popover/95 text-left shadow-2xl backdrop-blur-md ${
                  isPinned ? "pointer-events-auto" : "pointer-events-none"
                }`}
                style={{
                  ...getTooltipStyle(active),
                  borderColor: `${active.color}66`,
                }}
              >
                {/* Accent bar */}
                <span
                  className="block h-1 w-full"
                  style={{ backgroundColor: active.color }}
                />

                <div className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
                        style={{
                          color: active.color,
                          backgroundColor: `${active.color}1f`,
                        }}
                      >
                        <ActiveIcon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold leading-tight text-popover-foreground">
                          {active.name}
                        </div>
                        <div className="truncate text-[11px] text-muted-foreground">
                          {active.subtitle}
                        </div>
                      </div>
                    </div>
                    {isPinned && (
                      <button
                        type="button"
                        onClick={() => setPinnedId(null)}
                        aria-label="Close details"
                        className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  {active.tags && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {active.tags.map((t) => (
                        <Badge
                          key={t}
                          variant="secondary"
                          className="text-[10px]"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <ul className="mt-2 space-y-1">
                    {active.details.map((d, i) => (
                      <li
                        key={i}
                        className="flex gap-1.5 text-[11.5px] leading-snug text-muted-foreground"
                      >
                        <span
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                          style={{ backgroundColor: active.color }}
                        />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  {active.url &&
                    (isPinned ? (
                      <a
                        href={active.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium text-white transition-opacity hover:opacity-90"
                        style={{ backgroundColor: active.color }}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Open live service
                      </a>
                    ) : (
                      <div
                        className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-medium"
                        style={{ color: active.color }}
                      >
                        <ExternalLink className="h-3 w-3" />
                        Click to open live service
                      </div>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Hint row */}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
          </span>
          Pulsing dots are live services you can open
        </span>
        <a
          href="/imgs/arch.png"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-primary transition-opacity hover:opacity-80"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View raw diagram
        </a>
      </div>
    </div>
  );
}
