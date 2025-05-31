# Stage 1: Build dependencies and generate Prisma client
FROM node:18-slim AS base

# Install system dependencies
RUN apt-get update && apt-get install -y openssl

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy essential project files
COPY package.json pnpm-lock.yaml turbo.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/db/package.json packages/db/package.json

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Generate Prisma client
RUN pnpm --filter=db prisma generate


# Stage 2: Final runtime image
FROM node:18-slim AS final

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy necessary files from build stage
COPY --from=base /app .

# Expose port
EXPOSE 8080

# Start the API
CMD ["pnpm", "--filter=api", "run", "dev"]
