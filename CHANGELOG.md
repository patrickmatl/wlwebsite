# Changelog

All notable changes to this project are documented in this file.

This project adheres to a changelog style inspired by Keep a Changelog and Semantic Versioning principles.

## 2025-10-14 — Mobile Contact Bar & Cursor UX Improvements

### Changed
- Mobile contact bar (`src/components/MobileContactBar.tsx`)
  - Lifted bar slightly from the device bottom (`bottom-2`) to avoid clipping.
  - Increased bottom padding with safe-area support: `pb-4 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]`.
- Desktop-only floating contact buttons (`src/components/WhatsAppButton.tsx`)
  - Hidden on mobile, visible on desktop via `hidden md:flex`.
- Play button positioning (`src/components/AudioPlayer.tsx`)
  - Raised on mobile (`bottom-24`) and kept lower on desktop (`md:bottom-4`) with `z-[60]` to remain clickable above the contact bar.
- Cursor UX refinements
  - `ClientRootWrapper`: Show custom cursor only on devices with a fine pointer and when users do not prefer reduced motion.
  - `globals.css`: Hide default cursor only for fine pointers; disable custom cursor for coarse pointers; keep mobile performance optimizations.
  - `CustomCursor`: Removed duplicate component-scoped styles to rely on centralized global CSS.

### Added
- Expanded service FAQs (`src/data/serviceFAQs.ts`)
  - Added or enhanced entries for Website Design, Branding, Logo Design, and Packaging Design.

### Verification
- Local preview run validated UI: mobile contact bar shows fully, play button remains clickable on mobile, desktop retains floating WhatsApp/Call buttons.

## 2025-10-10 — Initial Setup
- Project structure, core components, and initial styling.