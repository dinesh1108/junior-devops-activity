# Python Sum Service

A simple FastAPI service that provides health check and number summation endpoints.

## Endpoints

- `GET /health` - Health check endpoint
- `GET /sum?a=<number>&b=<number>` - Sum two numbers

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
   pip install -r requirements.txt
   ```

3. Run the server:
   ```bash
   python app/main.py
   ```

The service will start on port 8000 by default (configurable via `.env`).

## Testing

```bash
# Health check
curl http://localhost:8000/health

# Sum two numbers
curl "http://localhost:8000/sum?a=5&b=3"
```

## Configuration

Edit `.env` to configure:
- `PORT` - Server port (default: 8000)
