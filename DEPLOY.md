# VotePath - Google Cloud Run Deployment Guide

## Prerequisites

1. **Google Cloud Project** - Already set up ✓
2. **gcloud CLI** - [Install here](https://cloud.google.com/sdk/docs/install)
3. **Docker** - [Install here](https://docs.docker.com/get-docker/)
4. **Git** - For pushing to Cloud Repository (optional)

## Setup Steps

### 1. Authenticate with Google Cloud

```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

Replace `YOUR_PROJECT_ID` with your actual Google Cloud project ID.

### 2. Enable Required APIs

```bash
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

### 3. Set Environment Variables

Create a `.env.production` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
NODE_ENV=production
```

**Important:** Do NOT commit `.env.production` to git. Instead, set these secrets in Cloud Run.

### 4. Build and Push Docker Image

#### Option A: Using gcloud (Recommended)

```bash
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/votepath:latest
```

#### Option B: Using Docker Locally

```bash
# Build the image
docker build -t gcr.io/YOUR_PROJECT_ID/votepath:latest .

# Configure Docker authentication
gcloud auth configure-docker

# Push to Google Container Registry
docker push gcr.io/YOUR_PROJECT_ID/votepath:latest
```

### 5. Deploy to Cloud Run

```bash
gcloud run deploy votepath \
  --image gcr.io/YOUR_PROJECT_ID/votepath:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=your_key,GOOGLE_MAPS_API_KEY=your_key \
  --memory 512Mi \
  --cpu 1 \
  --port 8080
```

**Parameters explained:**
- `--allow-unauthenticated`: Makes your app publicly accessible
- `--region`: Change to your preferred region (us-east1, europe-west1, etc.)
- `--memory`: 512MB should be sufficient; increase if needed
- `--cpu`: Number of CPUs; 1 is good for most cases
- `--port`: Must be 8080 (matches our Dockerfile)

### 6. Using Secret Manager for Sensitive Data (Recommended for Production)

Instead of passing environment variables on command line:

```bash
# Create secrets in Google Secret Manager
echo "your_gemini_api_key" | gcloud secrets create GEMINI_API_KEY --data-file=-
echo "your_google_maps_api_key" | gcloud secrets create GOOGLE_MAPS_API_KEY --data-file=-

# Grant Cloud Run service account access
gcloud secrets add-iam-policy-binding GEMINI_API_KEY \
  --member=serviceAccount:PROJECT_ID-compute@developer.gserviceaccount.com \
  --role=roles/secretmanager.secretAccessor

gcloud secrets add-iam-policy-binding GOOGLE_MAPS_API_KEY \
  --member=serviceAccount:PROJECT_ID-compute@developer.gserviceaccount.com \
  --role=roles/secretmanager.secretAccessor

# Deploy with secrets
gcloud run deploy votepath \
  --image gcr.io/YOUR_PROJECT_ID/votepath:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=projects/PROJECT_ID/secrets/GEMINI_API_KEY/versions/latest,GOOGLE_MAPS_API_KEY=projects/PROJECT_ID/secrets/GOOGLE_MAPS_API_KEY/versions/latest \
  --secrets="GEMINI_API_KEY=GEMINI_API_KEY:latest,GOOGLE_MAPS_API_KEY=GOOGLE_MAPS_API_KEY:latest" \
  --memory 512Mi \
  --cpu 1 \
  --port 8080
```

### 7. Verify Deployment

After deployment, you'll get a service URL like:
```
https://votepath-xxxxxxxxxxxx-us-central1.a.run.app
```

Visit it in your browser to verify everything works.

### 8. View Logs

```bash
gcloud run logs read votepath --region us-central1 --limit 50
```

### 9. Update Backend Code

After making changes:

```bash
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/votepath:latest
gcloud run deploy votepath \
  --image gcr.io/YOUR_PROJECT_ID/votepath:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## Troubleshooting

### Port Issues
Ensure your backend is listening on `PORT` environment variable (already configured in index.js)

### Frontend Not Loading
- Check that `npm run build` completes successfully
- Verify frontend files are copied to `/app/public` in Docker

### API Keys Not Working
- Double-check environment variables are set correctly
- Use `gcloud run services describe votepath --region us-central1` to verify

### CORS Issues
The backend already has CORS enabled, but if you have specific domain requirements, update the backend:

```javascript
const corsOptions = {
  origin: 'https://your-domain.com',
  credentials: true
};
app.use(cors(corsOptions));
```

## Cost Estimation

Cloud Run pricing:
- **2M requests/month free** (generous free tier)
- **$0.40 per 1M requests** after free tier
- **$0.000002400 per vCPU-second**
- **$0.0000050 per GB-second**

Your small project should stay well within the free tier!

## Next Steps

1. Set up a custom domain (optional)
2. Enable Cloud CDN for faster content delivery
3. Set up automated deployments from your Git repository
4. Monitor performance and costs in Cloud Console

## Support

For more information:
- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Docker Best Practices](https://cloud.google.com/run/docs/quickstarts/build-and-deploy)
- [Cloud Run Pricing](https://cloud.google.com/run/pricing)
