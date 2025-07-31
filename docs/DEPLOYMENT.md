# Vextrus Landing Page Deployment Guide

## Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager
- Git for version control
- Environment variables configured

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_HOTJAR_ID=your-hotjar-id

# API Keys
OPENAI_API_KEY=your-openai-key
MONGODB_URI=your-mongodb-connection

# Email Service
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password

# Other
NEXT_PUBLIC_SITE_URL=https://vextrus.ai
```

## Build Process

### 1. Install Dependencies
```bash
npm install
# or
yarn install
```

### 2. Run Type Checking
```bash
npm run type-check
```

### 3. Build for Production
```bash
npm run build
```

### 4. Test Production Build Locally
```bash
npm run start
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Configure Environment Variables**
   - Go to Vercel Dashboard
   - Navigate to Project Settings > Environment Variables
   - Add all variables from `.env.local`

4. **Custom Domain**
   - Add domain in Vercel Dashboard
   - Update DNS records

### Option 2: Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Environment Variables**
   - Add in Netlify Dashboard > Site Settings

3. **Deploy**
   ```bash
   # Using Netlify CLI
   netlify deploy --prod
   ```

### Option 3: Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS base

   # Install dependencies
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   COPY package.json package-lock.json ./
   RUN npm ci

   # Build application
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build

   # Production image
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs

   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

   USER nextjs
   EXPOSE 3000
   ENV PORT 3000

   CMD ["node", "server.js"]
   ```

2. **Build and Run**
   ```bash
   docker build -t vextrus-landing .
   docker run -p 3000:3000 vextrus-landing
   ```

### Option 4: Traditional VPS

1. **Server Requirements**
   - Ubuntu 20.04+ or similar
   - Node.js 18+
   - PM2 for process management
   - Nginx for reverse proxy

2. **Setup Steps**
   ```bash
   # Clone repository
   git clone [your-repo-url]
   cd vextrus-landing

   # Install dependencies
   npm install

   # Build
   npm run build

   # Install PM2
   npm install -g pm2

   # Start with PM2
   pm2 start npm --name "vextrus-landing" -- start

   # Save PM2 config
   pm2 save
   pm2 startup
   ```

3. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name vextrus.ai www.vextrus.ai;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Performance Optimization

### 1. Enable Caching
- Set appropriate cache headers
- Use CDN for static assets
- Enable browser caching

### 2. Compression
- Enable gzip/brotli compression
- Optimize images before deployment

### 3. CDN Setup
- CloudFlare or similar CDN
- Configure edge caching rules

## Monitoring

### 1. Application Monitoring
- Set up error tracking (Sentry)
- Performance monitoring (New Relic/DataDog)

### 2. Analytics
- Google Analytics 4
- Hotjar for heatmaps
- Custom event tracking

### 3. Uptime Monitoring
- Pingdom or UptimeRobot
- Alert configuration

## Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Environment variables secured
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] CSP headers set
- [ ] Regular dependency updates

## Rollback Strategy

1. **Version Tags**
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

2. **Quick Rollback**
   - Vercel: Redeploy previous deployment
   - Docker: Use previous image tag
   - PM2: `pm2 reload` with previous build

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version
   - Clear cache: `rm -rf .next node_modules`
   - Reinstall dependencies

2. **Environment Variables**
   - Verify all required variables are set
   - Check for typos in variable names

3. **Performance Issues**
   - Enable build cache
   - Check for memory leaks
   - Monitor server resources

## Post-Deployment

1. **Verify Deployment**
   - Check all pages load correctly
   - Test forms and interactions
   - Verify analytics tracking

2. **Performance Testing**
   - Run Lighthouse audit
   - Test Core Web Vitals
   - Load testing if needed

3. **SEO Verification**
   - Submit sitemap to Google
   - Verify meta tags
   - Check social media cards