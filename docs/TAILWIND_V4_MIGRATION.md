# Tailwind CSS v4 Migration Guide

## Overview

This document outlines the changes made to migrate the Vextrus landing page from the initial Tailwind CSS configuration to Tailwind CSS v4.

## Key Changes

### 1. PostCSS Configuration

**Before:**
```javascript
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**After:**
```javascript
// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### 2. Package Changes

- **Added:** `@tailwindcss/postcss` - The new PostCSS plugin for Tailwind v4
- **Removed:** `autoprefixer` - Now handled automatically by Tailwind v4
- **Removed:** `tailwind.config.js` - Configuration now done via CSS

### 3. CSS Import Syntax

**Before:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**After:**
```css
@import "tailwindcss";
```

### 4. Theme Configuration

In Tailwind v4, theme configuration is done directly in CSS using the `@theme` directive:

```css
@theme {
  --color-primary: #0F172A;
  --color-accent: #14B8A6;
  --color-success: #22C55E;
  --color-warning: #F59E0B;
  
  --font-family-sans: Inter, system-ui, sans-serif;
  --font-family-mono: Roboto Mono, monospace;
  
  --animate-fade-in: fadeIn 0.5s ease-in-out;
  --animate-slide-up: slideUp 0.6s ease-out;
  --animate-pulse-slow: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

### 5. Utility Classes

Tailwind v4 requires more explicit CSS instead of `@apply` directives in some cases:

**Before:**
```css
body {
  @apply bg-background text-foreground;
}
```

**After:**
```css
body {
  background-color: rgb(var(--background));
  color: rgb(var(--foreground));
}
```

### 6. Next.js Configuration

- Removed `swcMinify: true` as it's now the default in Next.js 15
- Added `metadataBase` to resolve social media image URLs
- Moved `themeColor` to `viewport` export

## Benefits of Tailwind CSS v4

1. **Performance:** 5x faster full builds, 100x faster incremental builds
2. **Zero Configuration:** Automatic content detection
3. **Native CSS Features:** Uses cascade layers, custom properties, and color-mix()
4. **Simplified Setup:** Fewer dependencies and configuration files
5. **Better Integration:** First-party Vite plugin available

## Migration Checklist

- [x] Install `@tailwindcss/postcss`
- [x] Update PostCSS configuration
- [x] Convert `@tailwind` directives to `@import "tailwindcss"`
- [x] Move theme configuration to CSS
- [x] Update utility classes to use CSS instead of `@apply`
- [x] Remove `tailwind.config.js`
- [x] Remove `autoprefixer` dependency
- [x] Fix Next.js metadata configuration
- [x] Test build and ensure no errors

## Common Issues and Solutions

### Issue: "Cannot apply unknown utility class"
**Solution:** Replace `@apply` directives with standard CSS properties

### Issue: PostCSS plugin error
**Solution:** Use `@tailwindcss/postcss` instead of `tailwindcss` in PostCSS config

### Issue: Theme not applying
**Solution:** Ensure custom properties are defined in `@theme` block

## Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS v4 Migration Guide](https://tailwindcss.com/docs/upgrade-guide)
- [Next.js 15 with Tailwind CSS](https://nextjs.org/docs/app/guides/tailwind-css)