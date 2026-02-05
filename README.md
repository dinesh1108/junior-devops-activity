# DevOps Take-Home Exercise - Microservices Bootstrap

This repository contains two simple microservices designed as a starting point for DevOps engineering exercises. The services demonstrate basic inter-service communication and require containerization and deployment configuration.

## Architecture Overview

```
┌─────────────────────┐         HTTP GET          ┌─────────────────────┐
│                     │  ────────────────────────> │                     │
│  Node.js Service    │   /sum?a=X&b=Y (repeated) │  Python Service     │
│  (Express)          │  <──────────────────────── │  (FastAPI)          │
│  Port: 3000         │      JSON response         │  Port: 8000         │
└─────────────────────┘                            └─────────────────────┘
```

### Services

#### 1. Python FastAPI Service (`python/`)
- **Framework:** FastAPI with Uvicorn
- **Port:** 8000 (configurable via `.env`)
- **Endpoints:**
  - `GET /health` - Returns service health status
  - `GET /sum?a=<number>&b=<number>` - Returns the sum of two numbers

#### 2. Node.js Express Service (`node/`)
- **Framework:** Express.js
- **Port:** 3000 (configurable via `.env`)
- **Endpoints:**
  - `GET /health` - Returns service health status
  - `GET /multiply?a=<number>&b=<number>` - Multiplies two numbers by repeatedly calling Python's `/sum` endpoint

### How They Connect

The Node service implements multiplication using a **silly algorithm**: it calls the Python service's `/sum` endpoint multiple times to perform repeated addition. For example, to calculate `5 × 3`, it calls `/sum?a=0&b=5` three times, accumulating the result.

This intentionally inefficient design demonstrates:
- Inter-service HTTP communication
- Service dependency management
- Configuration via environment variables
- The importance of proper service orchestration

## Quick Start

### Running Locally

1. **Start the Python service:**
   ```bash
   cd python
   ./start.sh
   ```
   The service will run on http://localhost:8000

2. **Start the Node service** (in a new terminal):
   ```bash
   cd node
   ./start.sh
   ```
   The service will run on http://localhost:3000

3. **Test the services:**
   ```bash
   # Test Python sum service
   curl "http://localhost:8000/sum?a=5&b=3"
   
   # Test Node multiply service (calls Python service)
   curl "http://localhost:3000/multiply?a=5&b=3"
   ```

## Configuration

Both services use `.env` files for configuration:

- **Python service:** `PORT` (default: 8000)
- **Node service:** `PORT` (default: 3000), `PYTHON_SERVICE_URL` (default: http://localhost:8000)

The `.env.example` files in each service directory serve as templates. The startup scripts automatically create `.env` files if they don't exist.

## Project Structure

```
.
├── README.md                 # This file
├── python/                   # Python FastAPI service
│   ├── app/
│   │   └── main.py          # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example         # Environment template
│   ├── .gitignore          # Git ignore rules
│   ├── start.sh            # Startup script
│   └── README.md           # Service-specific docs
└── node/                    # Node.js Express service
    ├── src/
    │   └── index.js        # Express application
    ├── package.json        # Node dependencies
    ├── .env.example        # Environment template
    ├── .gitignore         # Git ignore rules
    ├── start.sh           # Startup script
    └── README.md          # Service-specific docs
```

## Expected Exercise Tasks

This repository serves as a foundation for practicing DevOps skills. Common tasks include:

- **Containerization:** Create Dockerfiles for both services
- **Orchestration:** Write a docker-compose.yml to run both services together
- **CI/CD:** Set up GitHub Actions for automated testing and building
- **Environment Management:** Properly handle environment variables across different deployment scenarios
- **Networking:** Configure service discovery and inter-service communication in containers
- **Monitoring:** Add health checks and logging
- **Documentation:** Update configuration and deployment procedures

## Notes

- The `.env` files are excluded from version control (see `.gitignore`)
- Shell scripts are set to executable by default
- Services must start in order: Python first, then Node (due to dependency)
- All code is intentionally simple to focus on DevOps practices rather than application complexity
