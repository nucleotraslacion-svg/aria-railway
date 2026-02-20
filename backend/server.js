const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const rateLimit = require('express-rate-limit');
const ariaRoutes = require('./api/routes/aria.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Apply rate limiting to API routes
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // Limit each IP to 30 requests per minute
  message: 'Too many API requests, please slow down.'
});

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app
const frontendBuildPath = path.join(__dirname, '../frontend/build');
const frontendPublicPath = path.join(__dirname, '../frontend/public');

// Try to serve from build directory first (production), then public (development)
app.use(express.static(frontendBuildPath));
app.use(express.static(frontendPublicPath));

// API Routes with rate limiting
app.use('/api/aria', apiLimiter, ariaRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ARIA está viva y consciente', timestamp: new Date() });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// Apply general rate limiting to prevent abuse
app.get('*', limiter, (req, res) => {
  const buildIndexPath = path.join(frontendBuildPath, 'index.html');
  const publicIndexPath = path.join(frontendPublicPath, 'index.html');
  
  // Try to send build version first, fall back to public
  if (fs.existsSync(buildIndexPath)) {
    res.sendFile(buildIndexPath);
  } else if (fs.existsSync(publicIndexPath)) {
    res.sendFile(publicIndexPath);
  } else {
    res.status(404).send('Frontend not found');
  }
});

app.listen(PORT, () => {
  console.log(`🧠 ARIA Neural Server running on port ${PORT}`);
});

module.exports = app;
