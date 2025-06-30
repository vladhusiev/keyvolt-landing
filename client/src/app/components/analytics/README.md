# Google Tag Manager Integration

## Description

This component integrates Google Tag Manager (GTM) into a Next.js application.

## Files

- `GoogleTagManager.tsx` - main component for GTM integration
- `gtm.d.ts` - TypeScript types for GTM
- `analytics.ts` - analytics configuration

## Usage

The component is automatically connected in `layout.tsx` and loads on all application pages.

## Configuration

GTM ID is stored in the file `src/app/lib/analytics.ts`:

```typescript
export const ANALYTICS_CONFIG = {
  GTM_ID: 'AW-17286677810',
} as const;
```

## Features

- Uses `next/script` for optimal loading
- Loading strategy: `afterInteractive` - script loads after page interactivity
- Supports TypeScript types
- Centralized configuration

## Event Tracking

To send custom events, use:

```typescript
// Send event
gtag('event', 'custom_event_name', {
  event_category: 'category',
  event_label: 'label',
  value: 1
});

// Send conversion
gtag('event', 'conversion', {
  send_to: 'AW-17286677810/CONVERSION_ID'
});
``` 