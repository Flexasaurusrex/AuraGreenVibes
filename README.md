# 🦖 Deploy to AuraGreenVibes

## Steps to Deploy:

### 1. Extract the portfolio folder
```bash
tar -xzf auragreen-portfolio-DEPLOY.tar.gz
cd auragreen-portfolio
```

### 2. Push to your GitHub repo
```bash
git remote add origin https://github.com/YOUR_USERNAME/AuraGreenVibes.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel

**Option A: Via Vercel Dashboard (Easiest)**
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Find "AuraGreenVibes" in your repos
5. Click "Import"
6. Click "Deploy"
7. Wait 30 seconds... LIVE! 🚀

**Option B: Via Vercel CLI**
```bash
npm i -g vercel
vercel
```

### 4. Done!

Your epic portfolio is now live at:
`https://auragreen-vibes.vercel.app`

## Update Projects Later

Edit `app/page.js` → change the `projects` array

Then:
```bash
git add .
git commit -m "Updated projects"
git push
```

Vercel auto-deploys on every push! ✨

---

**🦖 AURAGREEN CODING - NEVER STOPS BUILDING 💚**
