# Node Multiply Service

A simple Express service that multiplies numbers by calling the Python sum service repeatedly (silly but demonstrates inter-service communication).

## Endpoints

- `GET /health` - Health check endpoint
- `GET /multiply?a=<number>&b=<number>` - Multiply two numbers using the Python sum service

## Quick Start

### Using the startup script (recommended)

```bash
chmod +x start.sh
./start.sh
```

### Manual setup

1. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the server:
   ```bash
   npm start
   ```

The service will start on port 3000 by default (configurable via `.env`).

## Prerequisites

**Important:** The Python sum service must be running before starting this service, as it depends on it for multiplication.

## Testing

```bash
# Health check
curl http://localhost:3000/health

# Multiply two numbers (make sure Python service is running on port 8000)
curl "http://localhost:3000/multiply?a=5&b=3"
```

## Configuration

Edit `.env` to configure:
- `PORT` - Server port (default: 3000)
- `PYTHON_SERVICE_URL` - URL of the Python sum service (default: http://localhost:8000)

## How it works

The multiply endpoint uses a silly algorithm: it calls the Python `/sum` endpoint repeatedly to perform multiplication via repeated addition. This demonstrates inter-service HTTP communication for DevOps exercises.
