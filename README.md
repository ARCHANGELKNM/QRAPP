# QRA - QR Code Administration Application

A Next.js application for generating, scanning, and managing QR codes with role-based access control (Admin, SubAdmin, Staff).

## Table of Contents
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Environment Variables](#environment-variables)
- [Kinde Authentication Setup](#kinde-authentication-setup)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Production Deployment](#production-deployment)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

You'll need the following installed on your machine:
- **Node.js** (v16 or higher) and npm
- **Git** for version control
- A **Kinde account** (create at https://app.kinde.com/register)
- A **Neon database account** (create at https://console.neon.tech)

### Required Technologies & Libraries

```
✓ React 18
✓ Next.js 16
✓ Kinde Auth (Nextjs SDK)
✓ Neon Database (PostgreSQL)
✓ Drizzle ORM
✓ Tailwind CSS
✓ Shadcn UI Components
✓ QR Code Styling
✓ ZXing Browser (QR Scanner)
✓ Framer Motion (Animations)
✓ Lucide React (Icons)
```

---

## Local Development Setup

### Step 1: Clone & Install Dependencies

```bash
git clone <your-repo-url>
cd QRA
npm install
```

### Step 2: Create Environment File

Create a `.env.local` file in the root directory with your development credentials:

```env
# Kinde Auth (Development)
KINDE_CLIENT_ID=your_kinde_client_id
KINDE_CLIENT_SECRET=your_kinde_client_secret
KINDE_ISSUER_URL=https://your-instance.kinde.com
KINDE_REDIRECT_URL=http://localhost:3000/api/auth/kinde_callback
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

**⚠️ IMPORTANT:** Never commit `.env.local` to git. It's already in `.gitignore`.

---

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `KINDE_CLIENT_ID` | Kinde application client ID | Available in Kinde dashboard |
| `KINDE_CLIENT_SECRET` | Kinde application secret | Available in Kinde dashboard |
| `KINDE_ISSUER_URL` | Your Kinde instance URL | `https://your-instance.kinde.com` |
| `KINDE_REDIRECT_URL` | OAuth callback URL | `http://localhost:3000/api/auth/kinde_callback` (dev) or your domain (prod) |
| `KINDE_POST_LOGOUT_REDIRECT_URL` | Post-logout redirect | `http://localhost:3000` (dev) or your domain (prod) |
| `DATABASE_URL` | Neon PostgreSQL connection string | From Neon dashboard |

### Development vs Production URLs

**Development:**
```
KINDE_REDIRECT_URL=http://localhost:3000/api/auth/kinde_callback
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
```

**Production (replace yourdomain.com):**
```
KINDE_REDIRECT_URL=https://yourdomain.com/api/auth/kinde_callback
KINDE_POST_LOGOUT_REDIRECT_URL=https://yourdomain.com
```

---

## Kinde Authentication Setup

### Local Development

1. **Create a Kinde Account**
   - Visit https://app.kinde.com/register
   - Sign up and create a business

2. **Create an Application**
   - In Kinde Dashboard → Applications → Create Application
   - Choose "Single Page Application" or "Web"
   - Save your **Client ID** and **Client Secret**

3. **Configure Callback URLs**
   - Go to **Settings → Authentication** in your application
   - Add **Allowed callback URIs:**
     - `http://localhost:3000/api/auth/kinde_callback`
   - Add **Allowed logout redirect URIs:**
     - `http://localhost:3000`

4. **Get Your Credentials**
   - Copy **Client ID**, **Client Secret**, and **Issuer URL**
   - Add them to `.env.local`

### Production Deployment

When deploying:

1. **Create a new Kinde application** for production (recommended)
   - Or update existing app with production URLs

2. **Update Callback URLs in Kinde Dashboard**
   - Replace `http://localhost:3000` with your domain:
     - `https://yourdomain.com/api/auth/kinde_callback`
     - `https://yourdomain.com`

3. **Set environment variables** in your hosting platform (see [Production Deployment](#production-deployment))

---

## Database Setup

### Using Neon (PostgreSQL)

1. **Create Neon Account & Database**
   - Visit https://console.neon.tech
   - Create a new project
   - Copy the connection string

2. **Set DATABASE_URL**
   - Add to `.env.local` for development
   - Add to hosting platform for production

3. **Run Database Migrations**
   ```bash
   npm run db:push
   ```

### Viewing Database (Drizzle Studio)

```bash
npm run drizzle:studio
```

Opens browser interface to view/edit data.

---

## Running the Application

### Development

```bash
npm run dev
```

Access at: http://localhost:3000

### Build & Production Test

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## Production Deployment

### Deploying to Vercel (Recommended)

1. **Push code to GitHub/GitLab**

2. **Connect to Vercel**
   - Visit https://vercel.com
   - Import your repository
   - Select Next.js framework

3. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all variables from [Environment Variables](#environment-variables) section
   - Use production URLs for Kinde callbacks
   - Use production DATABASE_URL from Neon

4. **Deploy**
   - Vercel automatically builds and deploys on push
   - Monitor deployment in dashboard

### Alternative Hosting Platforms

**Netlify, Railway, Render:** Similar process - add environment variables in platform settings before deploying.

### Database Migration in Production

After first deployment, run migrations:

```bash
npm run db:push
```

Or schedule as part of your CI/CD pipeline.

---

## Project Structure

```
QRA/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   ├── Pages/                # Application pages (Generator, Scanner, Settings, etc.)
│   ├── layout.js             # Root layout
│   ├── page.js               # Home page
│   └── middleware.js         # Auth middleware
├── components/               # React components
│   ├── ui/                   # Shadcn UI components
│   ├── Generator/            # QR generation components
│   ├── Scanner/              # QR scanning components
│   └── Error handling/       # Error components
├── hooks/                    # Custom React hooks
│   ├── useProfile.jsx        # User profile fetching
│   └── useAccessControl.jsx  # Role-based access
├── lib/                      # Utilities & database
│   ├── db.js                 # Drizzle setup
│   ├── schema.js             # Database schema
│   ├── api.js                # API helpers
│   └── server/               # Server utilities
├── .env.local (not in repo)  # Local environment variables
├── package.json              # Dependencies
└── README.md                 # This file
```

---

## Troubleshooting

### Issue: "Unauthorized" when accessing protected pages

**Solution:**
- Ensure you're logged in via Kinde
- Check that `.env.local` has correct Kinde credentials
- Verify REDIRECT_URL matches Kinde dashboard settings

### Issue: Database connection fails

**Solution:**
- Verify DATABASE_URL is correct
- Check Neon dashboard for connection limits
- Ensure SSL mode is enabled (`?sslmode=require`)

### Issue: QR code not generating

**Solution:**
- Check browser console for errors
- Ensure all required fields are filled
- Verify user is authenticated and approved

### Issue: Build fails with "Cannot find module"

**Solution:**
```bash
npm install
npm run build
```

### Issue: Kinde callback not working

**Solution:**
- Double-check KINDE_REDIRECT_URL matches Kinde dashboard
- Ensure `.env.local` is in root directory
- Restart dev server: `npm run dev`

---

## Additional Resources

- [Kinde Documentation](https://docs.kinde.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Neon Database Docs](https://neon.tech/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team)
- [Shadcn UI Docs](https://ui.shadcn.com)

---

## Support

For issues or questions, check the troubleshooting section or review deployment logs in your hosting platform.
