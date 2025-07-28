# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.4.4 web application named "ospedali" (Italian for "hospitals") built with:
- React 19
- TypeScript
- Tailwind CSS v4
- App Router architecture

## Essential Commands

### Development
```bash
npm run dev      # Start development server with Turbopack (http://localhost:3000)
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Testing
No test framework is currently configured. When implementing tests, check package.json for testing scripts first.

## Architecture

### Directory Structure
- `/src/app/` - Next.js App Router pages and layouts
- `/public/` - Static assets served directly
- Components should be created in `/src/components/` when needed
- Utilities should be placed in `/src/lib/` or `/src/utils/`

### Key Conventions
- **Path Alias**: Use `@/*` to import from `src/*` directory
- **Styling**: Tailwind CSS classes for styling, avoid inline styles
- **Fonts**: Geist Sans and Geist Mono are configured in layout.tsx
- **TypeScript**: Strict mode is enabled, ensure proper typing

### Next.js App Router
- Page components go in `app/` directory
- Use `page.tsx` for route pages
- Use `layout.tsx` for shared layouts
- Metadata is configured in layout files
- Server Components by default, use `"use client"` directive when needed

## Development Notes
- Turbopack is enabled for faster builds in development
- Dark mode classes are supported (e.g., `dark:invert`)
- The project uses the latest Next.js features including partial prerendering capabilities