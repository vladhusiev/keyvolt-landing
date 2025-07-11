# reCAPTCHA v3 Setup Guide

This guide explains how to set up Google reCAPTCHA v3 for the contact form.

## What is reCAPTCHA v3?

reCAPTCHA v3 is an invisible security system that runs in the background and scores user behavior without requiring any user interaction. It provides a score from 0.0 to 1.0, where 1.0 is very likely a good interaction and 0.0 is very likely a bot.

## Setup Steps

### 1. Create reCAPTCHA v3

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click "Create" or "+" button
3. Fill in the form:
   - **Label**: Your site name (e.g., "Key Volt")
   - **reCAPTCHA type**: Select "reCAPTCHA v3"
   - **Domains**: Add your domains:
     - `localhost` (for development)
     - `your-domain.com` (for production)
     - `*.your-domain.com` (for subdomains)
4. Accept the terms and click "Submit"

### 2. Get Your Keys

After creation, you'll get two keys:
- **Site Key** (public) - used in frontend
- **Secret Key** (private) - used in backend

### 3. Configure Environment Variables

Add these variables to your `.env.local` file:

```env
# Frontend (public)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Backend (private)
RECAPTCHA_SECRET_KEY=6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. Deploy Configuration

For production deployment, add these environment variables to your hosting platform:

#### Netlify
- Go to Site Settings → Environment Variables
- Add both variables

#### Vercel
- Go to Project Settings → Environment Variables
- Add both variables

#### Other platforms
- Add both environment variables in your hosting platform settings

## How It Works

### Frontend (Contact Form)
1. The form loads with reCAPTCHA v3 script
2. When user submits the form, reCAPTCHA v3 executes invisibly
3. A token is generated and sent with the form data
4. The form shows a loading state during verification

### Backend (Server Action)
1. Receives the form data with reCAPTCHA token
2. Sends token to Google for verification
3. Checks the score (0.0 - 1.0)
4. If score >= 0.5, processes the form
5. If score < 0.5, returns error

## Configuration Options

### Score Threshold
The default threshold is 0.5. You can adjust it in `contact-actions.ts`:

```typescript
const threshold = 0.5; // Adjust this value (0.0 - 1.0)
```

- **0.0**: Very strict (may block legitimate users)
- **0.5**: Balanced (recommended)
- **1.0**: Very lenient (may allow some bots)

### Action Name
You can customize the action name for better analytics:

```typescript
// In contact form
<ReCaptcha
  siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
  onChange={() => {}}
  action="contact_form" // Custom action name
/>
```

## Troubleshooting

### Common Issues

1. **"Invalid key type" error**
   - Make sure you created reCAPTCHA v3, not v2
   - Check that the key starts with "6L"

2. **"reCAPTCHA not initialized"**
   - Check that `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set
   - Verify the domain is added in reCAPTCHA settings

3. **"Failed to load reCAPTCHA v3"**
   - Check internet connection
   - Verify the site key is correct
   - Check browser console for errors

4. **Low scores (0.0 - 0.3)**
   - This is normal for new sites
   - Scores improve over time as reCAPTCHA learns
   - Consider lowering the threshold temporarily

### Debug Mode

To see reCAPTCHA scores in console, check the browser console for:
```
reCAPTCHA v3 score: 0.9
```

### Testing

1. **Development**: Use `localhost` in reCAPTCHA domains
2. **Production**: Add your actual domain
3. **Testing**: Use different browsers/devices to test

## Security Notes

- Never expose the secret key in frontend code
- Always verify tokens on the server side
- Monitor reCAPTCHA analytics for suspicious activity
- Consider adjusting threshold based on your needs

## Analytics

You can view reCAPTCHA analytics in the [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin):
- Success/failure rates
- Score distribution
- Domain performance
- Action-based analytics

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify environment variables are set correctly
3. Test with different browsers
4. Check reCAPTCHA admin console for domain settings 