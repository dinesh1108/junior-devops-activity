import os
from fastapi import FastAPI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Python Sum Service")

@app.get("/health")
def health():
    """Health check endpoint"""
    return {"status": "healthy", "service": "python-sum-service"}

@app.get("/sum")
def sum_numbers(a: float, b: float):
    """Sum two numbers"""
    result = a + b
    return {"a": a, "b": b, "sum": result}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
