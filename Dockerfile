# Stage 1: Base image with dependencies installed
FROM node:18-slim AS deps

WORKDIR /app

# Install system packages
RUN apt-get update && apt-get install -y openssl

# Install pnpm globally
RUN npm install -g pnpm

# Copy root-level config files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy all apps and packages
COPY apps ./apps
COPY packages ./packages

# Install dependencies for the entire monorepo
RUN pnpm install --frozen-lockfile

# Generate Prisma client
RUN pnpm --filter=db exec prisma generate


# Stage 2: Runtime container
FROM node:18-slim AS runner

WORKDIR /app

# Install pnpm again in final image
RUN npm install -g pnpm

# Copy everything from the build container
COPY --from=deps /app .

# Expose port used by your app (e.g., Express)
EXPOSE 8080

# Start the API app in dev mode
CMD ["pnpm", "--filter=api", "run", "dev"]
