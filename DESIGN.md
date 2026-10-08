---
version: alpha
name: xTools-design-system
description: A multi-theme design system for the xTools intelligent tool platform. Includes a clean Default theme (Vercel-inspired) and an AI-native Aurora theme with deep-tech purple gradients. Both themes support Dark/Light modes and share a common design-token architecture.
---

# Theme: Aurora (AI 智能主题)

## Overview

Aurora is xTools' AI-native theme — a deep-tech visual identity built around a purple-to-cyan gradient axis on dark surfaces, with atmospheric glow effects that signal intelligence and modernity. It draws inspiration from GitHub Copilot, Cursor, and Linear's design languages while establishing a distinct identity through its purple-dominant (#7C3AED) brand color and layered luminous depth.

The theme operates in two modes: **Dark** (the primary, signature mode) and **Light** (a clean, high-contrast adaptation for daytime use). Both modes share the same structural tokens (spacing, typography, radius) but diverge on surface colors, text contrast, and gradient intensity.

**Key Characteristics:**
- A deep dark canvas (#0A0A12) with layered surface steps that create architectural depth without heavy shadows.
- Purple (#7C3AED) as the singular brand accent — used for primary CTAs, active states, and AI-related interaction highlights.
- A purple-to-cyan gradient (#7C3AED → #06B6D4) used as the AI "thinking" indicator and atmospheric decoration at section scale.
- Subtle ambient glow effects (purple haze behind active elements) replace traditional box-shadows.
- Geist for headings, Inter for body, Geist Mono for technical labels — the same font stack as the Default theme, ensuring consistency across theme switches.

---

## Aurora — Dark Mode

### Colors

```yaml
# Surface hierarchy (darkest → lightest)
surface:
  base: "#0A0A12"        # Page background — near-black with blue undertone
  raised: "#12121E"      # Card/panel background — one step lighter
  overlay: "#1A1A2E"     # Modal/dropdown/popover surface
  elevated: "#22223A"    # Hover states, active sidebar items
  border: "#2A2A45"      # Subtle dividers, card edges
  border-strong: "#3D3D5C" # Stronger dividers, input borders on focus

# Text hierarchy
text:
  primary: "#F5F5FF"     # Headlines, primary labels — near-white with violet cast
  secondary: "#A8A8C8"   # Body text, descriptions — muted lavender-gray
  tertiary: "#6B6B8A"    # Placeholder, disabled text, timestamps
  inverse: "#0A0A12"     # Text on primary-colored surfaces

# Brand & accent
brand:
  primary: "#7C3AED"     # Primary CTA, active indicators, AI highlights
  primary-hover: "#6D28D9" # Hover state
  primary-pressed: "#5B21B6" # Pressed/active state
  primary-soft: "#7C3AED1A" # 10% opacity — subtle highlight backgrounds
  primary-glow: "#7C3AED33" # 20% opacity — ambient glow behind elements

# AI-specific
ai:
  gradient-start: "#7C3AED"  # Purple anchor
  gradient-mid: "#A855F7"    # Mid-tone violet
  gradient-end: "#06B6D4"    # Cyan terminus
  thinking-pulse: "#A855F740" # Animated pulse for AI processing states
  sparkle: "#E9D5FF"        # Highlight sparkle for AI suggestions

# Semantic
semantic:
  success: "#10B981"       # Green — confirmation, healthy status
  success-soft: "#10B98120"
  warning: "#F59E0B"       # Amber — caution, degraded status
  warning-soft: "#F59E0B20"
  error: "#EF4444"         # Red — destructive, error states
  error-soft: "#EF444420"
  info: "#3B82F6"          # Blue — informational, neutral status
  info-soft: "#3B82F620"
```

### Elevation & Depth

The Aurora dark theme uses **ambient glow** rather than traditional drop-shadows. Elements feel like they emit light from beneath rather than casting shadows downward.

| Level | Treatment | Use |
|---|---|---|
| Level 0 — Flat | No effect. Surface color difference provides separation. | Default cards on `surface.raised`. |
| Level 1 — Subtle Border | 1px solid `surface.border` | Cards, panels, dividers. |
| Level 2 — Glow | `0 0 0 1px surface.border, 0 4px 16px -4px #7C3AED15` | Elevated cards, active panels. |
| Level 3 — Focus Glow | `0 0 0 1px brand.primary, 0 0 12px 0 brand.primary-glow` | Focused inputs, active nav items. |
| Level 4 — Float | `0 0 0 1px surface.border, 0 8px 32px -8px #0A0A1280` | Modals, dropdowns, command palette. |

### Gradient System

```yaml
# Primary brand gradient — used for AI-related decorations only
ai-flow:
  type: linear
  angle: 135deg
  stops:
    - { color: "#7C3AED", position: 0% }
    - { color: "#A855F7", position: 50% }
    - { color: "#06B6D4", position: 100% }

# Subtle surface gradient — used for section backgrounds
surface-depth:
  type: linear
  angle: 180deg
  stops:
    - { color: "#0A0A12", position: 0% }
    - { color: "#0F0F1A", position: 100% }

# Atmospheric glow — positioned behind hero/feature sections
atmospheric:
  type: radial
  stops:
    - { color: "#7C3AED20", position: 0% }
    - { color: "#7C3AED00", position: 70% }
```

---

## Aurora — Light Mode

### Colors

```yaml
# Surface hierarchy (lightest → darker)
surface:
  base: "#FAFAFE"        # Page background — near-white with faint blue
  raised: "#FFFFFF"      # Card/panel background — pure white
  overlay: "#FFFFFF"     # Modal/dropdown surface
  elevated: "#F3F0FF"   # Hover states — faint purple tint
  border: "#E5E3F0"     # Subtle dividers
  border-strong: "#D4D0E8" # Input borders, stronger dividers

# Text hierarchy
text:
  primary: "#1A1A2E"     # Headlines — deep blue-black
  secondary: "#4A4A6A"   # Body text — muted blue-gray
  tertiary: "#8B8BA8"    # Placeholder, disabled, timestamps
  inverse: "#FFFFFF"     # Text on primary-colored surfaces

# Brand & accent (same hue, adjusted for contrast on light)
brand:
  primary: "#7C3AED"     # Primary CTA — same as dark mode
  primary-hover: "#6D28D9"
  primary-pressed: "#5B21B6"
  primary-soft: "#7C3AED10" # Very subtle highlight
  primary-glow: "#7C3AED15" # Ambient tint

# AI-specific
ai:
  gradient-start: "#7C3AED"
  gradient-mid: "#A855F7"
  gradient-end: "#06B6D4"
  thinking-pulse: "#A855F730"
  sparkle: "#7C3AED"

# Semantic (adjusted saturation for light backgrounds)
semantic:
  success: "#059669"
  success-soft: "#ECFDF5"
  warning: "#D97706"
  warning-soft: "#FFFBEB"
  error: "#DC2626"
  error-soft: "#FEF2F2"
  info: "#2563EB"
  info-soft: "#EFF6FF"
```

### Elevation & Depth (Light Mode)

In light mode, traditional subtle shadows return — the glow effect would be invisible on white surfaces.

| Level | Treatment | Use |
|---|---|---|
| Level 0 — Flat | No effect. | Default layout areas. |
| Level 1 — Hairline | 1px solid `surface.border` | Cards, panels. |
| Level 2 — Soft | `0 1px 2px #1A1A2E08, 0 2px 8px #1A1A2E06` + hairline | Elevated cards. |
| Level 3 — Focus Ring | `0 0 0 2px brand.primary-soft, 0 0 0 4px brand.primary` | Focused inputs. |
| Level 4 — Float | `0 4px 16px -2px #1A1A2E12, 0 12px 32px -4px #1A1A2E08` | Modals, dropdowns. |

---

## Shared Tokens (Both Modes)

### Typography

Identical to the Default theme to ensure seamless switching:

```yaml
display-xl:
  fontFamily: Geist, Inter, system-ui, -apple-system, sans-serif
  fontSize: 48px
  fontWeight: 600
  lineHeight: 48px
  letterSpacing: -2.4px

display-lg:
  fontFamily: Geist, Inter, system-ui, -apple-system, sans-serif
  fontSize: 32px
  fontWeight: 600
  lineHeight: 40px
  letterSpacing: -1.28px

display-md:
  fontFamily: Geist, Inter, system-ui, -apple-system, sans-serif
  fontSize: 24px
  fontWeight: 600
  lineHeight: 32px
  letterSpacing: -0.96px

display-sm:
  fontFamily: Geist, Inter, system-ui, -apple-system, sans-serif
  fontSize: 20px
  fontWeight: 600
  lineHeight: 28px
  letterSpacing: -0.6px

body-lg:
  fontFamily: Inter, system-ui, -apple-system, sans-serif
  fontSize: 18px
  fontWeight: 400
  lineHeight: 28px

body-md:
  fontFamily: Inter, system-ui, -apple-system, sans-serif
  fontSize: 16px
  fontWeight: 400
  lineHeight: 24px

body-sm:
  fontFamily: Inter, system-ui, -apple-system, sans-serif
  fontSize: 14px
  fontWeight: 400
  lineHeight: 20px

caption:
  fontFamily: Inter, system-ui, -apple-system, sans-serif
  fontSize: 12px
  fontWeight: 400
  lineHeight: 16px

caption-mono:
  fontFamily: Geist Mono, ui-monospace, SFMono-Regular, monospace
  fontSize: 12px
  fontWeight: 400
  lineHeight: 16px

code:
  fontFamily: Geist Mono, ui-monospace, SFMono-Regular, monospace
  fontSize: 13px
  fontWeight: 400
  lineHeight: 20px
```

### Spacing

```yaml
xxs: 4px
xs: 8px
sm: 12px
md: 16px
lg: 24px
xl: 32px
2xl: 40px
3xl: 48px
4xl: 64px
```

### Border Radius

```yaml
none: 0px
xs: 4px
sm: 6px
md: 8px
lg: 12px
xl: 16px
2xl: 20px
pill: 100px
full: 9999px
```

---

## Aurora Component Specifications

### Layout Shell

```yaml
header:
  height: 52px
  backgroundColor: "{surface.raised}"
  borderBottom: "1px solid {surface.border}"
  padding: "0 {spacing.lg}"
  backdropFilter: "blur(12px)"     # Frosted glass effect in dark mode

nav-bar:
  width: 64px
  backgroundColor: "{surface.base}"
  borderRight: "1px solid {surface.border}"
  padding: "{spacing.sm} {spacing.xs}"
  # Upper section: user-pinned tools (icon-only, 40x40 each)
  # Lower section: fixed "tools marketplace" entry icon

sub-nav:
  width: 200px
  backgroundColor: "{surface.raised}"
  borderRight: "1px solid {surface.border}"
  padding: "{spacing.md}"
  # Shows when a tool category is selected
  # Contains tool list with icons + labels

content-area:
  backgroundColor: "{surface.base}"
  padding: "{spacing.lg}"
  # Flexible — fills remaining horizontal space
  # Contains toolbar/path bar at top + main content

detail-panel:
  width: 320px
  backgroundColor: "{surface.raised}"
  borderLeft: "1px solid {surface.border}"
  padding: "{spacing.lg}"
  # Optional — appears when an item is selected
  # Collapsible via drag or toggle
```

### Navigation

```yaml
nav-item:
  size: 40px
  borderRadius: "{rounded.md}"
  backgroundColor-hover: "{surface.elevated}"
  backgroundColor-active: "{brand.primary-soft}"
  iconColor: "{text.tertiary}"
  iconColor-active: "{brand.primary}"
  tooltip: true

nav-item-marketplace:
  # Fixed at bottom of nav-bar
  size: 40px
  borderRadius: "{rounded.md}"
  backgroundColor: "{surface.elevated}"
  iconColor: "{text.secondary}"
  badge: "{brand.primary}"  # Notification dot for new tools

sub-nav-item:
  height: 36px
  borderRadius: "{rounded.sm}"
  padding: "0 {spacing.sm}"
  typography: "{body-sm}"
  textColor: "{text.secondary}"
  textColor-hover: "{text.primary}"
  textColor-active: "{text.primary}"
  backgroundColor-active: "{brand.primary-soft}"
  leftIndicator-active: "2px solid {brand.primary}"
```

### Buttons

```yaml
button-primary:
  backgroundColor: "{brand.primary}"
  textColor: "{text.inverse}"
  typography: "{body-sm}" fontWeight 500
  borderRadius: "{rounded.sm}"
  padding: "0 {spacing.md}"
  height: 36px
  # Hover: brand.primary-hover
  # Active: brand.primary-pressed
  # Focus: Level 3 glow ring

button-secondary:
  backgroundColor: "transparent"
  textColor: "{text.primary}"
  border: "1px solid {surface.border-strong}"
  typography: "{body-sm}" fontWeight 500
  borderRadius: "{rounded.sm}"
  padding: "0 {spacing.md}"
  height: 36px

button-ghost:
  backgroundColor: "transparent"
  textColor: "{text.secondary}"
  typography: "{body-sm}" fontWeight 500
  borderRadius: "{rounded.sm}"
  padding: "0 {spacing.sm}"
  height: 36px
  # Hover: surface.elevated background

button-ai:
  # Special AI action button with gradient border
  backgroundColor: "{surface.raised}"
  textColor: "{text.primary}"
  border: "1px solid transparent"
  borderImage: "{ai-flow gradient}"
  borderRadius: "{rounded.sm}"
  padding: "0 {spacing.md}"
  height: 36px
  iconLeft: "sparkle"
  # Hover: subtle gradient background glow
```

### Cards

```yaml
card-tool:
  # Tool card in the marketplace/grid view
  backgroundColor: "{surface.raised}"
  border: "1px solid {surface.border}"
  borderRadius: "{rounded.lg}"
  padding: "{spacing.lg}"
  # Contains: icon (40x40), name, description, category badge
  # Hover: border-color transitions to surface.border-strong
  # Right-click: context menu with "Pin to Nav" option

card-file:
  # File item in grid view
  backgroundColor: "{surface.raised}"
  border: "1px solid {surface.border}"
  borderRadius: "{rounded.md}"
  padding: "{spacing.md}"
  # Contains: thumbnail/icon area (16:9), filename, metadata

card-ai-suggestion:
  # AI-generated suggestion card
  backgroundColor: "{surface.raised}"
  border: "1px solid {brand.primary-soft}"
  borderRadius: "{rounded.lg}"
  padding: "{spacing.lg}"
  # Left border: 2px ai-flow gradient
  # Contains: sparkle icon, suggestion text, accept/dismiss actions
```

### Inputs

```yaml
input-default:
  backgroundColor: "{surface.base}"
  textColor: "{text.primary}"
  placeholderColor: "{text.tertiary}"
  border: "1px solid {surface.border}"
  borderRadius: "{rounded.sm}"
  padding: "0 {spacing.sm}"
  height: 36px
  typography: "{body-sm}"
  # Focus: border-color → brand.primary, Level 3 glow ring

input-search:
  # Command palette / search input
  backgroundColor: "{surface.elevated}"
  textColor: "{text.primary}"
  border: "none"
  borderRadius: "{rounded.md}"
  padding: "0 {spacing.md}"
  height: 40px
  iconLeft: "search"
  shortcutBadge: "⌘K"

input-ai-prompt:
  # AI prompt input area
  backgroundColor: "{surface.raised}"
  border: "1px solid {surface.border}"
  borderRadius: "{rounded.lg}"
  padding: "{spacing.md}"
  minHeight: 80px
  # Bottom bar: model selector + send button
  # Border animates with ai-flow gradient when AI is active
```

### AI-Specific Components

```yaml
ai-thinking-indicator:
  # Pulsing dot/bar that shows AI is processing
  dotColor: "{ai.thinking-pulse}"
  animation: "pulse 1.5s ease-in-out infinite"
  barGradient: "{ai-flow}"
  barAnimation: "shimmer 2s linear infinite"

ai-response-bubble:
  backgroundColor: "{surface.raised}"
  border: "1px solid {surface.border}"
  borderRadius: "{rounded.lg}"
  padding: "{spacing.md} {spacing.lg}"
  # Avatar: AI sparkle icon with brand.primary background
  # Typography: body-md for response, code blocks use code token

ai-suggestion-inline:
  # Inline suggestion (like Copilot ghost text)
  textColor: "{text.tertiary}"
  backgroundColor: "{brand.primary-soft}"
  borderRadius: "{rounded.xs}"
  # Appears inline in code/text editors
  # Tab to accept, Esc to dismiss

version-update-banner:
  # Auto-detected version update notification
  backgroundColor: "{surface.overlay}"
  border: "1px solid {brand.primary-soft}"
  borderRadius: "{rounded.md}"
  padding: "{spacing.sm} {spacing.md}"
  position: "fixed bottom-right"
  # Contains: update message + "Refresh" primary button + dismiss
```

---

## Aurora Do's and Don'ts

### Do
- Use `{brand.primary}` (#7C3AED) as the sole accent color for CTAs and active states. Purple IS the AI signal.
- Apply the `ai-flow` gradient only to AI-related interactions (thinking states, AI suggestions, prompt borders). Never use it for generic decoration.
- Layer surfaces with the 4-step dark scale (`base` → `raised` → `overlay` → `elevated`) to create depth without shadows.
- Use ambient glow (`brand.primary-glow`) behind active/focused elements in dark mode. The interface emits light, not shadow.
- Keep text in `{text.secondary}` for body content; reserve `{text.primary}` for headings and interactive labels.
- Use `backdrop-filter: blur(12px)` on sticky headers and overlays for the frosted glass effect.
- Animate the AI gradient (shimmer/pulse) only during active AI processing. Static gradient for inactive AI elements.

### Don't
- Don't apply the purple gradient to non-AI elements. Buttons, cards, and navigation use solid `{brand.primary}` — the gradient is reserved for AI context.
- Don't use heavy drop-shadows in dark mode. Ambient glow + surface-color steps handle depth.
- Don't introduce additional accent colors. Purple + cyan (via gradient only) is the complete palette. Use semantic colors (success/warning/error) only for status.
- Don't render text in full white (#FFFFFF) — use `{text.primary}` (#F5F5FF) which has a subtle violet cast for brand cohesion.
- Don't over-use glow effects. Level 3 glow is for focused/active states only — not resting states.
- Don't animate anything by default. Motion is reserved for AI processing indicators and user-initiated transitions.
- Don't make the light mode "feel different" — it should feel like the same interface with inverted luminance, not a separate product.

---

## Theme Switching Architecture

The xTools design system uses CSS custom properties (design tokens) at the `:root` level, with theme classes that override values:

```
:root                    → Default theme (Vercel light)
.theme-default-dark      → Default theme dark mode
.theme-aurora            → Aurora light mode
.theme-aurora-dark       → Aurora dark mode (signature)
```

### Token Naming Convention

All tokens use a semantic naming pattern that is theme-agnostic:

```
--xt-surface-base
--xt-surface-raised
--xt-text-primary
--xt-text-secondary
--xt-brand-primary
--xt-brand-primary-hover
--xt-border-default
--xt-border-strong
--xt-radius-sm
--xt-spacing-md
```

The `xt-` prefix scopes tokens to the xTools design system. Components consume these tokens and are automatically re-skinned when the theme class changes.

### User Preference Persistence

```yaml
storage-key: "xt-theme-preference"
structure:
  theme: "default" | "aurora"
  mode: "light" | "dark" | "system"
  # "system" follows OS prefers-color-scheme
fallback: { theme: "aurora", mode: "dark" }
```

---

## Layout Configuration System

The xTools layout supports configurable visibility and resizable panels:

```yaml
layout-config:
  storage-key: "xt-layout-config"
  panels:
    header:
      visible: true        # Always visible (non-configurable)
      height: 52px
    nav-bar:
      visible: true
      width: 64px
      collapsible: false   # Always 64px icon bar
    sub-nav:
      visible: true | false  # Depends on active tool config
      width: 200px
      resizable: true
      min-width: 160px
      max-width: 320px
    content:
      visible: true        # Always visible
      min-width: 400px
    detail-panel:
      visible: true | false  # Depends on selection state
      width: 320px
      resizable: true
      min-width: 240px
      max-width: 480px
  resize-handle:
    width: 4px
    color: "transparent"
    color-hover: "{brand.primary-soft}"
    color-active: "{brand.primary}"
    cursor: "col-resize"
```
