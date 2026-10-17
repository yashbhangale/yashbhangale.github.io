---
name: Yash Bhangale — Cloud, Code, Control
description: Expressive condensed type and animated architecture on near-black engineering surfaces.
colors:
  signal: "#ffbd00"
  signal-ink: "#0b0d10"
  signal-hover: "#ffd34d"
  background: "#090b0d"
  foreground: "#e9e4d6"
  card: "#11161b"
  secondary: "#1a2128"
  muted: "#171e24"
  muted-foreground: "#a2a6a5"
  accent: "#242b31"
  border: "#2b3035"
  lab-surface: "#10151a"
  explorer-ground: "#0c1014"
  node-ground: "#131a20"
  trace-base: "#3b464f"
  trace-pink: "#ce577b"
  trace-teal: "#489aa7"
  light-background: "#f3f1e9"
  light-foreground: "#171b20"
  light-card: "#ffffff"
  light-primary: "#825200"
  light-muted: "#e5e5dc"
  light-muted-foreground: "#535c64"
  light-accent: "#dddccc"
  light-border: "#c4c7bd"
  light-lab-surface: "#e9e8de"
  light-explorer-ground: "#e8e8de"
  light-node-ground: "#faf9f3"
  light-trace-base: "#a5aaa4"
  contact-foreground: "#f5f6f3"
  contact-muted: "#c5d0d1"
  contact-border: "#52636b"
  destructive: "#b23a36"
typography:
  display:
    fontFamily: "Big Shoulders, sans-serif"
    fontSize: "clamp(4.7rem, 7.4vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.89
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Big Shoulders, sans-serif"
    fontSize: "clamp(2.6rem, 4.5vw, 3.7rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Big Shoulders, sans-serif"
    fontSize: "33px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Public Sans, sans-serif"
    fontSize: "14px"
    lineHeight: 1.8
  label:
    fontFamily: "Public Sans, sans-serif"
    fontSize: "13px"
rounded:
  action: "2px"
  sm: "3px"
  md: "5px"
  lg: "8px"
  xl: "12px"
spacing:
  compact: "8px"
  control: "12px"
  action: "18px"
  section-heading: "32px"
  column-gap: "65px"
  section: "90px"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.signal-ink}"
    rounded: "{rounded.action}"
    padding: "13px 18px"
  button-primary-hover:
    backgroundColor: "{colors.signal-hover}"
  text-action:
    textColor: "currentColor"
  icon-button:
    rounded: "{rounded.md}"
    width: "44px"
    height: "44px"
  navigation:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    height: "78px"
  explorer:
    backgroundColor: "{colors.explorer-ground}"
  explorer-tab-selected:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.signal-ink}"
    padding: "9px 18px"
  input:
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "4px 12px"
    height: "36px"
  badge-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "2px 8px"
  ai-chat:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
---

# Design System: Yash Bhangale

## Overview

**Creative North Star: "Cloud, Code, Control"**

Near-black surfaces, warm-white condensed headlines, amber controls, and animated architecture give this engineering portfolio a stronger, more expressive identity. The user-pinned [Slipstream reference](https://impeccable.style/gallery/view/e1cc549b1d3abafc/) supersedes the former Engineering Manual direction. Big Shoulders is the supported successor family used in code for the reference's Big Shoulders Display character; Public Sans keeps technical explanations readable.

This records the implemented homepage, project collection, shared navigation and themes, and dedicated `/ask-ai` introduction/chat surface. Blog and interactive homelab interiors retain their earlier compositions with the shared fonts and semantic colors; this document does not claim a complete interior redesign of those routes. Real architecture images and source links remain evidence. No new raster assets were introduced for this direction; existing asset origins remain embedded in the source records.

**Key Characteristics:**
- Oversized, left-aligned uppercase display type and compact reading text.
- Dark first visit, explicit persistent light choice, flat charcoal surfaces and thin rules.
- A working architecture explorer with three actual project states and controllable motion.
- Prominent Ask AI destinations alongside project exploration and contact.

## Colors

The frontmatter owns exact primitives; `src/app/globals.css` owns semantic theme assignments. Amber is the identity signal. Pink and teal are secondary packet traces inside the architecture illustration, not competing page accents.

### Primary
- **Signal Amber** (`signal`): primary hero action, selected architecture tab, packet trace, selection, dark-theme primary links and focus ring. Hover uses `signal-hover`; filled controls use `signal-ink` text.
- **Light-theme Amber Ink** (`light-primary`): readable primary text and focus ring on light surfaces. The filled hero action and selected explorer tab retain signal amber in both themes.

### Neutral
- **Near Black / Warm White** (`background`, `foreground`): default page and text. `card`, `secondary`, `muted`, `accent`, and `border` establish the supporting surface hierarchy; `muted-foreground` carries descriptions and metadata.
- **Architecture Grounds** (`explorer-ground`, `node-ground`, `trace-base`): diagram surface, node fill, and static relationship lines. `lab-surface` separates the homelab feature.
- Light mode maps background, foreground, card, primary/ring, secondary/muted, muted text, accent, border, lab surface, explorer ground, node ground, and trace base to their `light-*` equivalents. Light primary foreground is white; dark primary foreground is the near-black background.
- Contact stays on `explorer-ground`'s near-black value in both themes, with `contact-foreground`, `contact-muted`, and `contact-border`. Technical image plates stay white. `destructive` remains reserved for existing invalid/destructive UI states.

**The Evidence Rule.** Preserve real diagrams, source destinations and confidential-client wording. Architecture animation illustrates relationships; it must never imply live telemetry or invented performance data.

## Typography

**Display:** Big Shoulders, sans-serif. **Body:** Public Sans, sans-serif. Both load through `next/font/google`, Latin subset, `display: swap`; system monospace remains available for code.

- **Display:** the frontmatter role is the three-line hero; at 800px and below it becomes `clamp(4.7rem, 15vw, 6rem)`. Each line arrives once with a 650ms upward/clip reveal, delayed 0/70/140ms. Keep the hierarchy expressive without applying uppercase to prose.
- **Headline:** major sections use the frontmatter role; mobile section/about/lab headings become 40px at 540px. Contact uses `clamp(3rem, 6vw, 5.5rem)`, weight 700, line-height 1.08, then 52px on small screens.
- **Title:** selected-work titles are 33px, becoming 30px at 540px. Catalog titles are 40px/1.15 (36px small); catalog page display is `clamp(3.5rem, 8vw, 6rem)`, weight 800, line-height .95.
- **Body:** hero description is 14px/1.8, max 48ch (60ch when stacked); project summaries are 14px and max 62–65ch. Longer about text is 15px, max 70ch; the large about paragraph is 23px/1.4, then 21px on small screens. Global body line-height is 1.6.
- **Label:** navigation/actions use 13px; technology and captions use 10–11px. Explorer tabs are 12px, node names 12px and details 10px; small nodes use 11px/9px. Dates use tabular numerals.
- **AI display:** `clamp(4rem, 7vw, 6rem)`, weight 800, line-height .92, tracking -.025em; becomes 72px at 900px. Supporting copy is 14px/1.9; source/AI limitation note is 11px.

## Layout

The container is `min(1200px, calc(100% - 96px))`: 48px gutters, reducing to 24px at 800px and 20px at 540px. The sticky header is 78px, becoming 72px at 800px. Sections use 90px vertical spacing, then 64px at 800px.

Hero columns are `.68fr 1.32fr` with 65px gap, reducing to 35px at 1050px and stacking at 800px. Copy precedes the explorer; its map is 315px tall, then 275px at 540px. Nodes are 132px wide, becoming 100px; no diagram or controls require horizontal scrolling. Hero footnotes span both columns and stack at 540px.

Selected work uses 215px / flexible / 30px rows with 38px gaps. At 540px its 170px preview sits above copy and arrow. Catalog uses `1fr 1.05fr`, 55px gap, then 30px at 900px and a stack at 800px. Image plates contain diagrams without cropping; stacked catalog images preserve natural proportions and cap at 460px high. About/lab use `.8fr 1.2fr`, stacking at 800px; skills, experience and contact stack at 540px.

Desktop links collapse into a scrollable mobile menu at 900px. The retained floating AI launcher and open widget are hidden below 640px so they do not overlap diagrams or catalog content; the dedicated AI route remains available through navigation, hero and footer links. Dedicated AI uses `.65fr 1.35fr` with 65px gap, stacking at 900px with 35px gap. Chat height is 70vh, minimum 500px, maximum 800px, with internal message scrolling. Keep these observed compositions local to their surfaces.

## Elevation & Depth

The main portfolio is flat: hierarchy comes from tonal grounds, one-pixel rules, typography, and image plates. The AI chat explicitly removes its inherited card shadow. Retained UI primitives and the optional floating launcher still have small utility shadows; those do not establish a lifted card system for portfolio content.

Use short feedback and intentional illustration motion. Primary actions move up 2px over 180ms; work arrows move `(4px, -4px)` over 200ms and preview images scale to 1.035 over 350ms. Explorer tabs and suggested questions transition over 160ms; navigation underlines reveal over 180ms. The sidecar records exact curves and packet timing.

## Shapes

Straight-edged architecture frames, rectangular nodes, and open ruled project rows define the main geometry. Primary actions have 2px corners; utility controls and retained inputs/badges have 5px corners. The chat card and personal video use 12px corners; inherited message bubbles use 8px and avatars remain circular. Preserve those local chat affordances without making every portfolio region a rounded card.

## Components

### Actions and navigation
Amber primary actions have 13px × 18px padding, 15px icon gap and 650 weight; hover lightens the fill and lifts 2px. Text actions reveal an underline; global keyboard focus is a 2px theme ring with 5px offset. Utility controls are 44px squares. Navigation uses an uppercase Big Shoulders wordmark, 28px/800 (18px at 540px), and amber underline for hover, focus and current route. Ask AI is a visible desktop link with primary text color; the mobile menu includes the same destination. Menu state uses `aria-expanded`, closes on Escape and on link selection.

### Theme
Root HTML starts with `dark`. An inline head script restores `portfolio-theme-v2` before paint: only a saved `light` value selects light mode; absent/other values stay dark. The explicit theme button toggles the root class and stores the choice; storage failure still allows the current-visit toggle. OS theme is not automatically followed. Do not reinstate the superseded light-first behavior or old storage key.

### System explorer
Cloud (default), Security and Autoscaling tabs update nodes, paths, explanation, technology line and destination together. They respectively link to `/projects#aws-landing-zone`, `/projects#security-scanner`, and `/projects#karpenter-autoscaling`. These are simplified real project architectures. Tabs use roving focus, left/right wrapping and Home/End selection; the tab panel has a descriptive diagram label and a polite readout.

Packet traces use a 3.4s linear dashed loop, with -1.1s and -2.2s phase offsets for pink/teal paths. A persistent local Pause/Play button controls the loop. Animation runs only while the explorer intersects the viewport, the document is visible, and the user has not paused it; returning to view respects the manual pause. Selection is manual, never auto-rotating. Reduced motion removes packet animation and dashes, leaves static visible relationship lines, disables the intro reveal and smooth scrolling, and collapses other CSS durations to .01ms with one iteration. All tabs, content and links remain usable.

### Project evidence
Homepage work rows lead to three selected projects; `/projects` preserves all ten records with architecture plates, captions, source actions, and native details. Hover underlines titles and moves arrows; focus also moves arrows. Native disclosure markers remain visible and open summaries underline. Project details begin collapsed; the first homepage experience disclosure begins open.

### Dedicated AI
`/ask-ai` pairs a display introduction and browse-projects action with the chat card. The hero supplies its own Ask my AI action. Three suggested prompts invoke actual chat questions about AWS foundations, the security scanner, and homelab. The card includes Gemini identity, scrollable messages, labelled input, Send action and Enter-to-send behavior. Loading disables input, prompts and Send; empty input disables Send. Responses and connection errors appear in the conversation; typing reveals characters at 30ms intervals. CSS reduced motion stops decorative chat effects, but the current JavaScript typing reveal is retained. Do not claim it instantly renders full answers under reduced motion.

The 36px input uses a one-pixel theme border, 5px corners, transparent/light or input-tinted/dark fill; focus adds the inherited ring and chat override. Disabled controls are half opacity; invalid controls use destructive state colors. AI answers can be imperfect: preserve the visible note directing visitors to project sources or direct contact. The API and content behavior are retained rather than represented as a new backend capability.

## Do's and Don'ts

### Do:
- **Do** use the Big Shoulders/Public Sans pairing and dark-first semantic palette.
- **Do** preserve the explicit light choice, visible focus, keyboard tabs and motion controls.
- **Do** keep Ask AI prominent in navigation and the homepage, with its dedicated chat route.
- **Do** retain real project diagrams, source actions, all ten records and truthful scope for secondary routes.

### Don't:
- **Don't** return to the superseded yellow-field Engineering Manual identity or weak display hierarchy.
- **Don't** invent live operational data, savings, testimonials, or client identities for visual effect.
- **Don't** auto-rotate explorer selection or run its packet loop while paused, offscreen, hidden or reduced-motion.
- **Don't** spread ornamental shadows, rounded-card grids, or diagram trace colors across every section.
