# DevOps Take-Home Exercise - Microservices Bootstrap

This repository contains two simple microservices designed as a starting point for DevOps engineering exercises. The services demonstrate basic inter-service communication and require containerization and deployment configuration.

## Architecture Overview

```
┌─────────────────────┐         HTTP GET           ┌─────────────────────┐
│                     │  ────────────────────────> │                     │
│  Node.js Service    │   /sum?a=X&b=Y (repeated)  │  Python Service     │
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

---

## Your Evaluation Task

Your task is to **fork this repository** and implement the following requirements:

### Required Tasks

1. **Containerization**
   - Create a `Dockerfile` for the Python service
   - Create a `Dockerfile` for the Node.js service
   - Ensure both images build successfully and services run in containers

2. **Orchestration**
   - Create a `docker-compose.yml` file that runs both services together
   - Properly configure service networking so the Node service can communicate with the Python service
   - Ensure environment variables are correctly passed to containers
   - Services should be accessible from the host machine

3. **CI/CD Pipeline**
   - Set up GitHub Actions workflows for both services
   - Implement automated testing (linting, basic health checks)
   - Build and push Docker images on successful builds
   - (Bonus) Implement automatic versioning/tagging

4. **Documentation**
   - Update this README with:
     - Instructions on how to build and run with Docker
     - Instructions on how to use docker-compose
     - Any environment variables that need to be configured
     - How to verify the services are working correctly
   - Document your CI/CD pipeline

### Evaluation Criteria

Your submission will be evaluated on:
- **Correctness:** Do the services run properly in containers?
- **Best Practices:** Are you following Docker and DevOps best practices?
- **Environment Management:** Are secrets and configuration properly handled?
- **Documentation:** Is your work well-documented and easy to follow?
- **CI/CD Implementation:** Is the pipeline efficient and robust?

### Submission

When you're done:
1. Ensure all changes are committed to your forked repository
2. Share the link to your fork
3. Include any additional notes or assumptions in your updated README

Good luck! 🚀

## Notes

- The `.env` files are excluded from version control (see `.gitignore`)
- Shell scripts are set to executable by default
- Services must start in order: Python first, then Node (due to dependency)
- All code is intentionally simple to focus on DevOps practices rather than application complexity

  ### DevOps Task Explanation

  Project Setup and Execution

This project contains two services:

A Python (FastAPI) service

A Node.js (Express) service that communicates with the Python service

Both services are containerized using Docker and can be run together using Docker Compose.

Docker Setup
Python Service

A Dockerfile is added inside the python/ directory to containerize the FastAPI application.

The service runs on port 8000 and exposes:

/health

/sum?a=<number>&b=<number>

Build and run Python service
docker build -t python-app ./python
docker run -p 8000:8000 python-app

Verify Python service
curl http://localhost:8000/health
curl "http://localhost:8000/sum?a=5&b=3"


Expected output:

8

Node.js Service

A Dockerfile is added inside the node/ directory to containerize the Node.js application.

The service runs on port 3000 and exposes:

/health

/multiply?a=<number>&b=<number>

The Node service internally calls the Python service to calculate the result.

Build and run Node service
docker build -t node-app ./node
docker run -p 3000:3000 node-app

Verify Node service
curl http://localhost:3000/health

Running Both Services Using Docker Compose

A docker-compose.yml file is added at the project root to run both services together.

Both services run on the same Docker network

The Node service communicates with the Python service using the service name python

Environment variables are passed using Docker Compose

Both services are accessible from the host machine

docker-compose.yml
services:
  python:
    build: ./python
    ports:
      - "8000:8000"

  node:
    build: ./node
    ports:
      - "3000:3000"
    environment:
      - PYTHON_SERVICE_URL=http://python:8000
    depends_on:
      - python

Run using Docker Compose
docker compose up --build

Verifying the Services
Verify Python service
curl http://localhost:8000/health
curl "http://localhost:8000/sum?a=5&b=3"

Verify Node service (integration check)
curl http://localhost:3000/health
curl "http://localhost:3000/multiply?a=5&b=3"


Expected output:

15

CI/CD Pipeline

A GitHub Actions pipeline is configured in:

.github/workflows/ci-cd.yml

What the pipeline does

Runs linting for Python and Node.js

Performs basic health checks for both services

Builds Docker images on successful checks

Pushes Docker images to Docker Hub

Automatically tags images using commit SHA and Git tags

Docker Hub Configuration

The pipeline uses the following GitHub repository secrets:

DOCKERHUB_USERNAME

DOCKERHUB_TOKEN

Version Tagging (Optional)

When a Git tag is created:

git tag v1.0.0
git push origin v1.0.0


Docker images are automatically pushed with:

1.0.0

latest


