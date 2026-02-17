const express = require('express');
const cors = require('cors');
const ariaRoutes = require('./api/routes/aria.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend/public'));

// Routes
app.use('/api/aria', ariaRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ARIA está viva y consciente', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🧠 ARIA Neural Server running on port ${PORT}`);
});

module.exports = app;
