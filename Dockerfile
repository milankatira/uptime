# Stage 1: Base image with dependencies
FROM node:18-slim AS base

# Install system dependencies
RUN apt-get update && apt-get install -y openssl

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy lockfile and package.json files
COPY package.json pnpm-lock.yaml turbo.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/frontend/package.json apps/frontend/package.json

# Install dependencies
RUN pnpm install

# Copy all source code
COPY . .

# Generate Prisma client
RUN pnpm --filter=@repo/db exec prisma generate

# Build all apps
RUN pnpm run build

# Stage 2: Final image
FROM node:18-slim

# Install Bun
RUN npm install -g bun

WORKDIR /app

# Install Node.js first
RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

WORKDIR /usr/src/app

# Install system dependencies
RUN apt-get update && apt-get install -y openssl

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy built files from the base stage
COPY --from=base /app .

# Expose API port
EXPOSE 8080

# Start the API
CMD ["pnpm", "--filter=api", "run", "dev"]
