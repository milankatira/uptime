# Uptime Monitoring System
## Overview
A full-stack application for monitoring website uptime and performance with incident management capabilities.

## Features
- Website uptime monitoring with heartbeat checks
- Incident creation and management
- Status pages for public sharing
- Multi-channel notifications (Email, Slack, Discord)
- Dashboard with historical data visualization
## Architecture
### Frontend
- Next.js application
- Clerk for authentication
- React components for UI
- Axios for API communication
### Backend
- Express.js API
- Prisma ORM for database access
- Modular service architecture
- Docker container support
### Database
- PostgreSQL (via Prisma)
- Estimated size:
  - Small deployment (10 websites, 1M checks/month) : ~500MB
  - Medium deployment (100 websites, 10M checks/month) : ~5GB
  - Large deployment (1000 websites, 100M checks/month) : ~50GB
## Data Model
### Key Tables
1. Websites : ~1KB per record
2. Heartbeats : ~200 bytes per check
3. Incidents : ~2KB per incident
4. Timeline : ~1KB per event
## Deployment
- Docker containers for backend services
- Next.js static export for frontend
- PostgreSQL database (can be hosted or cloud)
## Scaling Considerations
- Database partitioning by organization
- Heartbeat processing queue
- Caching for status pages