# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY eslint.config.js ./

# Copy frontend source
COPY src ./src
COPY public ./public
COPY index.html ./

# Install dependencies and build frontend
RUN npm ci
RUN npm run build

# Runtime stage
FROM node:20-alpine

WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy backend code
COPY backend/index.js ./
COPY backend/.env* ./

# Copy built frontend from builder
COPY --from=builder /app/dist ./public

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose port
EXPOSE 8080

# Start the server
CMD ["node", "index.js"]
