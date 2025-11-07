# Railway Upgrade Guide - Deploy Web Services

## Current Situation
Your Railway account is on **Limited Access** plan, which only allows database deployments. To deploy your FastAPI backend, you need to upgrade.

## Railway Upgrade Options

### Option 1: Developer Plan ($5/month)
- ✅ Deploy unlimited web services
- ✅ $5 credit included (covers small apps)
- ✅ PostgreSQL databases included
- ✅ Automatic deployments from GitHub
- ✅ Custom domains
- ✅ SSL certificates

**How to Upgrade:**
1. Go to your Railway dashboard
2. Click on your account/profile icon
3. Go to "Billing" or "Plans"
4. Click "Upgrade to Developer Plan"
5. Add payment method (credit card required)
6. Your $5 credit will be applied monthly

### Option 2: Pro Plan ($20/month)
- ✅ Everything in Developer
- ✅ $20 credit included
- ✅ Better for production apps
- ✅ Priority support

## After Upgrading

### Step 1: Deploy Your Backend
1. In Railway dashboard, click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. Set **Root Directory** to: `ExamSystemBackend`
5. Railway will auto-detect Python and deploy

### Step 2: Add PostgreSQL Database
1. In your project, click "New"
2. Select "Database" → "PostgreSQL"
3. Railway automatically sets `DATABASE_URL` environment variable

### Step 3: Set Environment Variables
Go to your service → Variables tab, add:

```
SECRET_KEY=<generate-random-key>
RESEND_API_KEY=<your-resend-key>
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### Step 4: Deploy!
Railway will automatically:
- Install dependencies from `requirements.txt`
- Run `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Provide a public URL

## Cost Breakdown
- **Developer Plan**: $5/month (includes $5 credit)
- **Small FastAPI app**: ~$2-3/month
- **PostgreSQL database**: ~$1-2/month
- **Total**: Usually covered by the $5 credit!

## Free Alternatives (If You Don't Want to Pay)

### Render.com (Recommended)
- ✅ **100% Free** for web services
- ✅ Free PostgreSQL database
- ✅ No credit card required
- ⚠️ Spins down after 15 min inactivity (wakes up on request)

**See:** `RENDER_DEPLOYMENT.md`

### Fly.io
- ✅ **100% Free** tier available
- ✅ 3 VMs included
- ✅ Always running (no spin-down)
- ✅ Free PostgreSQL

**See:** `FLY_DEPLOYMENT.md`

## Recommendation

**For Free:** Use **Render.com** - easiest setup, no payment required
**For Paid:** Use **Railway** - best developer experience, $5/month is reasonable

## Next Steps

1. **If upgrading Railway:**
   - Follow steps above
   - Upgrade to Developer plan
   - Deploy your backend

2. **If using free option:**
   - Follow `RENDER_DEPLOYMENT.md` guide
   - Deploy to Render (takes 10 minutes)
   - No payment required

3. **After deployment:**
   - Configure email (Resend recommended)
   - Test `/health/email` endpoint
   - Update frontend with backend URL

