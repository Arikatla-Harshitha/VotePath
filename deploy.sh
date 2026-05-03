#!/bin/bash

# VotePath Deployment Script for Google Cloud
# Run this in Google Cloud Shell

set -e

echo "🚀 Starting VotePath deployment..."

# Configuration
PROJECT_ID="election-guide-495116"
SERVICE_NAME="votepath"
REGION="us-central1"
IMAGE_TAG="gcr.io/$PROJECT_ID/$SERVICE_NAME:latest"

# Set project
echo "📋 Setting project to $PROJECT_ID..."
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "🔧 Enabling required Google Cloud APIs..."
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable artifactregistry.googleapis.com

# Build and push Docker image
echo "🐳 Building and pushing Docker image (this may take 5-10 minutes)..."
gcloud builds submit --tag $IMAGE_TAG

# Deploy to Cloud Run
echo "☁️  Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image $IMAGE_TAG \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --port 8080 \
  --quiet

# Get the service URL
echo ""
echo "✅ Deployment successful!"
echo ""
echo "📍 Your app is live at:"
gcloud run services describe $SERVICE_NAME --region $REGION --format='value(status.url)'
echo ""
echo "🎉 VotePath is ready to use!"
