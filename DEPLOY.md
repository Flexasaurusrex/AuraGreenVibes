# 🦖 AuraGreen Portfolio - Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Option 1: Via GitHub (Best)

1. Create a new repo on GitHub (call it `auragreen-portfolio`)

2. In your local terminal:
```bash
cd auragreen-portfolio
git remote add origin https://github.com/YOUR_USERNAME/auragreen-portfolio.git
git branch -M main
git push -u origin main
```

3. Go to https://vercel.com
   - Sign in with GitHub
   - Click "New Project"
   - Import your `auragreen-portfolio` repo
   - Click "Deploy"
   - Done! ✨

### Option 2: Vercel CLI (Direct)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd auragreen-portfolio
vercel
```

3. Follow prompts:
   - "Set up and deploy?" → Yes
   - "Which scope?" → Your account
   - "Link to existing project?" → No
   - "Project name?" → auragreen-portfolio
   - "Directory?" → ./
   - "Override settings?" → No

4. Wait 30 seconds... DEPLOYED! 🚀

## Custom Domain (Optional)

In Vercel dashboard:
- Go to your project
- Settings → Domains
- Add: `auragreen.dev` (or whatever you want)
- Follow DNS instructions

## Update Projects Later

Just edit `app/page.js`:

```javascript
const projects = [
  {
    id: 'newproject',
    title: 'New Project',
    icon: '🚀',
    description: 'What it does',
    tech: 'Next.js • Whatever',
    links: { live: 'https://...', github: 'https://...' }
  },
  // ...more projects
];
```

Then:
```bash
git add .
git commit -m "Updated projects"
git push
```

Vercel auto-deploys! 🔥

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

**THE MOST EPIC DEV PORTFOLIO IN HISTORY** 🦖💚
