require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://localhost:8000';

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'node-multiply-service',
    pythonServiceUrl: PYTHON_SERVICE_URL
  });
});

app.get('/multiply', async (req, res) => {
  try {
    const { a, b } = req.query;
    
    if (!a || !b) {
      return res.status(400).json({
        error: 'Missing parameters',
        message: 'Please provide both a and b query parameters'
      });
    }

    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (isNaN(numA) || isNaN(numB)) {
      return res.status(400).json({
        error: 'Invalid parameters',
        message: 'Both a and b must be valid numbers'
      });
    }

    // Use the Python sum service to multiply by adding a to itself b times
    // This is a silly way to multiply, but demonstrates inter-service communication
    let result = 0;
    
    if (numB === 0) {
      result = 0;
    } else {
      const absB = Math.abs(numB);
      const iterations = Math.floor(absB);
      
      for (let i = 0; i < iterations; i++) {
        const response = await axios.get(`${PYTHON_SERVICE_URL}/sum`, {
          params: { a: result, b: numA }
        });
        result = response.data.sum;
      }
      
      // Handle negative multiplier
      if (numB < 0) {
        result = -result;
      }
      
      // Handle decimal part of b
      if (absB !== iterations) {
        const decimalPart = absB - iterations;
        const response = await axios.get(`${PYTHON_SERVICE_URL}/sum`, {
          params: { a: result, b: numA * decimalPart }
        });
        result = response.data.sum;
        if (numB < 0) {
          result = -result;
        }
      }
    }

    res.json({
      a: numA,
      b: numB,
      product: result,
      method: 'repeated addition via Python sum service'
    });

  } catch (error) {
    console.error('Error calling Python service:', error.message);
    res.status(503).json({
      error: 'Service communication error',
      message: 'Failed to communicate with Python sum service',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Node Multiply Service listening on port ${PORT}`);
  console.log(`📡 Python Service URL: ${PYTHON_SERVICE_URL}`);
  console.log(`\nEndpoints:`);
  console.log(`  GET http://localhost:${PORT}/health`);
  console.log(`  GET http://localhost:${PORT}/multiply?a=<number>&b=<number>`);
});
