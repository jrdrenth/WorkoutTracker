const path = require('path');
const router = require('express').Router();

// sends user to exercise.html page
router.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/exercise.html'));
});

// sends user to stats.html page
router.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/stats.html'));
});

// if no matching route is found, default to index.html
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

  
module.exports = router;
