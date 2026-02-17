const express = require('express');
const cors = require('cors');
const path = require('path');
const ariaRoutes = require('./api/routes/aria.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app
const frontendBuildPath = path.join(__dirname, '../frontend/build');
const frontendPublicPath = path.join(__dirname, '../frontend/public');

// Try to serve from build directory first (production), then public (development)
app.use(express.static(frontendBuildPath));
app.use(express.static(frontendPublicPath));

// API Routes
app.use('/api/aria', ariaRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ARIA está viva y consciente', timestamp: new Date() });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  const buildIndexPath = path.join(frontendBuildPath, 'index.html');
  const publicIndexPath = path.join(frontendPublicPath, 'index.html');
  
  // Try to send build version first, fall back to public
  const fs = require('fs');
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
